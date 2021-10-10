import { React, useRef, useEffect } from "react";
import * as d3 from "d3";
import "./Gauge.css";

const CharacterApperanceGauge = (props) => {
  const d3Chart = useRef();
  useEffect(() => {
    const margin = { top: 20, right: 30, bottom: 30, left: 30 };
    const width =
      parseInt(d3.select("#apperanceGauge").style("width")) -
      margin.left -
      margin.right;
    const height =
      parseInt(d3.select("#popularityGauge").style("height")) * 0.7 -
      margin.top -
      margin.bottom;

    const tickColour = props.darkMode === false ? "black" : "white";

    const characterPopularityData = {
      Takumi: 72,
      Bunta: 26,
      Ryosuke: 64,
      Natsuki: 31,
      Iketani: 47,
      Keisuke: 64,
      Mako: 20,
      Itsuki: 48,
      Takeshi: 30,
      Kenji: 29,
    };
    // Setup SVG canvas
    d3.select(d3Chart.current).selectAll("*").remove();
    const svg = d3
      .select(d3Chart.current)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${(1.5 * height) / 2})`);

    const innerRadius = (width / 2) * 0.9;
    const outerRadius = innerRadius * 1.05;
    const red_line = () => {
      const start = (7 * 0.1375 - 0.6) * Math.PI;
      const end = (8 * 0.1375 - 0.6) * Math.PI;
      const arc = d3
        .arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius)
        .startAngle(start)
        .endAngle(end);
      svg
        .append("path")
        .attr("class", "arc")
        .attr("d", arc)
        .attr("fill", "red");
    };
    const big_ticks = () => {
      const range = [0, 1, 2, 3, 4, 5, 6, 7, 8];
      range.forEach((x) => {
        const start = (x * 0.1375 - 0.6) * Math.PI;
        const end = start + 0.035;
        const arc = d3
          .arc()
          .innerRadius(innerRadius)
          .outerRadius(outerRadius)
          .startAngle(start)
          .endAngle(end);
        svg
          .append("path")
          .attr("class", "arc")
          .attr("d", arc)
          .attr("fill", tickColour);
      });
    };
    const small_ticks = () => {
      const range = [];
      for (var i = 0; i < 40; i += 1) {
        range.push(i);
      }
      range.forEach((x) => {
        const start = (x * 0.0275 - 0.6) * Math.PI;
        const end = start + 0.01;
        const arc = d3
          .arc()
          .innerRadius(innerRadius)
          .outerRadius(outerRadius)
          .startAngle(start)
          .endAngle(end);
        svg
          .append("path")
          .attr("class", "arc")
          .attr("d", arc)
          .attr("fill", tickColour);
      });
    };
    const numbers = () => {
      const range = [0, 10, 20, 30, 40, 50, 60, 70, 80];

      range.forEach((x) => {
        const radius = innerRadius * 0.85;
        const radians = (x * 0.01375 - 0.6) * Math.PI;
        // Location of x is radius * sin(radians)
        const x_loc = Math.sin(radians) * radius;
        // Location of y is radius * cos(radians) * -1
        const y_loc = Math.cos(radians) * radius * -1;

        svg
          .append("text")
          .attr("text-anchor", "middle")
          .style("font-size", width * 0.045)
          .style("font-family", "Microgramma")
          .style("font-weight", "bold")
          .attr("fill", tickColour)
          .attr("x", x_loc)
          .attr("y", y_loc)
          .text(x);
      });
    };

    const needleCircle = () => {
      const start = 0;
      const end = 2 * Math.PI;
      const arc = d3
        .arc()
        .innerRadius(0)
        .outerRadius(width * 0.05)
        .startAngle(start)
        .endAngle(end);
      svg
        .append("path")
        .attr("class", "arc")
        .attr("d", arc)
        .attr("fill", tickColour);
    };

    const radians_to_degress = (radians) => radians * (180 / Math.PI) + 90;

    svg
      .append("text")
      .attr("text-anchor", "middle")
      .style("font-size", width * 0.06)
      .style("font-family", "Microgramma")
      .style("font-weight", "bold")
      .attr("fill", tickColour)
      .attr("y", 0.14 * height)
      .text("Episode");

    svg
      .append("text")
      .attr("text-anchor", "middle")
      .style("font-size", width * 0.06)
      .style("font-family", "Microgramma")
      .style("font-weight", "bold")
      .attr("fill", tickColour)
      .attr("y", 0.225 * height)
      .text("Appearances");

    const moveNeedleTo =
      props.selectedCharacter == null
        ? 0
        : characterPopularityData[props.selectedCharacter] / 10;

    console.log(
      "moveNeedleTo",
      moveNeedleTo,
      props.selectedCharacter,
      typeof props.selectedCharacter
    );

    const path = d3.path();

    path.moveTo(-0.45 * width, 0 * width);
    path.lineTo(0.07 * width, 0 * width);
    path.lineTo(0.07 * width, 0.01 * width);
    path.lineTo(-0.39 * width, 0.01 * width);
    path.lineTo(-0.39 * width, 0.01 * width);
    path.moveTo(-0.45 * width, 0 * width);
    path.lineTo(0.07 * width, 0 * width);
    path.lineTo(0.07 * width, -0.01 * width);
    path.lineTo(-0.39 * width, -0.01 * width);
    path.lineTo(-0.39 * width, -0.01 * width);

    svg
      .append("path")
      .attr("id", "needle")
      .attr("d", path)
      .attr("stroke", tickColour)
      .attr("fill", tickColour)
      .attr(
        "transform",
        `rotate(${radians_to_degress((0 * 0.1375 - 0.6) * Math.PI)})`
      );
    svg
      .select("#needle")
      .transition()
      .duration(800)
      .ease(d3.easeLinear)
      .attrTween("transform", () =>
        d3.interpolate(
          `rotate(${radians_to_degress((0 * 0.1375 - 0.6) * Math.PI)})`,
          `rotate(${radians_to_degress(
            (moveNeedleTo * 0.1375 - 0.6) * Math.PI
          )})`
        )
      );

    const path_indicator = d3.path();

    path_indicator.moveTo(width / 3.5, -height / 1.5 + 0);
    path_indicator.lineTo(width / 3.5 + 0, -height / 1.5 + 20);
    path_indicator.lineTo(width / 3.5 + 30, -height / 1.5 + 20);
    path_indicator.lineTo(width / 3.5 + 30, -height / 1.5 + 30);
    path_indicator.lineTo(width / 3.5 + 50, -height / 1.5 + 10);
    path_indicator.lineTo(width / 3.5 + 30, -height / 1.5 + -10);
    path_indicator.lineTo(width / 3.5 + 30, -height / 1.5);
    path_indicator.lineTo(width / 3.5 + 0, -height / 1.5 + 0);

    //path_indicator.lineTo(30, 0);

    svg
      .append("path")
      .attr("id", "indicator")
      .attr("d", path_indicator)
      .attr("stroke", tickColour)
      .attr("fill", "white")
      .transition()
      .delay(50)
      .attr("fill", "green")
      .transition()
      .delay(200)
      .attr("fill", "white")
      .transition()
      .delay(200)
      .attr("fill", "green")
      .transition()
      .delay(200)
      .attr("fill", "white");

    red_line();
    big_ticks();
    small_ticks();
    numbers();
    needleCircle();
  }, [props.selectedCharacter, props.darkMode]);

  return (
    <span id="apperanceGauge">
      <svg ref={d3Chart}></svg>
    </span>
  );
};

export default CharacterApperanceGauge;
