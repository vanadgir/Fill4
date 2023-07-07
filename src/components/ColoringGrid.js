import { useDifficulty } from "../contexts/DifficultyContext";
import { usePalette } from "../contexts/PaletteContext";
import { useEffect } from "react";

export default function ColoringGrid() {
  const { mapDifficulty, colorDifficulty  } = useDifficulty();
  const { palette, selectedId, selectColor } = usePalette();

  useEffect(() => {
    let currentColor = "";
    if (selectedId >= colorDifficulty) {
      selectColor(palette.length - 1);
    }
    currentColor = palette[selectedId];
    console.log(currentColor);
  }, [colorDifficulty, selectedId, palette, selectColor]);

  return <div className="color-grid"></div>;
}
