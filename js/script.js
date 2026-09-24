/* Customize these two values before publishing. No private details are required. */
const INVITATION_CONFIG = Object.freeze({ brideName: 'Samayak', whatsappNumber: '' });
const $ = (selector) => document.querySelector(selector);
const storage = { get(key) { try { return localStorage.getItem(key); } catch { return null; } }, set(key, value) { try { localStorage.setItem(key, value); } catch { /* Private browsing: keep this session usable. */ } } };
let brideName = storage.get('wedding-bride') || INVITATION_CONFIG.brideName;
let response = storage.get('wedding-rsvp');
if (!['yes', 'no'].includes(response)) response = null;

function updateWhatsApp() {
  const answer = response === 'yes' ? 'I’ll be delighted to attend.' : response === 'no' ? 'Unfortunately, I can’t make it. Sending my love and blessings!' : 'I’d like to respond to your invitation.';
  const message = `Thank you for inviting me to the wedding celebrations of Samayak & ${brideName} on 27–28 November 2026. ${answer}`;
  $('#whatsapp').href = `https://wa.me/${INVITATION_CONFIG.whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
}
function updateBride() {
  document.querySelectorAll('[data-bride]').forEach(el => { el.textContent = brideName; });
  document.title = `Srishti & ${brideName} · A Wedding Celebration`;
  updateWhatsApp();
}
function updateRSVP() {
  document.querySelectorAll('.rsvp-choice').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.answer === response)));
  $('#rsvp-status').textContent = response === 'yes' ? 'Wonderful! Send your confirmation below.' : response === 'no' ? 'You’ll be missed. Send your wishes below.' : 'Choose your response above.';
  updateWhatsApp();
}
document.querySelectorAll('.rsvp-choice').forEach(button => button.addEventListener('click', () => { response = button.dataset.answer; storage.set('wedding-rsvp', response); updateRSVP(); }));
updateBride(); updateRSVP();
document.querySelectorAll('.floral').forEach(el => { el.innerHTML = '<svg class="leaves" aria-hidden="true"><use href="#branch"/></svg><svg class="bloom" aria-hidden="true"><use href="#flower"/></svg><svg class="bloom small" aria-hidden="true"><use href="#flower"/></svg><svg class="bloom cream" aria-hidden="true"><use href="#flower"/></svg>'; });
if ('IntersectionObserver' in window) {
  document.documentElement.classList.add('js-reveal');
  const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); revealObserver.unobserve(entry.target); } }), { threshold: 0.07 });
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
}
const lightbox = $('#lightbox');
document.querySelectorAll('.gallery-item').forEach(button => button.addEventListener('click', () => { const image = button.querySelector('img'); $('#lightbox-image').src = image.src; $('#lightbox-image').alt = image.alt; $('#lightbox-caption').textContent = button.dataset.caption; lightbox.showModal(); }));
$('#close-gallery').addEventListener('click', () => lightbox.close());
lightbox.addEventListener('click', event => { if (event.target === lightbox) { const rect = lightbox.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) lightbox.close(); } });
const editor = $('#edit-dialog');
$('#edit-details').addEventListener('click', () => { $('#bride-input').value = brideName; editor.showModal(); });
$('#cancel-edit').addEventListener('click', () => editor.close());
$('#bride-form').addEventListener('submit', event => { event.preventDefault(); const value = $('#bride-input').value.trim(); if (!value) { $('#bride-input').setCustomValidity('Please enter a name.'); $('#bride-input').reportValidity(); return; } brideName = value; storage.set('wedding-bride', value); updateBride(); editor.close(); });
$('#bride-input').addEventListener('input', event => event.target.setCustomValidity(''));

// Locally bundled original instrumental loop. Playback begins only on a guest's tap.
const music = new Audio('assets/music/wedding.mp3');
music.loop = true; music.preload = 'none'; music.volume = 0.35;
const musicButton = $('#music-toggle');
function setMusicState(playing) { musicButton.setAttribute('aria-pressed', String(playing)); musicButton.setAttribute('aria-label', playing ? 'Pause wedding music' : 'Play wedding music'); }
musicButton.addEventListener('click', async () => { if (!music.paused) { music.pause(); return; } musicButton.disabled = true; try { await music.play(); $('#music-status').textContent = 'Wedding music playing'; } catch { $('#music-status').textContent = 'Music could not play. Please try again.'; setMusicState(false); } finally { musicButton.disabled = false; } });
music.addEventListener('play', () => setMusicState(true));
music.addEventListener('pause', () => { setMusicState(false); $('#music-status').textContent = 'Wedding music paused'; });

$('#gallery-more').addEventListener('click', () => { const extra = $('.extra-photo'); extra.hidden = !extra.hidden; $('#gallery-more').setAttribute('aria-expanded', String(!extra.hidden)); $('#gallery-more').innerHTML = extra.hidden ? '<span>▧</span>View More Photos' : '<span>▧</span>Show Fewer Photos'; });
