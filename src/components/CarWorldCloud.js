import React from "react";
// import * as d3 from "d3";
import ReactWordcloud from "react-wordcloud";
import "./Gauge.css";
const words = [
  { text: "race", value: 725 },
  { text: "takumi", value: 679 },
  { text: "eight-six", value: 666 },
  { text: "car", value: 576 },
  { text: "time", value: 457 },
  { text: "youre", value: 424 },
  { text: "yeah", value: 377 },
  { text: "keisuke", value: 298 },
  { text: "fujiwara", value: 286 },
  { text: "ryosuke", value: 283 },
  { text: "course", value: 258 },
  { text: "hey", value: 258 },
  { text: "racing", value: 246 },
  { text: "fast", value: 230 },
];
const options = {
  rotations: 2,
  rotationAngles: [-90, 0],
  fontFamily: "Microgramma",
  fontWeight: "Bold",
  fontSizes: [8, 15],
  colors: ["#3C1518", "#69140E", "#A44200", "#D58936"],
  enableOptimizations: true,
  deterministic: true,
};

const CarWorldCloud = () => {
  return (
    <div>
      <ReactWordcloud words={words} options={options} />
    </div>
  );
};

export default CarWorldCloud;
