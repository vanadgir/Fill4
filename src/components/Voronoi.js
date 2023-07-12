import { usePalette } from "../contexts/PaletteContext";

export default function Voronoi({ dim, data, voronoi, callback }) {
  const { palette, selectedId } = usePalette();

  return (
    <div className="voronoi">
      <svg width={dim} height={dim}>
        {/*draw cells as polygons*/}
        {data.map((d, i) => {
          const path = voronoi.renderCell(i);
          return (
            <path
              key={i}
              d={path}
              stroke="black"
              stroke-width="2"
              fill={
                data[i].colorId === null ? "white" : palette[data[i].colorId]
              }
              opacity={1.0}
              onClick={() => {
                callback(i, selectedId);
              }}
            />
          );
        })}
      </svg>
    </div>
  );
}
