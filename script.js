// ==== VSL ====
// Incolla qui l'URL di embed del video (lascia vuoto per mostrare il segnaposto).
//   YouTube (consigliato la versione senza cookie): 'https://www.youtube-nocookie.com/embed/ID_VIDEO'
//   Vimeo:                                          'https://player.vimeo.com/video/ID_VIDEO'
const VSL_URL = '';

const vsl = document.getElementById('vsl');
if (vsl) {
  const frame = vsl.querySelector('.vsl-frame');
  const play = vsl.querySelector('.vsl-play');
  play.addEventListener('click', () => {
    if (!VSL_URL) return; // segnaposto: nessun video ancora collegato
    const sep = VSL_URL.includes('?') ? '&' : '?';
    const iframe = document.createElement('iframe');
    iframe.src = VSL_URL + sep + 'autoplay=1&rel=0';
    iframe.allow = 'autoplay; fullscreen; picture-in-picture';
    iframe.allowFullscreen = true;
    iframe.title = 'HYBRID S.Y.N.C.™ Academy: video di presentazione';
    frame.replaceChildren(iframe);
    vsl.classList.add('is-live');
  });
}

// ==== CTA fissa su mobile: compare dopo l'hero, sparisce sul modulo ====
const sticky = document.getElementById('sticky-cta');
const heroEl = document.getElementById('academy');
const contactEl = document.getElementById('contatti');
if (sticky && heroEl && 'IntersectionObserver' in window) {
  let pastHero = false, onContact = false;
  const update = () => sticky.classList.toggle('show', pastHero && !onContact);
  new IntersectionObserver(([e]) => { pastHero = !e.isIntersecting && e.boundingClientRect.top < 0; update(); }).observe(heroEl);
  if (contactEl) new IntersectionObserver(([e]) => { onContact = e.isIntersecting; update(); }).observe(contactEl);
}

// Menu mobile
const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  nav.querySelectorAll('a').forEach((a) =>
    a.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    })
  );
}

// FAQ: una sola risposta aperta alla volta
const faqItems = document.querySelectorAll('.faq details');
faqItems.forEach((item) => {
  item.addEventListener('toggle', () => {
    if (item.open) faqItems.forEach((other) => { if (other !== item) other.open = false; });
  });
});

// Modulo di contatto: gestore di prova.
// Sostituire con l'embed del form GoHighLevel oppure con una fetch() verso il webhook.
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const status = form.querySelector('.form-status');
    const missing = [...form.querySelectorAll('[required]')].some((f) =>
      f.type === 'checkbox' ? !f.checked : !f.value.trim()
    );
    status.textContent = missing
      ? 'Compila tutti i campi e accetta i termini per proseguire.'
      : 'Modulo di prova: la raccolta dei dati verrà attivata al collegamento con GoHighLevel.';
  });
}
