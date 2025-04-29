import { checkForTouchscreen } from './checkForTouchscreen';
import * as DetectRTC from 'detectrtc';

/**
 * Function for creating our exp object that stores all variables.
 * Please note, the "exp" object will be manipulated in other functions.
 *
 * @return {object} exp, an object storing our experiment data
 *
 * @example
 *     initDatastructure()
 */
export function initDatastructure() {
  // get study choices from local storage
  const storedChoices = localStorage.getItem('storedChoices');
  let studyChoices;

  // If we find data in local storage, set studyChoices to that data
  if (storedChoices) {
    studyChoices = JSON.parse(storedChoices);
  } else {
    console.log(
      'No data found in local storage. Creating a studyChoices object.',
    );
  }

  // Define default values for all required keys
  const defaultValues = {
    subjID: 'testID',
    lang: 'eng-uk',
    webcam: 'false',
    touch: '1',
    fam: '1',
    test: '2',
    bg: '04',
    agents: 'f01-f02-f03-f04-m04-m05-m06-m07-m08',
  };

  // Check if studyChoices contains all required keys.
  // If not, set defaults for missing keys
  if (studyChoices) {
    Object.keys(defaultValues).forEach((key) => {
      if (!studyChoices.hasOwnProperty(key)) {
        studyChoices[key] = defaultValues[key];
        console.log(
          `Key "${key}" was missing. Set default value: "${defaultValues[key]}"`,
        );
      }
    });
  } else {
    console.log(
      'Setting the studyChoices object to default values:',
      JSON.stringify(defaultValues),
    );
    // Create a new object with default values
    studyChoices = { ...defaultValues };
  }

  const exp = {
    devmode: false, // true speeds up developing (e.g. playback rate)
    trial: 0, // counter which trial we are in

    // create empty variables for future storing
    log: [], // stores all participant responses & randomization
    elemSpecs: {}, // stores measurements & audio durations

    meta: {
      // save values from local storage
      subjID: studyChoices.subjID,
      lang: studyChoices.lang,
      webcam: JSON.parse(studyChoices.webcam),
      nrTouch: parseInt(studyChoices.touch),
      nrFam: parseInt(studyChoices.fam),
      nrTest: parseInt(studyChoices.test),
      bg: studyChoices.bg,
      agents: studyChoices.agents,
      // save some setting values
      touchscreen: checkForTouchscreen(),
      offsetHeight: document.body.offsetHeight,
      offsetWidth: document.body.offsetWidth,
      targetWidth: 160,
    },
  };

  exp.meta.trialsTotal = exp.meta.nrTouch + exp.meta.nrFam + exp.meta.nrTest;

  // concatenate trials to go through different study phases
  exp.state = ['welcome', 'instruction']
    .concat(
      new Array(exp.meta.nrTouch).fill('touch'),
      ['transition'],
      new Array(exp.meta.nrFam).fill('fam'),
      ['transition'],
      new Array(exp.meta.nrTest).fill('test'),
      'goodbye',
    )
    .flat();

  // log user testing setup
  DetectRTC.load(() => {
    exp.meta.safari = DetectRTC.browser.isSafari || false;
    exp.meta.iOSSafari = exp.meta.touchscreen && exp.meta.safari;
  });

  return exp;
}
