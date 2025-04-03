import './css/style.css';
import { initPWA } from './service-worker/pwa.js';

const app = document.querySelector('#app');

// SET UP PWA
initPWA(app);

const button = document.getElementById('continue-button');

// LANGUAGE CHOICE
const languageOptions = document.getElementById('language-options');
let lang = languageOptions.value;

languageOptions.addEventListener('change', function () {
  lang = languageOptions.value;
});

// CUSTOMZE YES OR NO?
const customizeOptions = document.getElementsByName('customize-options');
let customize = 'false'; // no as default

for (const option of customizeOptions) {
  option.onclick = () => {
    if (option.checked) {
      customize = option.value;
    }
  };
}

// define what happens on button click
const handleContinueClick = (event) => {
  event.preventDefault();

  let agents;
  let bg;
  switch (lang) {
    case 'bay':
      agents = 'f01-f02-f03-f04-m01-m02-m03-m04';
      bg = '02';
      break;
    case 'bem':
      agents = 'f01-f02-f03-f04-m01-m02-m03-m04';
      bg = '01';
      break;
    case 'chi':
      agents = 'f18-f19-f20-f21-m18-m19-m20-m21';
      bg = '01';
      break;
    case 'eng-in':
      agents = 'f22-f23-f24-f25-m22-m23-m24-m25';
      bg = '01';
      break;
    case 'eng-nz':
      agents = 'f05-f06-f11-f15-m05-m06-m11-m15';
      bg = '01';
      break;
    case 'eng-ni':
      agents = 'f01-f02-f03-f04-m01-m02-m03-m04';
      bg = '01';
      break;
    case 'eng-uk':
      agents = 'f05-f07-f08-f10-m03-m06-m09-m11';
      bg = '01';
      break;
    case 'eng-us':
      agents = 'f01-f05-f06-f09-m05-m06-m08-m09';
      bg = '01';
      break;
    case 'ger':
      agents = 'f05-f07-f08-f10-m03-m06-m09-m11';
      bg = '01';
      break;
    case 'hai':
      agents = 'f01-f02-f03-f04-m01-m02-m03-m04';
      bg = '01';
      break;
    case 'khw':
      agents = 'f01-f02-f03-f04-m01-m02-m03-m04';
      bg = '01';
      break;
    case 'lin':
      agents = 'f01-f02-f03-f04-m01-m02-m03-m04';
      bg = '02';
      break;
    case 'mar':
      agents = 'f22-f23-f24-f25-m22-m23-m24-m25';
      bg = '01';
      break;
    case 'sho':
      agents = 'f01-f02-f03-f04-m01-m02-m03-m04';
      bg = '01';
      break;
    case 'spa-ar':
      agents = 'f05-f07-f09-f21-m05-m07-m13-m18';
      bg = '01';
      break;
    case 'spa-me':
      agents = 'f05-f12-f15-f16-m13-m14-m15-m17';
      bg = '01';
      break;
    case 'swa':
      agents = 'f01-f02-f03-f04-m01-m02-m03-m04';
      bg = '02';
      break;
    case 'tur':
      agents = 'f05-f09-f18-f21-m05-m09-m18-m21';
      bg = '01';
      break;
    case 'custom':
      agents = 'f01-f02-f03-f04-m01-m02-m03-m04';
      bg = '01';
      break;
  }

  // Store data in local storage
  const studyChoices = {
    lang,
    agents,
    bg,
    touch: '1',
    fam: '2',
    test: '16',
  };

  localStorage.setItem('storedChoices', JSON.stringify(studyChoices));

  // Navigate to the appropriate page
  if (customize === 'true') {
    window.location.href = './customize.html';
  } else {
    window.location.href = './id.html';
  }
};

button.addEventListener('click', handleContinueClick, { capture: false });
