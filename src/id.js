import './css/style.css';
import * as mrec from '@ccp-eva/media-recorder';

const button = document.getElementById('start-button');
let continueIDOK = false;
// store already selected variables from index page
const url = new URL(document.location.href);
const lang = url.searchParams.get('lang') || 'eng-uk';
const agents = url.searchParams.get('agents');
const bg = url.searchParams.get('bg');
const touch = url.searchParams.get('touch');
const fam = url.searchParams.get('fam');
const test = url.searchParams.get('test');

// FOR INPUT FORM
const textField = document.getElementById('participant-id');

// define what happens on input
const handleInput = (event) => {
  event.preventDefault();
  // to get most recent value, get element fresh
  // count number of characters and display the count
  document.getElementById('id-counter').innerHTML = `${
    document.getElementById('participant-id').value.length
  } / 8`;

  continueIDOK = document.getElementById('participant-id').value.length > 0;
  // enable button when eight characters are entered
  button.disabled = !continueIDOK;
};

textField.addEventListener('keyup', handleInput, { capture: false });

// WEBCAM YES OR NO?
const webcamOptions = document.getElementsByName('webcam-options');
let webcam = 'false'; // no as default

for (const option of webcamOptions) {
  option.onclick = () => {
    if (option.checked) {
      webcam = option.value;
    }
  };
}

// WEBCAM PREVIEW
const webcamButton = document.getElementById('webcam-button');

const handleWebcamClick = (event) => {
  event.preventDefault();
  mrec.startStream({
    audio: false,
    video: {
      frameRate: {
        min: 3,
        ideal: 5,
        max: 30,
      },
      width: {
        min: 160,
        ideal: 320,
        max: 640,
      },
      height: {
        min: 120,
        ideal: 240,
        max: 480,
      },
      facingMode: 'user',
    },
  });
  mrec.openVideoPreview();
};

webcamButton.addEventListener('click', handleWebcamClick, { capture: false });

// define what happens on button click
const handleContinueClick = (event) => {
  event.preventDefault();
  const subjID = document.getElementById('participant-id').value;

  window.location.href = `./tango.html?lang=${lang}&touch=${touch}&fam=${fam}&test=${test}&bg=${bg}&agents=${agents}&ID=${subjID}&webcam=${webcam}`;
};

button.addEventListener('click', handleContinueClick, { capture: false });
