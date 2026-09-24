const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
menuButton?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});

document.querySelectorAll('.nav a').forEach(link => {
  link.addEventListener('click', () => nav.classList.remove('open'));
});

document.getElementById('year').textContent = new Date().getFullYear();

const audio = document.getElementById('caribbeanAudio');
const musicButton = document.getElementById('musicButton');
const musicNote = document.getElementById('musicNote');

musicButton?.addEventListener('click', async () => {
  if (!audio.querySelector('source')?.getAttribute('src')) return;
  try {
    if (audio.paused) {
      await audio.play();
      musicButton.textContent = '❚❚ Pause Caribbean Music';
      musicButton.setAttribute('aria-pressed', 'true');
      musicNote.textContent = 'Music playing';
    } else {
      audio.pause();
      musicButton.textContent = '♫ Play Caribbean Music';
      musicButton.setAttribute('aria-pressed', 'false');
      musicNote.textContent = 'Music paused';
    }
  } catch {
    musicNote.textContent = 'Add a licensed MP3 file at assets/caribbean-music.mp3 to enable music.';
  }
});

const form = document.getElementById('quoteForm');
form?.addEventListener('submit', (event) => {
  event.preventDefault();
  document.getElementById('formMessage').textContent =
    'Your quote form is ready. Next, we’ll connect it to your business email so submissions can be sent to you.';
});