export function loadWords() {
  return fetch("/english.txt")
    .then((r) => r.text())
    .then((wordList) => {
      const words = wordList.toUpperCase().split("\n");
      return words;
    });
}
