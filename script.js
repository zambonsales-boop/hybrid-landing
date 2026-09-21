// ==== VIDEO (VSL + testimonianze): i link si impostano in videos.js ====
const CFG = window.HYBRID_VIDEOS || {};

function videoUrl(key) {
  if (key === 'vsl') return CFG.vsl || '';
  const n = parseInt(key.slice(1), 10);
  return (CFG.testimonianze || [])[n] || '';
}

// Trasforma il link incollato nell'elemento da mostrare (iframe o <video>)
function buildPlayer(url, title) {
  let u;
  try { u = new URL(url, location.href); } catch (e) { return null; }
  const host = u.hostname.replace(/^www\./, '');
  let src = null, id = null;

  if (host === 'youtu.be') id = u.pathname.slice(1);
  else if (host.endsWith('youtube.com') || host.endsWith('youtube-nocookie.com')) {
    id = u.searchParams.get('v') || (u.pathname.match(/\/(?:shorts|embed|live)\/([\w-]{6,})/) || [])[1];
  }
  if (id) {
    src = 'https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0&playsinline=1&modestbranding=1';
  } else if (host.endsWith('vimeo.com')) {
    const m = u.pathname.match(/(\d{5,})(?:\/(\w+))?/);
    if (m) src = 'https://player.vimeo.com/video/' + m[1] + '?autoplay=1' + (m[2] ? '&h=' + m[2] : '');
  }

  if (!src && /\.(mp4|webm|mov)$/i.test(u.pathname)) {
    const v = document.createElement('video');
    v.src = url; v.controls = true; v.autoplay = true; v.playsInline = true; v.title = title;
    return v;
  }
  if (!src) src = url + (url.includes('?') ? '&' : '?') + 'autoplay=1';

  const f = document.createElement('iframe');
  f.src = src; f.title = title; f.allowFullscreen = true;
  f.allow = 'autoplay; fullscreen; picture-in-picture';
  return f;
}

document.querySelectorAll('[data-video]').forEach((frame) => {
  const url = videoUrl(frame.dataset.video);
  const play = frame.querySelector('.vsl-play');
  if (frame.classList.contains('vsl-frame--t') && CFG.formatoTestimonianze) {
    frame.style.aspectRatio = CFG.formatoTestimonianze;
  }
  if (url) frame.classList.add('has-video');
  if (!play) return;
  play.addEventListener('click', () => {
    if (!url) return; // segnaposto: nessun video ancora collegato
    const p = buildPlayer(url, play.getAttribute('aria-label') || 'Video');
    if (p) { frame.replaceChildren(p); frame.classList.add('is-live'); }
  });
});

// ==== Tabella di confronto: "+" per aprire i dettagli di ogni casella ====
document.querySelectorAll('.cmp-btn').forEach((btn, i) => {
  const more = btn.nextElementSibling;
  const id = 'cmp-more-' + i;
  more.id = id;
  btn.setAttribute('aria-controls', id);
  btn.addEventListener('click', () => {
    const open = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!open));
    btn.parentElement.classList.toggle('is-open', !open);
  });
});

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

// ==== Mini visual dei dati: animazione all'ingresso nello schermo ====
(function () {
  const stats = document.querySelector('.stats');
  if (!stats) return;
  stats.querySelectorAll('.viz-dots').forEach((d) => d.querySelectorAll('i').forEach((dot, i) => dot.style.setProperty('--i', i)));
  const reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || !('IntersectionObserver' in window)) return; // senza animazione: visual già completo
  stats.classList.add('viz-armed');
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } });
  }, { threshold: 0.35 });
  stats.querySelectorAll('.stat').forEach((el) => io.observe(el));
})();
