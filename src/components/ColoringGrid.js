// import { useDifficulty } from "../contexts/DifficultyContext";
// import { usePalette } from "../contexts/PaletteContext";
// import { useState } from "react";

export default function ColoringGrid() {
  // const { mapDifficulty, colorDifficulty } = useDifficulty();
  // const { palette, selectedId } = usePalette();

  const fillableSquares = (
    <div className="color-grid">
      <span className="square"></span>
      <span className="square"></span>
      <span className="square"></span>
    </div>
  );

  return (
    <div>
        {fillableSquares}
    </div>
  );
}
