import { useDifficulty } from "./contexts/DifficultyContext";
import { PaletteProvider } from "./contexts/PaletteContext";
import GameBoard from "./components/GameBoard";
import ColorMenu from "./components/ColorMenu";
import "./App.css";

export default function App() {
  const {
    mapDifficulty,
    colorDifficulty,
    selectMapDifficulty,
    selectColorDifficulty,
  } = useDifficulty();

  const title = (
    <h1 className="title">
      <span>&nbsp;F&nbsp;</span>
      <span>&nbsp;I&nbsp;</span>
      <span>&nbsp;L&nbsp;</span>
      <span>&nbsp;L&nbsp;</span>
      <span>&nbsp;4&nbsp;</span>
    </h1>
  );

  const mapDiff = (event) => {
    selectMapDifficulty(event.target.value);
  };

  const colorDiff = (event) => {
    selectColorDifficulty(parseInt(event.target.value));
  };

  const mapDifficultySelector = (
    <select id="map-difficulty" onChange={mapDiff}>
      <option value="easy">Easy</option>
      <option value="medium">Medium</option>
      <option value="hard">Hard</option>
    </select>
  );

  const colorDifficultySelector = (
    <select id="color-difficulty" onChange={colorDiff}>
      <option value="6">6</option>
      <option value="5">5</option>
      <option value="4">4</option>
    </select>
  );

  return (
    <div className="main">
      {title}
      <PaletteProvider>
        <div className="game-bar">
          <div className="left">
            Map Difficulty: {mapDifficultySelector}
          </div>
          <ColorMenu />
          <div className="right">
            Color Difficulty: {colorDifficultySelector}
          </div>
        </div>
        <GameBoard />
      </PaletteProvider>
    </div>
  );
}
