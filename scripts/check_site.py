"""Validate deployment paths, internal anchors, metadata, and local assets."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit, unquote
import json
import re

ROOT = Path(__file__).resolve().parent.parent

class Page(HTMLParser):
    def __init__(self, source):
        super().__init__(convert_charrefs=True)
        self.ids, self.refs, self.tags, self.json_data = [], [], [], []
        self.json_mode = False
        self.feed(source)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        self.tags.append((tag, attrs))
        if 'id' in attrs:
            self.ids.append(attrs['id'])
        for attr in ('href', 'src'):
            if attrs.get(attr):
                self.refs.append(attrs[attr])
        if tag == 'script' and attrs.get('type') == 'application/ld+json':
            self.json_mode = True

    def handle_data(self, data):
        if self.json_mode:
            self.json_data.append(data)

    def handle_endtag(self, tag):
        if tag == 'script':
            self.json_mode = False

pages = {name: Page((ROOT / name).read_text()) for name in ['index.html', 'resume.html']}
for name, page in pages.items():
    assert len(page.ids) == len(set(page.ids)), f'{name}: duplicate IDs'
    assert sum(tag == 'h1' for tag, _ in page.tags) == 1, f'{name}: expected one h1'
    assert any(tag == 'link' and attrs.get('rel') == 'canonical' for tag, attrs in page.tags), f'{name}: canonical missing'
    for tag, attrs in page.tags:
        if tag == 'img':
            assert all(attrs.get(key) for key in ('alt', 'width', 'height')), f'{name}: image accessibility/dimensions missing'
        if tag == 'button':
            assert attrs.get('type') == 'button', f'{name}: button type missing'
        if tag == 'a' and attrs.get('target') == '_blank':
            assert 'noopener' in attrs.get('rel', ''), f'{name}: unsafe external target'
    for ref in page.refs:
        url = urlsplit(ref)
        if url.scheme:
            continue
        assert not url.path.startswith('/'), f'{name}: root-relative path breaks project hosting: {ref}'
        destination = url.path or name
        assert (ROOT / unquote(destination)).is_file(), f'{name}: missing asset: {ref}'
        if url.fragment and destination in pages:
            assert unquote(url.fragment) in pages[destination].ids, f'{name}: broken anchor: {ref}'
    for data in page.json_data:
        json.loads(data)
for css_path in [ROOT / 'style.css', ROOT / 'assets/fonts/fonts.css']:
    for ref in re.findall(r'url\([\"\']?([^\)\"\']+)', css_path.read_text()):
        assert (css_path.parent / ref).is_file(), f'Missing CSS asset: {ref}'
pdf = (ROOT / 'assets/greyson-alegria-resume.pdf').read_bytes()
assert pdf.startswith(b'%PDF-'), 'Resume is not a PDF'
assert (ROOT / 'assets/social-preview.png').read_bytes().startswith(b'\x89PNG'), 'Social preview is not a PNG'
print('PASS: pages, IDs, links, subpath-safe assets, image labels/dimensions, metadata, structured data, fonts, and resume.')
