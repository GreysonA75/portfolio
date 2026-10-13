const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');

function closeNavigation() {
  siteNav?.classList.remove('open');
  navToggle?.setAttribute('aria-expanded', 'false');
  navToggle?.setAttribute('aria-label', 'Open navigation');
}

navToggle?.addEventListener('click', () => {
  const open = navToggle.getAttribute('aria-expanded') !== 'true';
  siteNav.classList.toggle('open', open);
  navToggle.setAttribute('aria-expanded', String(open));
  navToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
});
siteNav?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeNavigation));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && navToggle?.getAttribute('aria-expanded') === 'true') {
    closeNavigation();
    navToggle.focus();
  }
});
document.addEventListener('click', event => {
  if (!event.target.closest('.header-inner')) closeNavigation();
  const anchor = event.target.closest('a[href^="#"]');
  if (anchor) revealDetails(anchor.hash.slice(1));
});
window.matchMedia('(min-width: 641px)').addEventListener('change', event => {
  if (event.matches) closeNavigation();
});

const captions = {
  applications: 'Thoughtful interfaces. Useful software.',
  integration: 'Connect the pieces. Keep the boundaries clear.',
  automation: 'Less repetitive work. More room for useful work.'
};
const visual = document.querySelector('.systems-visual');
visual?.querySelectorAll('[data-layer]').forEach(button => {
  button.addEventListener('click', () => {
    visual.dataset.system = button.dataset.layer;
    visual.querySelectorAll('[data-layer]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    visual.querySelector('.system-caption').textContent = captions[button.dataset.layer];
  });
});

// Native disclosures keep technical details accessible without client-side routing.
function revealDetails(hash = window.location.hash.slice(1)) {
  const target = document.getElementById(hash === 'alegria-automation-case-study' ? 'gj-details' : hash);
  if (target?.tagName === 'DETAILS') target.open = true;
}
window.addEventListener('hashchange', () => revealDetails());
revealDetails();

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    const visible = entries.filter(entry => entry.isIntersecting);
    if (!visible.length) return;
    const id = visible[0].target.id;
    siteNav?.querySelectorAll('a').forEach(link => {
      const active = link.hash === `#${id}`;
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }, { rootMargin: '-15% 0px -65% 0px', threshold: 0 });
  document.querySelectorAll('#top, #work, #about, #experience, #contact').forEach(section => observer.observe(section));
}
const year = document.querySelector('#year');
if (year) year.textContent = String(new Date().getFullYear());
