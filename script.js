const BIRTHDAY_DATE = '2026-10-15T00:00:00';

const countdownEls = {
  days: document.querySelector('#days'),
  hours: document.querySelector('#hours'),
  minutes: document.querySelector('#minutes'),
  seconds: document.querySelector('#seconds'),
};

function updateCountdown() {
  const diff = new Date(BIRTHDAY_DATE).getTime() - Date.now();

  if (diff <= 0) {
    countdownEls.days.textContent = '00';
    countdownEls.hours.textContent = '00';
    countdownEls.minutes.textContent = '00';
    countdownEls.seconds.textContent = '00';
    return;
  }

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  countdownEls.days.textContent = String(days).padStart(2, '0');
  countdownEls.hours.textContent = String(hours).padStart(2, '0');
  countdownEls.minutes.textContent = String(minutes).padStart(2, '0');
  countdownEls.seconds.textContent = String(seconds).padStart(2, '0');
}

updateCountdown();
setInterval(updateCountdown, 1000);

const heartsContainer = document.querySelector('.floating-hearts');
for (let i = 0; i < 20; i += 1) {
  const heart = document.createElement('span');
  heart.className = 'heart-particle';
  heart.textContent = i % 2 === 0 ? '❤' : '♡';
  heart.style.left = `${Math.random() * 100}%`;
  heart.style.animationDuration = `${8 + Math.random() * 12}s`;
  heart.style.fontSize = `${0.8 + Math.random() * 1.4}rem`;
  heart.style.setProperty('--drift', `${(Math.random() - 0.5) * 140}px`);
  heartsContainer.appendChild(heart);
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.18 });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

const wishButton = document.getElementById('wish-button');
wishButton.addEventListener('click', () => {
  const cakeScene = document.querySelector('.cake-wrap');
  cakeScene.animate(
    [
      { transform: 'scale(1)' },
      { transform: 'scale(1.04)' },
      { transform: 'scale(1)' }
    ],
    { duration: 500, easing: 'ease-out' }
  );
  wishButton.textContent = 'Wish Sent ✨';
});

const openLetterButton = document.getElementById('open-letter');
const letterModal = document.getElementById('letter-modal');
const closeLetterButton = document.getElementById('close-letter');

openLetterButton.addEventListener('click', () => {
  letterModal.classList.add('open');
  letterModal.setAttribute('aria-hidden', 'false');
});

closeLetterButton.addEventListener('click', () => {
  letterModal.classList.remove('open');
  letterModal.setAttribute('aria-hidden', 'true');
});

letterModal.addEventListener('click', (event) => {
  if (event.target === letterModal) {
    letterModal.classList.remove('open');
    letterModal.setAttribute('aria-hidden', 'true');
  }
});

const giftButtons = document.querySelectorAll('.gift-box');
const giftMessage = document.getElementById('gift-message');

giftButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const message = button.dataset.message;
    giftMessage.textContent = message;
    giftMessage.style.color = '#ff7aa8';
    giftMessage.style.fontWeight = '700';
  });
});

const musicToggle = document.getElementById('music-toggle');
let audioCtx = null;
let musicLoop = null;

function playBirthdayTune() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }

  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }

  const notes = [261.63, 329.63, 392.0, 329.63, 349.23, 440.0, 392.0, 329.63];
  let index = 0;

  function playNote() {
    if (!audioCtx) return;

    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    oscillator.type = 'sine';
    oscillator.frequency.value = notes[index % notes.length];
    gainNode.gain.value = 0.03;

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.28);
    index += 1;
  }

  musicLoop = setInterval(playNote, 280);
}

function stopBirthdayTune() {
  clearInterval(musicLoop);
  musicLoop = null;
}

musicToggle.addEventListener('click', () => {
  const isPlaying = musicToggle.dataset.playing === 'true';

  if (isPlaying) {
    musicToggle.dataset.playing = 'false';
    musicToggle.innerHTML = '<span>♫</span> Music Off';
    stopBirthdayTune();
  } else {
    musicToggle.dataset.playing = 'true';
    musicToggle.innerHTML = '<span>♫</span> Music On';
    playBirthdayTune();
  }
});

document.querySelector('.primary-btn[data-target="#letter"]').addEventListener('click', () => {
  letterModal.classList.add('open');
  letterModal.setAttribute('aria-hidden', 'false');
});

























