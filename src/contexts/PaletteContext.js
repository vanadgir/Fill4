import { useContext, createContext, useState, useCallback, useEffect } from "react";
import { useDifficulty } from "./DifficultyContext";

// colorset data
const colorSets = [
  [
    "#FF5733", // vivid orange
    "#41EAD4", // teal
    "#F1C40F", // bright yellow
    "#9B59B6", // deep purple
    "#FF8C00", // dark orange
    "#2ECC71", // emerald green
  ],
  [
    "#F4D03F", // goldenrod
    "#8E44AD", // dark violet
    "#7F8C8D", // grayish blue
    "#2ECC71", // emerald green
    "#F39C12", // orange
    "#3498DB", // vibrant blue
  ],
  [
    "#7F8C8D", // grayish blue
    "#2ECC71", // emerald green
    "#F39C12", // orange
    "#8E44AD", // purple
    "#FF5733", // vivid orange
    "#FFC300", // vibrant yellow
  ],
  [
    "#16A085", // dark green
    "#F1C40F", // yellow
    "#3498DB", // dark blue
    "#D35400", // dark orange
    "#7F8C8D", // grayish blue
    "#E74C3C", // red
  ],
  [
    "#2980B9", // blue
    "#E74C3C", // red
    "#2C3E50", // dark slate
    "#F39C12", // yellow
    "#9B59B6", // deep purple
    "#27AE60", // bright green
  ],
];

// information that context holds
export const PaletteContext = createContext({
  palette: [],
  selectedId: 0,
  selectColor: () => {},
  nextSet: () => {},
  prevSet: () => {},
});

// define provider
export function PaletteProvider({ children }) {
  const [paletteId, setPaletteId] = useState(0);
  const [selectedId, setSelectedId] = useState(0);

  const { colorDifficulty } = useDifficulty();

  const nextSet = useCallback(() => {
    const newId = (paletteId + 1) % 4;
    const newPaletteLength = colorSets[newId].length;
    if (selectedId >= newPaletteLength) {
      setSelectedId(newPaletteLength - 1);
    }
    setPaletteId(newId);
  }, [paletteId, selectedId]);

  const prevSet = useCallback(() => {
    const newId = (paletteId - 1 + 4) % 4;
    const newPaletteLength = colorSets[newId].length;
    if (selectedId >= newPaletteLength) {
      setSelectedId(newPaletteLength - 1);
    }
    setPaletteId(newId);
  }, [paletteId, selectedId]);

  const palette = colorSets[paletteId].slice(0, colorDifficulty);

  const selectColor = useCallback((colorId) => {
    setSelectedId(colorId);
  }, []);

  useEffect(() => {
    if (selectedId >= colorDifficulty) {
      setSelectedId(palette.length - 1);
    }
  }, [colorDifficulty, selectedId, palette]);

  return (
    <PaletteContext.Provider
      value={{ palette, selectedId, selectColor, nextSet, prevSet }}
    >
      {children}
    </PaletteContext.Provider>
  );
}

// catch if context not defined
export function usePalette() {
  if (!PaletteContext) {
    throw new Error("PaletteContext must be defined");
  }
  return useContext(PaletteContext);
}
