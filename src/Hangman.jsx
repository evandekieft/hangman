import "./styles.css";
import React, { useState } from "react";
import Tada from "react-reveal/Tada";
import Spin from "react-reveal/Spin";
import Swing from "react-reveal/Swing";
import Confetti from "react-confetti";
import { loadWords } from "./words";
import Header from "./Header";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const GALLOWS = [
  "IMG_0083.jpg",
  "IMG_0076.jpg",
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

export default function App() {
  const [word, setWord] = useState(null);
  const [guessed, setGuessed] = useState([]);
  const [gallowsIndex, setGallowsIndex] = useState(0);

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  function getDifficulty(word) {
    if (word.length <= 4) return DIFFICULTY_EASY;
    else if (word.length <= 6) return DIFFICULTY_MEDIUM;
    else return DIFFICULTY_HARD;
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
    });
    return <div>Loading...</div>;
  }

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
    setWord(null);
    setGuessed([]);
    setGallowsIndex(0);
  }

  function getGameState() {
    if (gallowsIndex >= GALLOWS.length - 1) {
      return GAME_OVER;
    } else if (haveWon()) {
      return GAME_WON;
    } else if (!word) {
      return GAME_HOME;
    } else {
      return GAME_ACTIVE;
    }
  }

  function letterPressed(e) {
    const letter = e.target.id.toUpperCase();
    setGuessed(guessed.concat(letter));
    if (!word.includes(letter)) {
      // wrong guess
      setGallowsIndex(gallowsIndex + 1);
    }
  }

  const guessesRemaining = GALLOWS.length - gallowsIndex - 1;
  const gameState = getGameState();
  if (gameState === GAME_OVER) {
    return (
      <div className="App">
        <h1 className="hangmanio">hangman!</h1>
        <div className="gallows">
          <img height="150px" src={GALLOWS[gallowsIndex]} alt="hangman" />
        </div>
        <h1>GAME OVER</h1>
        <h2>The word was: {word.join("")}</h2>
        <button onClick={resetState} class="btn btn-warning">
          Play Again
        </button>
      </div>
    );
  } else if (gameState === GAME_WON) {
    return (
      <div className="App gameWon">
        <Confetti />
        <h1>YOU WIN!!</h1>
        <div className="hangmanLetter">
          <Spin className="hangmanLetter">{word.join("")}</Spin>
        </div>
        <div>
          <button onClick={resetState} className="btn btn-success">
            Play Again
          </button>
        </div>
      </div>
    );
  } else if (gameState === GAME_HOME) {
    return (
      <div className="App gameHome">
        <Header />
        <h1>Choose your difficulty!!</h1>

        <button
          onClick={() => {
            loadWordList(DIFFICULTY_EASY);
          }}
          className="btn btn-success btn-lg"
        >
          EASY
        </button>
        <button
          onClick={() => {
            loadWordList(DIFFICULTY_MEDIUM);
          }}
          className="btn btn-warning btn-lg"
        >
          MEDIUM
        </button>
        <button
          onClick={() => {
            loadWordList(DIFFICULTY_HARD);
          }}
          className="btn btn-danger btn-lg"
        >
          HARD
        </button>
      </div>
    );
  } else {
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
      const className = "letterButton btn btn-sm active ";

      return (
        <button
          id={c}
          disabled={disabled}
          className={className + color}
          key={c}
          onClick={letterPressed}
        >
          {c}
        </button>
      );
    });

    return (
      <div className="App">
        <h1 className="hangmanio">hangman!</h1>
        <div className="gallows">
          <img height="150px" src={GALLOWS[gallowsIndex]} alt="hangman" />
        </div>
        <div>{letters}</div>
        <div>{buttons}</div>
        <div>Already guessed: {guessed}</div>
        <div>Number of guesses remaining: {guessesRemaining}</div>
      </div>
    );
  }
}
