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

export default function Homescreen({
  loadWordList,
  DIFFICULTY_EASY,
  DIFFICULTY_MEDIUM,
  DIFFICULTY_HARD
}) {
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
