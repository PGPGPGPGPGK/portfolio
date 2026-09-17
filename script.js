const topbar = document.getElementById('topbar');
const portrait = document.getElementById('heroPortrait');
const modal = document.getElementById('portraitModal');
const modalClose = document.getElementById('portraitClose');
const portraitImg = document.getElementById('heroPortraitImg');
const portraitModalImg = document.getElementById('portraitModalImg');
const brand = document.querySelector('.brand');

window.addEventListener('scroll', () => {
  topbar?.classList.toggle('scrolled', window.scrollY > 20);
});

const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => observer.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('in'));
}

const updatePortrait = () => {
  if (!portrait) return;
  const hero = document.querySelector('.hero');
  if (!hero) return;
  const heroRect = hero.getBoundingClientRect();
  const progress = Math.min(1, Math.max(0, (0 - heroRect.top) / Math.max(1, hero.offsetHeight - 90)));
  const mini = progress > 0.82;
  portrait.classList.toggle('is-mini', mini);
  topbar?.classList.toggle('portrait-mini', mini);

  if (!mini) {
    portrait.style.left = '0px';
    portrait.style.top = '76px';
    portrait.style.width = '100vw';
    portrait.style.height = 'calc(100vh - 76px)';
    portrait.style.borderRadius = '0px';
    portrait.setAttribute('aria-hidden', 'true');
    return;
  }

  const brandRect = brand?.getBoundingClientRect();
  const size = 42;
  const left = brandRect ? Math.max(10, brandRect.left) : 16;
  portrait.style.left = `${left}px`;
  portrait.style.top = '17px';
  portrait.style.width = `${size}px`;
  portrait.style.height = `${size}px`;
  portrait.style.borderRadius = '50%';
  portrait.setAttribute('aria-hidden', 'false');
};

window.addEventListener('scroll', updatePortrait, { passive: true });
window.addEventListener('resize', updatePortrait);
updatePortrait();

const openPortrait = () => {
  if (!portrait?.classList.contains('is-mini') || !modal) return;
  if (portraitImg && portraitModalImg) portraitModalImg.src = portraitImg.src;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
  modalClose?.focus();
};
const closePortrait = () => {
  if (!modal) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
};
portrait?.addEventListener('click', openPortrait);
modalClose?.addEventListener('click', closePortrait);
modal?.addEventListener('click', e => { if (e.target === modal) closePortrait(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closePortrait(); });

document.getElementById('year').textContent = new Date().getFullYear();
