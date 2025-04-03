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

  if (storedChoices) {
    studyChoices = JSON.parse(storedChoices);
  } else {
    console.error('No data found in local storage');
  }

  const exp = {
    devmode: false, // true speeds up developing (e.g. playback rate)
    trial: 0, // counter which trial we are in

    // create empty variables for future storing
    log: [], // stores all participant responses & randomization
    elemSpecs: {}, // stores measurements & audio durations

    meta: {
      // get some values out of URL parameters, handed over from index.html, entered by users
      subjID: studyChoices.subjID || 'testID',
      lang: studyChoices.lang || 'eng-uk',
      webcam: JSON.parse(studyChoices.webcam) || false,
      nrTouch: parseInt(studyChoices.touch) || 1,
      nrFam: parseInt(studyChoices.fam) || 1,
      nrTest: parseInt(studyChoices.test) || 2,
      bg: studyChoices.bg || '04',
      agents: studyChoices.agents || 'f01-f02-f03-f04-m04-m05-m06-m07-m08',
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
