import { React, useRef, useEffect } from "react";
import * as d3 from "d3";
import "./Gauge.css";

const CarChord = (props) => {
  const d3Chart = useRef();
  const darkMode = props.darkMode;
  const setSelectedCar = props.setSelectedCar;

  useEffect(() => {
    const matrix = [
      [0, 0, 0, 0, 0, 24, 12, 15, 11, 12],
      [0, 0, 0, 0, 0, 11, 5, 3, 4, 4],
      [0, 0, 0, 0, 0, 22, 3, 0, 4, 15],
      [0, 0, 0, 0, 0, 11, 5, 6, 5, 12],
      [0, 0, 0, 0, 0, 4, 1, 3, 1, 5],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];
    const width = parseInt(d3.select("#carChord").style("width"));
    const height = parseInt(d3.select("#carChord").style("height"));

    const tickColour = darkMode === false ? "black" : "white";

    d3.select(d3Chart.current).selectAll("*").remove();
    // Setup SVG canvas
    const svg = d3
      .select(d3Chart.current)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const innerRadius = (width / 2) * 0.55;
    const outerRadius = innerRadius * 1.2;

    const chord = d3.chord().padAngle(0.4).sortSubgroups(d3.descending)(matrix);
    svg
      .datum(chord)
      .append("g")
      .selectAll("g")
      .data((d) => d.groups)
      .join("g")
      .append("path")
      .attr("class", "outerArc")
      .style("fill", "red")
      .style("stroke", tickColour)
      .attr("d", d3.arc().innerRadius(innerRadius).outerRadius(outerRadius));

    svg
      .datum(chord)
      .append("g")
      .selectAll("path")
      .data((d) => d)
      .join("path")
      .attr("class", "chord")
      .attr("d", d3.ribbon().radius(innerRadius))
      .style("fill", "yellow")
      .style("stroke", tickColour)
      .on("mouseover", function (d) {
        d3.select(this).style("fill", "green");
      })
      .on("mouseout", function (d) {
        d3.select(this).style("fill", "yellow");
      });

    const NameProvider = [
      "AE86",
      "GT-R",
      "RX-7",
      "S13",
      "180SX",
      "Stage 1",
      "Stage 2",
      "Stage 4",
      "Stage 5",
      "Final Stage",
    ];
    const g = svg
      .selectAll("g.group")
      .data(chord.groups)
      .enter()
      .append("svg:g")
      .attr("class", function (d) {
        return "group " + NameProvider[d.index];
      });

    g.append("svg:text")
      .each(function (d) {
        d.angle = (d.startAngle + d.endAngle) / 2;
      })
      .attr("dy", ".35em")
      .attr("class", "titles")
      .attr("text-anchor", function (d) {
        return d.angle > Math.PI ? "end" : null;
      })
      .attr("transform", function (d) {
        return (
          "rotate(" +
          ((d.angle * 180) / Math.PI - 90) +
          ")" +
          "translate(" +
          innerRadius * 1.3 +
          ")" +
          (d.angle > Math.PI ? "rotate(180)" : "")
        );
      })
      .attr("opacity", 100)
      .attr("font-size", width * 0.03)
      .attr("fill", tickColour)
      .text(function (d, i) {
        return NameProvider[i];
      });

    d3.selectAll(".group")
      .on("mouseover", fade(0.02))
      .on("mouseout", fade(0.8));

    d3.selectAll(".group").on("mouseover", function (d, i) {
      setSelectedCar(this.className.baseVal.substring(6));
    });

    d3.selectAll("path.outerArc")
      .on("mouseover", fade(0.02))
      .on("mouseout", fade(0.8));

    //handle fading
    function fade(opacity) {
      return function (d, i) {
        svg
          .selectAll("path.chord")
          .filter(function (d) {
            return d.source.index !== i.index && d.target.index !== i.index;
          })
          .transition()
          .style("stroke-opacity", opacity)
          .style("fill-opacity", opacity);
      };
    }
  }, [darkMode]);

  return (
    <span id="carChord">
      <svg ref={d3Chart}></svg>
    </span>
  );
};

export default CarChord;
