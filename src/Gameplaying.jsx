import React, { useState } from "react";
import Tada from "react-reveal/Tada";
import Header from "./Header";
import useSound from "use-sound";
import correctSfx from "../public/ding.m4a";
import incorrectSfx from "../public/buzz.mp3";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default function GamePlaying({
  word,
  guessed,
  setGuessed,
  GALLOWS,
  gallowsIndex,
  setGallowsIndex,
  winStreak
}) {
  function onCorrectGuess(letter, playCorrect) {
    playCorrect();
  }

  function onIncorrectGuess(letter, playIncorrect) {
    setGallowsIndex(gallowsIndex + 1);
    if (gallowsIndex + 1 < GALLOWS.length - 1) {
      // not yet game over
      playIncorrect();
    }
  }

  function letterPressed(e, playCorrect, playIncorrect) {
    const letter = e.target.id.toUpperCase();
    setGuessed(guessed.concat(letter));
    if (!word.includes(letter)) {
      onIncorrectGuess(letter, playIncorrect);
    } else {
      onCorrectGuess(letter, playCorrect);
    }
  }

  function hintPressed(e) {
    const wordLetterSet = new Set(word);
    const guessedSet = new Set(guessed);
    const differenceSet = new Set(
      [...wordLetterSet].filter((x) => !guessedSet.has(x))
    );
    const differenceList = [...differenceSet];
    setHint(differenceList[0]);
    /*
    setTimeout(() => {
      setHint(null);
    }, 1000);
    */
  }

  const [hint, setHint] = useState(null);
  const [playIncorrect] = useSound(incorrectSfx);
  const [playCorrect] = useSound(correctSfx);
  const guessesRemaining = GALLOWS.length - gallowsIndex - 1;

  const letters = word.map((c, index) => {
    if (guessed.includes(c)) {
      return (
        <span className="hangmanLetter" key={index}>
          <Tada left>{c}</Tada>
        </span>
      );
    } else {
      return (
        <span className="hangmanLetter" key={index}>
          _
        </span>
      );
    }
  });

  const buttons = ALPHABET.map((c) => {
    const disabled = guessed.includes(c);
    let color = "btn-primary";
    if (guessed.includes(c)) {
      if (word.includes(c)) {
        color = "btn-success";
      } else {
        color = "btn-danger";
      }
    } else {
      color = "btn-primary";
    }
    let hintClass = "";
    if (hint === c) {
      hintClass = " shakeButton";
    }
    const className = "letterButton btn btn-sm active ";

    return (
      <button
        id={c}
        disabled={disabled}
        className={className + color + hintClass}
        key={c}
        onClick={(e) => {
          letterPressed(e, playCorrect, playIncorrect);
        }}
      >
        {c}
      </button>
    );
  });

  return (
    <div className="App">
      <Header />
      <div className="winStreak-container">
        <div className="winStreak-box">
          <p>{winStreak}</p>
        </div>
        <div className="winStreak-title">Wins</div>
      </div>

      <div className="gallows">
        <img height="150px" src={GALLOWS[gallowsIndex]} alt="hangman" />
      </div>
      <div>{letters}</div>
      <div>{buttons}</div>
      <div>Number of guesses remaining: {guessesRemaining}</div>
      <div className="hints">
        <button
          disabled={hint}
          onClick={hintPressed}
          className="btn btn-sm btn-success"
        >
          Give hint
        </button>
      </div>
    </div>
  );
}
