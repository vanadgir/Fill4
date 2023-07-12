import * as d3 from "d3";
import { useCallback, useEffect, useState, useMemo } from "react";
import { useDifficulty } from "../contexts/DifficultyContext";
import Voronoi from "./Voronoi";
import { usePalette } from "../contexts/PaletteContext";

export default function ColoringGrid() {
  const { numPoints, colorDifficulty } = useDifficulty();
  const { palette, selectedId } = usePalette();

  // sidelength for game board
  const domainMax = 480;

  // random number generator
  const randomInDomain = useCallback((max) => {
    return Math.floor(Math.random() * (max + 1));
  }, []);

  // add unique new point to data
  const appendUniquePoint = useCallback(
    (data) => {
      let appended = false;
      while (!appended) {
        let nextPoint = {
          colorId: null,
          x: randomInDomain(domainMax),
          y: randomInDomain(domainMax),
          neighbors: [],
        };
        if (!data.includes(nextPoint)) {
          appended = true;
          return [...data, nextPoint];
        }
      }
    },
    [randomInDomain]
  );

  // iterate appends based on difficulty
  const generateMapPoints = () => {
    let data = [];
    for (let i = 0; i < numPoints; i++) {
      data = appendUniquePoint(data);
    }
    return data;
  };

  // voronoi cell starting points
  const [mapPoints, setMapPoints] = useState(generateMapPoints());

  // dimensions of game board
  const xScale = d3.scaleLinear().domain([0, domainMax]).range([0, domainMax]);
  const yScale = d3.scaleLinear().domain([0, domainMax]).range([0, domainMax]);

  // delaunay triangulation paths
  const delaunay = useMemo(() => {
    const formattedData = mapPoints.map((d) => [xScale(d.x), yScale(d.y)]);
    return d3.Delaunay.from(formattedData);
  }, [mapPoints, xScale, yScale]);

  // voronoi cell borders
  const voronoi = useMemo(() => {
    return delaunay.voronoi([0, 0, domainMax, domainMax]);
  }, [delaunay, domainMax]);

  // voronoi data with neighbors
  const [voronoiData, setVoronoiData] = useState(
    mapPoints.map((mapPoint, i) => {
      return { ...mapPoints[i], neighbors: [...voronoi.neighbors(i)] };
    })
  );
  
  const changeColorId = useCallback(
    (pointId, colorId) => {
      console.log(`user sent ${palette[colorId]} to point ${pointId}`);
      console.log(`point ${pointId}'s neighbors are ${voronoiData[pointId].neighbors}`);
      if (
        voronoiData[pointId].neighbors.reduce((acc, currentValue) => {

          return (
            acc && Boolean(voronoiData[currentValue].colorId != selectedId)
          );
        }, true)
      ) {
        const newVoronoiData = [...voronoiData];
        newVoronoiData[pointId] = { ...newVoronoiData[pointId], colorId };
        setVoronoiData(newVoronoiData);
      }
    },
    [voronoiData, selectedId, setVoronoiData]
  );

  useEffect(() => {
    setMapPoints(generateMapPoints());
    // eslint-disable-next-line
  }, [numPoints, colorDifficulty]);

  useEffect(() => {
    setVoronoiData(mapPoints.map((mapPoint, i) => {
      return { ...mapPoints[i], neighbors: [...voronoi.neighbors(i)] };
    }));
  }, [mapPoints]);

  // const voronoiData = ;

  return (
    <div className="color-grid">
      <Voronoi
        dim={domainMax}
        data={voronoiData}
        voronoi={voronoi}
        delaunay={delaunay}
        callback={changeColorId}
      />
      <button onClick={() => setMapPoints(generateMapPoints())}>Reset</button>
    </div>
  );
}
