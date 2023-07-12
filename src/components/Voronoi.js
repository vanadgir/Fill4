import { usePalette } from "../contexts/PaletteContext";

export default function Voronoi({ dim, data, voronoi, delaunay, callback }) {
  const { palette, selectedId } = usePalette();

  return (
    <div className="voronoi">
      <svg width={dim} height={dim}>
        {/*calc and draw delaunay triangles */}
        <path
          d={delaunay.render()}
          stroke="grey"
          fill="transparent"
          opacity={0.2}
        />
        {/*calc and draw voronoi cells */}
        <path d={voronoi.render()} stroke="black" />
        {/*draw cells as polygons*/}
        {data.map((d, i) => {
          const path = voronoi.renderCell(i);
          return (
            <path
              key={i}
              d={path}
              stroke="black"
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
