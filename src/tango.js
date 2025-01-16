import './css/tango.css';
import { experimentalInstructions } from './js/experimentalInstructions';
import { randomizeTrials } from './js/randomizeTrials';
import { initWindowFunctionality } from './js/initWindowFunctionality';
import { initDatastructure } from './js/initDatastructure';
import { initStimuli } from './js/initStimuli';
import { initAudio } from './js/initAudio';
import { showWelcomeSlide } from './js/showWelcomeSlide';

document.addEventListener('DOMContentLoaded', async () => {
  // -------------------------------------------------------------------------------------------------------------------
  // INITIALIZATION
  // -------------------------------------------------------------------------------------------------------------------
  // create "exp" object, in which we store all variables, participant responses, measurements
  const exp = initDatastructure();

  // checks for screen orientation & enables download functions globally
  initWindowFunctionality(exp);

  // import experiment SVG
  const tangoSVGdiv = document.getElementById('tango-svg');
  try {
    const response = await fetch('/images/tango.svg');
    const svgContent = await response.text();
    tangoSVGdiv.innerHTML = svgContent;
  } catch (error) {
    console.error('Error loading SVG:', error);
  }

  exp.txt = experimentalInstructions(exp);

  // show selected faces, hide others, save original eye positions, enable text via foreignObjects
  initStimuli(exp);

  // save durations of audio files and enable Audio element for future use
  initAudio(exp);

  // -------------------------------------------------------------------------------------------------------------------
  // RANDOMIZATION OF AGENTS, TARGETS AND TARGET POSITIONS
  // -------------------------------------------------------------------------------------------------------------------
  randomizeTrials(exp, exp.meta.selectedAgents, exp.meta.selectedTargets);

  exp.targetClickTimer5sec = null;

  // -------------------------------------------------------------------------------------------------------------------
  // WELCOME SLIDE
  // -------------------------------------------------------------------------------------------------------------------
  showWelcomeSlide(exp); // in here, prepare famA

  if (exp.devmode) console.log(exp);
});
