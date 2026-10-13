import { cp, mkdir, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const output = path.join(root, 'dist');
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
for (const file of ['index.html', 'resume.html', 'style.css', 'script.js', 'sitemap.xml', 'robots.txt', '.nojekyll']) {
  await cp(path.join(root, file), path.join(output, file));
}
// Keep old source assets intact; ship only assets used by the finished portfolio.
await mkdir(path.join(output, 'assets'), { recursive: true });
for (const asset of ['favicon.svg', 'social-preview.png', 'reappraise-preview.png', 'dulcet-preview.jpg', 'greyson-alegria-resume.pdf', 'fonts']) {
  await cp(path.join(root, 'assets', asset), path.join(output, 'assets', asset), { recursive: true });
}
console.log('Production site built in dist/ — static files, no runtime dependencies.');
