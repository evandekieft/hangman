import useSound from "use-sound";
import failSfx from "../public/oof.mp3";

const FINAL_IMAGE = "IMG_0081.jpg";

export default function GameOver({ wordString, resetState, winStreak }) {
  const [play] = useSound(failSfx);
  play();
  return (
    <div className="App">
      <div className="gallows">
        <img height="150px" src={FINAL_IMAGE} alt="hangman" />
      </div>
      <h1>GAME OVER</h1>
      <h2>The word was: {wordString}</h2>
      <p>Winning streak: {winStreak}</p>
      <button onClick={resetState} className="btn btn-warning">
        Play Again
      </button>
    </div>
  );
}
