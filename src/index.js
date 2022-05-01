import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import HangmanApp from "./Hangmanapp";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <HangmanApp />
  </StrictMode>
);
