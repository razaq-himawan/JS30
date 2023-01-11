const sliders = document.querySelectorAll('.player__slider');
const toggle = document.querySelector('.toggle');
const skipButtons = document.querySelectorAll('[data-skip]');

const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const fullscreen = player.querySelector('.fullscreen');

fullscreen.addEventListener('click', () => {
  player.requestFullscreen();
});

const togglePlay = () => {
  video.paused ? video.play() : video.pause();
  //   video[video.paused ? video.play() : video.pause()]();  if you are really crazy
};

const updateButton = e => {
  toggle.textContent = e.target.paused ? '►' : '❚ ❚';
};

const skip = e => {
  video.currentTime += parseFloat(e.target.dataset.skip);
};

const changeValue = e => {
  const { name, value } = e.target;
  video[name] = value;
};

const handleProgress = () => {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
};

const scrub = e => {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
};

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);

skipButtons.forEach(button => button.addEventListener('click', skip));

sliders.forEach(slide => slide.addEventListener('change', changeValue));
sliders.forEach(slide => slide.addEventListener('mousemove', changeValue));

let mousedown = false;

progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', e => mousedown && scrub(e));
progress.addEventListener('mousedown', () => (mousedown = true));
progress.addEventListener('mouseup', () => (mousedown = false));
