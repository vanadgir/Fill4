import * as d3 from "d3";
import {
  useCallback,
  useEffect,
  useState,
  useMemo,
  useRef,
  useLayoutEffect,
} from "react";
import { useDifficulty } from "../contexts/DifficultyContext";
import Voronoi from "./Voronoi";
import VictoryMessage from "./VictoryMessage";
import { usePalette } from "../contexts/PaletteContext";

// custom hook for window dimensions
const useDimensions = (targetRef) => {
 
  // eslint-disable-next-line
  const getDimensions = () => {
    return {
      width: targetRef.current ? targetRef.current.offsetWidth: Math.ceil(0.9*window.innerWidth),
      height: targetRef.current ? targetRef.current.offsetHeight: Math.ceil(0.65*window.innerHeight)
    };
  };

  const [dimensions, setDimensions] = useState(getDimensions);

  const handleResize = useCallback(() => {
    setDimensions(getDimensions());
  }, [getDimensions]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  useLayoutEffect(() => {
    handleResize();
    // eslint-disable-next-line
  }, []);

  return dimensions;
};

export default function ColoringGrid() {
  const { numPoints, colorDifficulty } = useDifficulty();
  const { palette, selectedId } = usePalette();
  const [numNull, setNumNull] = useState(numPoints);
  const [victoryDismissed, setVictoryDismissed] = useState(false);
  const targetRef = useRef(null);
  const dimensions = useDimensions(targetRef);

  // sidelength for game board
  const domainMaxWidth = dimensions.width;
  const domainMaxHeight = dimensions.height;

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
          x: randomInDomain(domainMaxWidth),
          y: randomInDomain(domainMaxHeight),
          neighbors: [],
        };
        if (!data.includes(nextPoint)) {
          appended = true;
          return [...data, nextPoint];
        }
      }
    },
    [randomInDomain, domainMaxWidth, domainMaxHeight]
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
  const xScale = d3
    .scaleLinear()
    .domain([0, domainMaxWidth])
    .range([0, domainMaxWidth]);
  const yScale = d3
    .scaleLinear()
    .domain([0, domainMaxHeight])
    .range([0, domainMaxHeight]);

  // delaunay triangulation paths +
  // voronoi cell borders
  const voronoi = useMemo(() => {
    const formattedData = mapPoints.map((d) => [xScale(d.x), yScale(d.y)]);
    const delaunay = d3.Delaunay.from(formattedData);
    return delaunay.voronoi([0, 0, domainMaxWidth, domainMaxHeight]);
  }, [mapPoints, xScale, yScale, domainMaxWidth, domainMaxHeight]);

  // voronoi data with neighbors
  const [voronoiData, setVoronoiData] = useState(
    mapPoints.map((mapPoint, i) => {
      return { ...mapPoints[i], neighbors: [...voronoi.neighbors(i)] };
    })
  );

  // get num shapes filled
  const getColorIds = (data) => {
    let colors = [];
    for (const item of Object.values(data)) {
      colors = [...colors, item.colorId];
    }
    return colors;
  };

  // fill in shape with color
  const changeColorId = useCallback(
    (pointId, colorId) => {
      console.log(`user sent ${palette[colorId]} to point ${pointId}`);
      console.log(
        `point ${pointId}'s neighbors are ${voronoiData[pointId].neighbors}`
      );
      if (
        voronoiData[pointId].neighbors.reduce((acc, currentValue) => {
          return (
            acc && Boolean(voronoiData[currentValue].colorId !== selectedId)
          );
        }, true)
      ) {
        const newVoronoiData = [...voronoiData];
        newVoronoiData[pointId] = { ...newVoronoiData[pointId], colorId };
        setVoronoiData(newVoronoiData);
        const colors = getColorIds(newVoronoiData);
        setNumNull(colors.reduce((acc, i) => (i === null ? ++acc : acc), 0));
      }
    },
    // eslint-disable-next-line
    [voronoiData, selectedId, setVoronoiData]
  );

  // remove color from shape
  const removeColorId = useCallback(
    (pointId) => {
      const newVoronoiData = [...voronoiData];
      newVoronoiData[pointId] = { ...newVoronoiData[pointId], colorId: null };
      setVoronoiData(newVoronoiData);
      const colors = getColorIds(newVoronoiData);
      setNumNull(colors.reduce((acc, i) => (i === null ? ++acc : acc), 0));
    },
    [voronoiData, setVoronoiData]
  );

  // dismiss victory popup
  const dismissVictory = useCallback(() => {
    setVictoryDismissed(true);
  }, []);

  // clear all colors
  const clearColors = (data) => {
    data.forEach((i) => {
      i.colorId = null;
    });
  };

  useEffect(() => {
    setMapPoints(generateMapPoints());
    setVictoryDismissed(false);
    setNumNull(numPoints);
    // eslint-disable-next-line
  }, [numPoints, colorDifficulty]);

  useEffect(() => {
    setVoronoiData(
      mapPoints.map((mapPoint, i) => {
        return { ...mapPoints[i], neighbors: [...voronoi.neighbors(i)] };
      })
    );
    // eslint-disable-next-line
  }, [mapPoints]);

  return (
    <div className="color-grid" ref={targetRef}>
      {victoryDismissed || numNull > 0 ? (
        <>
            <Voronoi
              width={domainMaxWidth}
              height={domainMaxHeight}
              data={voronoiData}
              voronoi={voronoi}
              callbackPaint={changeColorId}
              callbackErase={removeColorId}
            />
          <span className="score">
            {numNull > 0 ? `${numNull} to go!` : "Great Job!"}
          </span>
        </>
      ) : (
        <VictoryMessage
          callback={dismissVictory}
          width={domainMaxWidth}
          height={domainMaxHeight}
        />
      )}
      <div className="button-grid">
        <button
          onClick={() => {
            clearColors(voronoiData);
            setVictoryDismissed(false);
            setNumNull(numPoints);
          }}
        >
          Clear
        </button>
        <button
          onClick={() => {
            setMapPoints(generateMapPoints());
            setVictoryDismissed(false);
            setNumNull(numPoints);
          }}
        >
          New
        </button>
        {/* <button>Export</button>*/}
      </div>
    </div>
  );
}
