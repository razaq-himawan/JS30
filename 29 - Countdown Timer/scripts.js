let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const endTimeNA = document.querySelector('.display__end-time-na');
const buttons = document.querySelectorAll('[data-time]');

const timer = (seconds) => {
  clearInterval(countdown); // clear any existing timer
  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);
  displayEndTime(then);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);

    if (secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }
    displayTimeLeft(secondsLeft);
  }, 1000);
};

const displayTimeLeft = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const display = `${minutes}:${
    remainderSeconds < 10 ? '0' : ''
  }${remainderSeconds}`;
  document.title = display;
  timerDisplay.textContent = display;
};

const displayEndTime = (timestamp) => {
  const end = new Date(timestamp);
  const hours = end.getHours();
  const minutes = end.getMinutes();

  const adjustedMinute = minutes < 10 ? '0' : '';
  const adjustedHour = hours > 12 ? hours - 12 : hours;

  endTime.textContent = `Be Back At ${hours}:${adjustedMinute}${minutes}`;
  endTimeNA.textContent = `Be Back At ${adjustedHour}:${adjustedMinute}${minutes}`;
};

const startTimer = (e) => {
  const seconds = parseInt(e.currentTarget.dataset.time);
  timer(seconds);
};

buttons.forEach((button) => button.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const mins = e.currentTarget.minutes.value;
  timer(mins * 60);
  e.currentTarget.reset();
});
