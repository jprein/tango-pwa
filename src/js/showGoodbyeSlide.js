import { showSlide } from './showSlide';
import { handleSpeakerClick } from './handleSpeakerClick';
import { downloadCsv } from './downloadCsv';
import { uploadCsv } from './uploadCsv';
import { closeFullscreen } from './closeFullscreen';

/**
 * Function that shows text after last trial and initiates download of data.
 *
 * @param {Object} exp - An object storing our experiment data
 *
 * @example
 *       showGoodbyeSlide(exp);
 */
export function showGoodbyeSlide(exp) {
  const downloadIcon = document.getElementById('download-icon');
  const button = document.getElementById('textslide-button');
  const buttonText = document.getElementById('textslide-button-text');
  const speaker = document.getElementById('speaker');
  const textslide = document.getElementById('textslide');
  const experimentslide = document.getElementById('experimentslide');
  const hedge = document.getElementById('hedge');
  const balloonBlue = document.getElementById('balloon-blue');
  const balloonYellow = document.getElementById('balloon-yellow');
  const balloonRed = document.getElementById('balloon-red');
  const balloonGreen = document.getElementById('balloon-green');

  document
    .getElementById('foreign-object-heading')
    .replaceChild(exp.txt.goodbyeHeading, exp.txt.instructionsTestHeading);
  document
    .getElementById('foreign-object-center-left')
    .replaceChild(exp.txt.goodbyeParagraph, exp.txt.instructionsTestParagraph);
  document
    .getElementById('foreign-object-center-right')
    .replaceChild(exp.txt.familyImage, exp.txt.instructionsTestImage);

  if (exp.meta.lang === 'ger') {
    buttonText.innerHTML = 'weiter';
  } else {
    buttonText.innerHTML = 'exit';
  }

  showSlide(
    [textslide, speaker, button, downloadIcon],
    [
      experimentslide,
      hedge,
      exp.meta.selectedAgents,
      exp.meta.selectedTargets,
      exp.meta.selectedBackground,
      balloonBlue,
      balloonGreen,
      balloonRed,
      balloonYellow,
    ],
  );

  // start audio when speaker has been clicked
  speaker.addEventListener(
    'click',
    function () {
      handleSpeakerClick(exp);
    },
    {
      capture: false,
      once: false,
    },
  );

  // turn response log into csv format
  console.log(exp.meta.saving);

  // depending on the saving method, upload or download the data
  if (exp.meta.saving === 'upload') {
    uploadCsv(exp.log, exp.meta.subjID);
    // give some time to create Video Blob
    if (!exp.meta.iOSSafari && exp.meta.webcam) {
      mrec.stopRecorder();

      // show upload spinner
      mrec.modalContent(
        '<img src=\'/tango-gaze/images/spinner-upload-de.svg\' style="width: 75vw">',
        '#E1B4B4',
      );

      const day = new Date().toISOString().substring(0, 10);
      const time = new Date().toISOString().substring(11, 19);

      setTimeout(
        () =>
          mrec.uploadVideo(
            {
              fname: `tango-${exp.meta.subjID}-${day}-${time}`,
              uploadContent:
                '<img src=\'/tango-gaze/images/spinner-upload-de.svg\' style="width: 75vw">',
              uploadColor: '#E1B4B4',
              successContent:
                '<img src=\'/tango-gaze/images/spinner-done-de.svg\' style="width: 75vw">',
              successColor: '#D3F9D3',
            },
            './data/upload_video.php',
          ),
        2000,
      );
    }
  } else if (exp.meta.saving === 'download') {
    downloadCsv(exp.log, exp.meta.subjID);
    // save the video locally
    if (!exp.meta.iOSSafari && exp.meta.webcam) {
      mrec.stopRecorder();
      // give some time to create Video Blob
      const day = new Date().toISOString().substring(0, 10);
      const time = new Date().toISOString().substring(11, 19);
      setTimeout(
        () => mrec.downloadVideo(`tangoCC-${exp.meta.subjID}-${day}-${time}`),
        1000,
      );
    }
  }

  // on button click, trigger download
  const handleDownloadClick = () => {
    downloadCsv(exp.log, exp.meta.subjID);
    if (!exp.meta.iOSSafari && exp.meta.webcam) {
      mrec.stopRecorder();
      const day = new Date().toISOString().substring(0, 10);
      const time = new Date().toISOString().substring(11, 19);
      setTimeout(
        () => mrec.downloadVideo(`tangoCC-${exp.meta.subjID}-${day}-${time}`),
        1000,
      );
    }
  };

  downloadIcon.addEventListener('click', handleDownloadClick, {
    capture: false,
    once: false,
  });

  // on button click, advance to first trial
  const handleContinueClick = () => {
    // pause audio
    exp.soundEffect.pause();
    exp.soundEffect.currentTime = 0;

    // disable fullscreen mode
    if (!exp.devmode) {
      closeFullscreen();
    }

    // if german, then forward to own thank you page
    if (exp.meta.lang === 'ger') {
      window.location.replace(
        `https://devpsy.web.leuphana.de/tango-consent/goodbye.html?subjID=${exp.meta.subjID}`,
      );
      // otherwise, show english thank you page
    } else {
      window.location.replace(`./goodbye.html`);
    }
  };

  button.addEventListener('click', handleContinueClick, {
    capture: false,
    once: true,
  });
}
