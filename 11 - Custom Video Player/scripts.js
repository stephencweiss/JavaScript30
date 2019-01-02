/* Get our elements */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');


/* Build out functions */
function togglePlay() {
  const method = video.paused ? "play" : "pause"
  video[method]();
}

function updateButton() {
  const icon = video.paused ? '►' : '❚ ❚';
  toggle.textContent = icon;
}

function skip(e) {
  console.log('skipping');
  const amount = e.target.dataset.skip;
  video.currentTime += parseInt(amount);
}

function handleRangeUpdate(e) {
  const attributeName = e.target.name;
  const attributeValue = e.target.value;
  video[attributeName] = attributeValue;
}

function handleProgress(e) {
  const percentProgress = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percentProgress}%`;
}

function scrub(e) {
  console.log(e.offsetX)
  console.log(progress.offsetWidth)
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

// Event Listeners
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);

skipButtons.forEach(button => button.addEventListener('click', skip));

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

let mouseDown = false;
// progress.addEventListener('click', handleProgress);

progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mouseDown && scrub(e));

progress.addEventListener('mousedown', () => mouseDown = true)
progress.addEventListener('mouseup', () => mouseDown = false)

console.log(toggle);