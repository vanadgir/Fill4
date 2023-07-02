import { useContext, createContext, useState, useCallback } from "react";

// information that context holds
export const DifficultyContext = createContext({
  mapDifficulty: "",
  colorDifficulty: 0,
  selectMapDifficulty: () => {},
  selectColorDifficulty: () => {}
});

// define provider
export function DifficultyProvider({ children }) {
  const [mapDifficulty, setMapDifficulty] = useState("easy");
  const [colorDifficulty, setColorDifficulty] = useState(6);

  const selectMapDifficulty = useCallback((diff) => {
    setMapDifficulty(diff);
  }, []);

  const selectColorDifficulty = useCallback((diff) => {
    setColorDifficulty(diff);
  }, []);

  return (
    <DifficultyContext.Provider
      value={{
        mapDifficulty,
        colorDifficulty,
        selectMapDifficulty,
        selectColorDifficulty,
      }}
    >
      {children}
    </DifficultyContext.Provider>
  );
}

// catch if context not defined
export function useDifficulty() {
  if (!DifficultyContext) {
    throw new Error("DifficultyContext must be defined");
  }
  return useContext(DifficultyContext);
}
