import './css/style.css';
import * as mrec from '@ccp-eva/media-recorder';

const storedChoices = localStorage.getItem('storedChoices');
let studyChoices;

if (storedChoices) {
  studyChoices = JSON.parse(storedChoices);
} else {
  console.error('No data found in local storage');
}

const button = document.getElementById('start-button');
let continueIDOK = false;

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
studyChoices.webcam = 'false'; // no as default

for (const option of webcamOptions) {
  option.onclick = () => {
    if (option.checked) {
      studyChoices.webcam = option.value;
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
  studyChoices.subjID = document.getElementById('participant-id').value;
  // save the choices to local storage
  localStorage.setItem('storedChoices', JSON.stringify(studyChoices));
  window.location.href = './tango.html';
};

button.addEventListener('click', handleContinueClick, { capture: false });
