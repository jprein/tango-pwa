import instructionsTouchImageSrc from '../images/touch.png';
import instructionsFamImageSrc from '../images/fam.png';
import instructionsTestImageSrc from '../images/test.png';
import familyImageSrc from '../images/familypic.png';

/**
 * Function for setting text on SVG slides, according to language
 *
 * @param {Object} exp - An object storing our experiment data
 * @return {object} An object storing HTML elements / their inner text
 *
 * @example
 *     experimentalInstructions(exp)
 */
export function experimentalInstructions(exp) {
  const experimentslideButtonText = document.getElementById(
    'experimentslide-button-text',
  );
  const textslideButtonText = document.getElementById('textslide-button-text');
  const txt = {};

  txt.welcomeHeading = document.createElement('div');
  txt.welcomeParagraph = document.createElement('div');
  txt.welcomeImage = document.createElement('img');
  txt.welcomeImage.style = 'width: inherit';

  txt.instructionsTouchHeading = document.createElement('div');
  txt.instructionsTouchParagraph = document.createElement('div');
  txt.instructionsTouchImage = document.createElement('img');
  txt.instructionsTouchImage.style = 'width: inherit';

  txt.instructionsFamHeading = document.createElement('div');
  txt.instructionsFamParagraph = document.createElement('div');
  txt.instructionsFamImage = document.createElement('img');
  txt.instructionsFamImage.style = 'width: inherit';

  txt.instructionsTestHeading = document.createElement('div');
  txt.instructionsTestParagraph = document.createElement('div');
  txt.instructionsTestImage = document.createElement('img');
  txt.instructionsTestImage.style = 'width: inherit';

  txt.goodbyeHeading = document.createElement('div');
  txt.goodbyeParagraph = document.createElement('div');
  txt.familyImage = document.createElement('img');
  txt.familyImage.style = 'width: inherit';

  // add instruction pictures
  txt.instructionsTouchImage.src = instructionsTouchImageSrc;
  txt.instructionsFamImage.src = instructionsFamImageSrc;
  txt.instructionsTestImage.src = instructionsTestImageSrc;
  txt.familyImage.src = familyImageSrc;

  // for german version, show german text instructions
  switch (exp.meta.lang) {
    case 'ger':
      document.title = 'Max-Planck-Kinderstudie';
      textslideButtonText.innerHTML = 'weiter';
      experimentslideButtonText.innerHTML = 'weiter';
      txt.landscapemode = 'Bitte benutzen Sie Ihr Gerät im Querformat!';

      // headings
      txt.welcomeHeading.innerHTML =
        '<h1> Willkommen zu unserem Ballonspiel! </h1>';
      txt.instructionsTouchHeading.innerHTML =
        '<h1> Gleich geht es los... </h1>';
      txt.instructionsFamHeading.innerHTML =
        '<h1> Super! Den ersten Teil habt ihr geschafft! </h1>';
      txt.instructionsTestHeading.innerHTML =
        '<h1> Super! Jetzt kommt der letzte Teil. </h1>';
      txt.goodbyeHeading.innerHTML = '<h1> Fertig! </h1>';

      txt.welcomeParagraph.innerHTML = `<p> 
        Schön, dass Sie hier sind! 
        Wir möchten nun zusammen mit Ihrem Kind die Ballons von Tieren suchen. <br> <br>
        Nehmen Sie sich gerne so viel Zeit, wie Sie möchten. 
        Falls Ihr Kind unruhig wird oder sich langweilt, können Sie jederzeit eine kurze Pause machen. <br> <br>
        Wenn Ihr Kind Sie um Rat fragt oder sich unsicher ist, sagen Sie bitte <em> "Zeig, was Du denkst"</em>. 
        Alles, was Ihr Kind antwortet, ist prima. 
        Bitte helfen Sie Ihrem Kind nicht bei den Aufgaben - wir wollen ja etwas über Kinder lernen! <br> <br>
        <strong> 
        Klicken Sie auf den "weiter"-Knopf, um den Vollbildmodus zu aktivieren und mehr über das Spiel zu erfahren. 
        </strong>
        </p>`;

      txt.instructionsTouchParagraph.innerHTML = `<p> 
          Durch einen Klick auf das Lautsprecher-Symbol hören Sie eine kurze Begrüßung.
          Diese können Sie sich so oft anhören, wie Sie möchten. <br>
          Nachdem die Sprachaufnahme vollständig abgespielt ist, erscheint ein "weiter"-Knopf unten auf der Seite.
          Diesen drücken Sie bitte, wenn Sie mit Ihrem Kind das Spiel starten möchten.
          Dann wird Ihr Kind mit einer Sprachaufnahme durch das Ballonspiel geführt. <br> <br>
          <strong> 
          In dem Ballonspiel stellen wir Ihrem Kind immer wieder eine Frage. 
          Um zu antworten, wählt Ihr Kind einen Ort aus. 
          Lassen Sie dafür Ihr Kind selbst auf den Bildschirm tippen. 
          Geben Sie Ihrem Kind bitte keinerlei Hinweise. 
          </strong> <br> <br>
          Bitte klicken Sie nun auf das Lautsprecher-Symbol. <br>
          </p>`;

      txt.instructionsFamParagraph.innerHTML = `<p> 
        <br> <br> <br> <br>
        Gleich geht es weiter. <br> <br>
        Das Spiel verändert sich ein bisschen, aber die Aufgabe bleibt die Gleiche 
        - Ihr Kind soll wieder den Ballon finden. <br> <br>
        Sobald ihr weiterspielen möchtet, klickt auf den "weiter"-Knopf.
        </p>`;

      txt.instructionsTestParagraph.innerHTML = `<p> 
        <br> <br> <br> <br>
        Gleich geht es weiter. <br> <br>
        Das Spiel verändert sich ein bisschen, aber die Aufgabe bleibt die Gleiche 
        - Ihr Kind soll wieder den Ballon finden. <br> <br>
        Sobald ihr weiterspielen möchtet, klickt auf den "weiter"-Knopf.
        </p>`;

      // goodbye text
      txt.goodbyeParagraph.innerHTML = `<p> 
        <br> <br> <br> <br>
        Wunderbar!
        Das hat Ihr Kind klasse gemacht! <br> <br>
        Wenn Sie auf das Lautsprecher-Symbol klicken, 
        kann Ihr Kind ein kleines Dankeschön und eine Verabschiedung hören. <br> <br>
        Klicken Sie dann auf den “weiter”-Knopf, um zur letzten Seite zu gelangen. 
        </p>`;
      break;

    // for all other languages, display english text instructions
    default:
      document.title = 'TANGO-CC';
      textslideButtonText.innerHTML = 'continue';
      experimentslideButtonText.innerHTML = 'continue';
      txt.landscapemode = 'Please use your device in landscape mode!';

      // headings
      txt.welcomeHeading.innerHTML = '<h1> Welcome to our balloon game! </h1>';
      txt.instructionsTouchHeading.innerHTML = '<h1> Before we start... </h1>';
      txt.instructionsFamHeading.innerHTML =
        '<h1> Great! Done with the first part! </h1>';
      txt.instructionsTestHeading.innerHTML =
        '<h1> Nice! Here comes the last part. </h1>';
      txt.goodbyeHeading.innerHTML = '<h1> Finished! </h1>';

      // text for the parents (children get audio instructions)
      txt.welcomeParagraph.innerHTML = `<p> 
  We’re glad you are here! 
  We  want to play a little balloon finding game. <br> <br>
  Feel free to take as much time as you like. If the child gets restless or bored, you can always take a short break. <br> <br>
  If the child asks you for advice or is unsure, please say "Show me what you think." 
  Anything the child responds is fine. 
  Please don't help with the task - we are here to learn something about kids! <br> <br>
  <strong>
  Click the "continue" button to enter full screen mode and learn more about the game.
  </strong>
  </p>`;

      txt.instructionsTouchParagraph.innerHTML = `<p> 
  By clicking on the speaker button, you can listen to a short welcome message.
  You can listen to this as often as you like. <br>
  Once the recording stopped playing, a "continue" button will appear on the bottom of the page.
  Please press this button once you are ready to start the game.
  You will then be guided through the game with the help of voice recordings. <br> <br>
  <strong> In our balloon game, we will frequently ask a question. 
  To answer, the child can click at a location on the touch screen. 
  Please do not give any hints. <br> <br>
  Now please click on the speaker icon. </strong>
  </p>`;

      txt.instructionsFamImage.src = instructionsFamImageSrc;
      txt.instructionsTestImage.src = instructionsTestImageSrc;

      txt.instructionsFamParagraph.innerHTML = `<p> 
  <br> <br> <br> <br>
  In a moment, you can continue playing. <br> <br>
  The game changes a bit, but the task remains the same - to find the balloon. <br> <br>
  As soon as you want to continue playing, click the "continue" button again. <br>
  </p>`;

      txt.instructionsTestParagraph.innerHTML = `<p> 
  <br> <br> <br> <br>
  In a moment, you can continue playing. <br> <br>
  The game changes a bit, but the task remains the same - to find the balloon. <br> <br>
  As soon as you want to continue playing, click the "continue" button again. <br>
  </p>`;

      // goodbye text
      txt.goodbyeParagraph.innerHTML = `<p> 
  <br> <br>
  Wonderful! 
  You did a great job! <br> <br>
  If you click on the speaker button, you can hear a little goodbye message. <br> <br> 
  Click on the "continue" button to go to the last page.
  </p>`;
  }
  return txt;
}
