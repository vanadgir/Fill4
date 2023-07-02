import ColoringGrid from "./ColoringGrid";

export default function GameBoard() {
  return (
    <div className="game-board">
      <div className="grid-space">
        <ColoringGrid />
      </div>
    </div>
  );
}
