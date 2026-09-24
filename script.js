const BIRTHDAY_DATE = '2026-10-15T00:00:00';

const pad = (value) => String(value).padStart(2, '0');
const countdownEls = {
  days: document.querySelector('#days'),
  hours: document.querySelector('#hours'),
  minutes: document.querySelector('#minutes'),
  seconds: document.querySelector('#seconds'),
};
const countdownNote = document.querySelector('#countdown-note');

function updateCountdown() {
  const difference = new Date(BIRTHDAY_DATE).getTime() - Date.now();
  if (difference <= 0) {
    countdownEls.days.textContent = '00';
    countdownEls.hours.textContent = '00';
    countdownEls.minutes.textContent = '00';
    countdownEls.seconds.textContent = '00';
    countdownNote.textContent = 'Today is all about you. Happy birthday, my love!';
    return;
  }
  const seconds = Math.floor(difference / 1000);
  countdownEls.days.textContent = pad(Math.floor(seconds / 86400));
  countdownEls.hours.textContent = pad(Math.floor((seconds % 86400) / 3600));
  countdownEls.minutes.textContent = pad(Math.floor((seconds % 3600) / 60));
  countdownEls.seconds.textContent = pad(seconds % 60);
}
updateCountdown();
setInterval(updateCountdown, 1000);

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

const petals = document.querySelector('.petals');
for (let i = 0; i < 15; i += 1) {
  const petal = document.createElement('i');
  petal.className = 'petal';
  petal.style.left = `${Math.random() * 100}%`;
  petal.style.animationDuration = `${10 + Math.random() * 13}s`;
  petal.style.animationDelay = `${Math.random() * -18}s`;
  petal.style.transform = `scale(${0.5 + Math.random() * 0.9})`;
  petals.appendChild(petal);
}

document.querySelector('#wish-button').addEventListener('click', () => {
  const message = document.querySelector('#wish-message');
  message.textContent = 'Wish received. I hope it comes true, beautiful. ✦';
  message.classList.add('visible');
  for (let i = 0; i < 16; i += 1) {
    const sparkle = document.createElement('i');
    sparkle.className = 'petal';
    sparkle.style.left = `${42 + Math.random() * 16}%`;
    sparkle.style.top = '70%';
    sparkle.style.animationDuration = `${1.2 + Math.random() * 1.2}s`;
    petals.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 2400);
  }
});

document.querySelector('.sound-toggle').addEventListener('click', (event) => {
  const button = event.currentTarget;
  const isOn = button.getAttribute('aria-pressed') === 'true';
  button.setAttribute('aria-pressed', String(!isOn));
  button.querySelector('.sound-label').textContent = isOn ? 'sound off' : 'sound on';
});
