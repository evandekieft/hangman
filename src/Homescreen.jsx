import { loadWords } from "./words";

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

function HomescreenTitle() {
  return (
    <div className="homescreen-title">
      <h1>
        <span>h</span>
        <span>a</span>
        <span>n</span>
        <span>g</span>
        <span>m</span>
        <span>a</span>
        <span>n</span>
        <span>!</span>
      </h1>
    </div>
  );
}

export default function Homescreen({ setWord }) {
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

  return (
    <div className="App homescreen">
      <HomescreenTitle />
      <h1>Choose your difficulty!</h1>

      <button
        onClick={() => {
          loadWordList(DIFFICULTY_EASY);
        }}
        className="btn btn-success btn-lg"
      >
        <span aria-label="easy" role="img">
          EASY 😎
        </span>
      </button>
      <button
        onClick={() => {
          loadWordList(DIFFICULTY_MEDIUM);
        }}
        className="btn btn-warning btn-lg"
      >
        MEDIUM 😳
      </button>
      <button
        onClick={() => {
          loadWordList(DIFFICULTY_HARD);
        }}
        className="btn btn-danger btn-lg"
      >
        HARD 😱
      </button>
    </div>
  );
}
