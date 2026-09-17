const menu = document.querySelector('.menu');
const mobileNav = document.querySelector('#mobile-nav');

menu?.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') === 'true';
  menu.setAttribute('aria-expanded', String(!open));
  mobileNav.hidden = open;
  document.body.classList.toggle('menu-open', !open);
});

mobileNav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  menu?.setAttribute('aria-expanded', 'false');
  mobileNav.hidden = true;
  document.body.classList.remove('menu-open');
}));

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!reduceMotion) {
  document.documentElement.classList.add('motion-ready');
  const revealGroups = ['.intro .section-index','.intro-main','.intro-aside','.section-head > *','.service','.gallery-copy','.gallery-card','.clinic-visual','.clinic-copy > *','.location > *','.closing > *'];
  document.querySelectorAll(revealGroups.join(',')).forEach((element, index) => {
    element.classList.add('reveal');
    element.style.setProperty('--reveal-order', index % 4);
  });
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.14, rootMargin: '0px 0px -6% 0px' });
  document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

  const hero = document.querySelector('.hero-art');
  hero?.addEventListener('pointermove', (event) => {
    const bounds = hero.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    hero.style.setProperty('--pointer-x', `${x * 18}px`);
    hero.style.setProperty('--pointer-y', `${y * 18}px`);
  });
  hero?.addEventListener('pointerleave', () => {
    hero.style.setProperty('--pointer-x', '0px');
    hero.style.setProperty('--pointer-y', '0px');
  });
}

const topbar = document.querySelector('.topbar');
const updateHeader = () => topbar?.classList.toggle('is-scrolled', window.scrollY > 24);
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

