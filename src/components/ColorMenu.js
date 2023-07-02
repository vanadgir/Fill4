import { usePalette } from "../contexts/PaletteContext";

export default function ColorMenu() {
  const { palette, selectedId, selectColor, nextSet, prevSet } = usePalette();

  const prevButton = (
    <button className="prev-button" onClick={() => prevSet()}>
      &lt;--
    </button>
  );
  const nextButton = (
    <button className="prev-button" onClick={() => nextSet()}>
      --&gt;
    </button>
  );

  /* eslint-disable eqeqeq */
  return (
    <div className="color-menu">
      <div className="left-arrow">{prevButton}</div>
      <div className="palette">
        {palette.map((color, i) => (
          <div
            key={color}
            id={`color${i + 1}`}
            className={`block ${selectedId == i ? "selected" : ""}`}
            style={{ backgroundColor: color }}
            onClick={() => selectColor(i)}
          ></div>
        ))}
      </div>
      <div className="right-arrow">{nextButton}</div>
    </div>
  );
}
