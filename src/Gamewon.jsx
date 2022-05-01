import Spin from "react-reveal/Spin";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";

import useSound from "use-sound";
import winSfx from "../public/yessir.mp3";

export default function GameWon({ wordString, playCallback, winStreak }) {
  const { width, height } = useWindowSize();
  const [play] = useSound(winSfx);
  play();

  return (
    <div className="App gameWon">
      <Confetti width={width} height={height} />
      <h1>YOU WIN!!</h1>
      <div className="hangmanLetter">
        <Spin className="hangmanLetter">{wordString}</Spin>
      </div>
      <p className="winStreak">Current winning streak: {winStreak + 1}</p>
      <div>
        <button onClick={playCallback} className="btn btn-success">
          Play Again
        </button>
      </div>
    </div>
  );
}
