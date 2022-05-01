import "./styles.css";
import React, { useState } from "react";

import Homescreen from "./Homescreen";
import GameOver from "./Gameover";
import GameWon from "./Gamewon";
import GamePlaying from "./Gameplaying";
import { loadWords } from "./words";

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

const DIFFICULTY_EASY = 1;
const DIFFICULTY_MEDIUM = 2;
const DIFFICULTY_HARD = 3;

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function getDifficulty(word) {
  if (word.length <= 4) return DIFFICULTY_EASY;
  else if (word.length <= 6) return DIFFICULTY_MEDIUM;
  else return DIFFICULTY_HARD;
}

export default function HangmanApp() {
  const [word, setWord] = useState(null);
  const [guessed, setGuessed] = useState([]);
  const [gallowsIndex, setGallowsIndex] = useState(0);
  const [winStreak, setWinStreak] = useState(0);
  const [difficulty, setDifficulty] = useState(null);

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
    setDifficulty(null);
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
    } else if (!difficulty) {
      return GAME_HOME;
    } else if (haveWon()) {
      return GAME_WON;
    } else {
      return GAME_ACTIVE;
    }
  }

  function loadWordList(difficulty) {
    console.log("LOADWORDLIST CALLED WITH DIFFICULTY: " + difficulty);
    const wordLists = {};
    wordLists[DIFFICULTY_EASY] = [];
    wordLists[DIFFICULTY_MEDIUM] = [];
    wordLists[DIFFICULTY_HARD] = [];
    console.log(wordLists);

    loadWords().then((words) => {
      for (const word of words) {
        const difficulty = getDifficulty(word);
        wordLists[difficulty].push(word);
      }

      console.log("Number of easy words: " + wordLists[DIFFICULTY_EASY].length);
      console.log(
        "Number of medium words: " + wordLists[DIFFICULTY_MEDIUM].length
      );
      console.log("Number of hard words: " + wordLists[DIFFICULTY_HARD].length);

      const wordList = wordLists[difficulty];
      const index = getRandomInt(wordList.length);
      const w = wordList[index];
      setWord(w.split(""));
      setDifficulty(difficulty);
    });
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
    return (
      <Homescreen
        setWord={setWord}
        loadWordList={loadWordList}
        DIFFICULTY_EASY={DIFFICULTY_EASY}
        DIFFICULTY_MEDIUM={DIFFICULTY_MEDIUM}
        DIFFICULTY_HARD={DIFFICULTY_HARD}
      />
    );
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
        difficulty={difficulty}
        loadWordList={loadWordList}
        resetState={resetState}
      />
    );
  }
}
