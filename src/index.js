import React from "react";
import ReactDOM from "react-dom/client";
import { DifficultyProvider } from "./contexts/DifficultyContext";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <DifficultyProvider>
      <App />
    </DifficultyProvider>
  </React.StrictMode>
);
