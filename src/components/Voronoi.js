import { usePalette } from "../contexts/PaletteContext";

export default function Voronoi({
  dim,
  data,
  voronoi,
  callbackPaint,
  callbackErase,
}) {
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
              strokeWidth="2"
              fill={
                data[i].colorId === null ? "white" : palette[data[i].colorId]
              }
              opacity={1.0}
              onClick={() => {
                callbackPaint(i, selectedId);
              }}
              onContextMenu={(e) => {
                e.preventDefault();
                callbackErase(i);
              }}
            />
          );
        })}
      </svg>
    </div>
  );
}
