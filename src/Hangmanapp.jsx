import "./styles.css";
import React, { useState } from "react";

import Homescreen from "./Homescreen";
import GameOver from "./Gameover";
import GameWon from "./Gamewon";
import GamePlaying from "./Gameplaying";

const GALLOWS = [
  "IMG_0083.jpg",
  "IMG_0076.jpg",
  "IMG_0077.jpg",
  "IMG_0078.jpg",
  "IMG_0079.jpg",
  "IMG_0081.jpg"
];

const GAME_ACTIVE = 0;
const GAME_OVER = 1;
const GAME_WON = 2;
const GAME_HOME = 3;

export default function HangmanApp() {
  const [word, setWord] = useState(null);
  const [guessed, setGuessed] = useState([]);
  const [gallowsIndex, setGallowsIndex] = useState(0);
  const [winStreak, setWinStreak] = useState(0);

  function haveWon() {
    if (!word) {
      return false;
    }
    for (const letter of word) {
      if (!guessed.includes(letter)) {
        return false;
      }
    }
    return true;
  }

  function resetState() {
    setWinStreak(0);
    setWord(null);
    setGuessed([]);
    setGallowsIndex(0);
  }

  function continueWinStreak() {
    setWinStreak(winStreak + 1);
    setWord(null);
    setGuessed([]);
    setGallowsIndex(0);
  }

  function getGameState() {
    if (gallowsIndex >= GALLOWS.length - 1) {
      return GAME_OVER;
    } else if (!word) {
      return GAME_HOME;
    } else if (haveWon()) {
      return GAME_WON;
    } else {
      return GAME_ACTIVE;
    }
  }

  const gameState = getGameState();
  if (gameState === GAME_OVER) {
    return (
      <GameOver
        wordString={word.join("")}
        resetState={resetState}
        winStreak={winStreak}
      />
    );
  } else if (gameState === GAME_WON) {
    return (
      <GameWon
        wordString={word.join("")}
        playCallback={continueWinStreak}
        winStreak={winStreak}
      />
    );
  } else if (gameState === GAME_HOME) {
    return <Homescreen setWord={setWord} />;
  } else {
    return (
      <GamePlaying
        word={word}
        guessed={guessed}
        setGuessed={setGuessed}
        GALLOWS={GALLOWS}
        gallowsIndex={gallowsIndex}
        setGallowsIndex={setGallowsIndex}
        winStreak={winStreak}
      />
    );
  }
}
