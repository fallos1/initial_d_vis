import { React, useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import "./Gauge.css";

const WorldCloud = (props) => {
  const [textMarginWidth, setTextMarginWidth] = useState(0);
  const selectedCar = props.selectedCar.toLowerCase().includes("stage")
    ? "AE86"
    : props.selectedCar;
  const svgfile = `images/${selectedCar}_word_cloud.svg`;
  //const svgfile = `images/gt-r_word_cloud.svg`;

  console.log(svgfile);

  const d3Chart = useRef();
  useEffect(() => {
    d3.xml(svgfile).then(function (xml) {
      var svgNode = xml.getElementsByTagName("svg")[0];

      const svgHeight = svgNode.height.animVal.value;
      const svgWidth = svgNode.width.animVal.value;

      const displayWidth = parseInt(d3.select("#wordCloud").style("width"));
      setTextMarginWidth(displayWidth);
      // const displayHheight = parseInt(d3.select("#wordCloud").style("height"));

      const width = svgWidth;
      const height = svgHeight;

      d3.select(d3Chart.current).selectAll("*").remove();
      const svg = d3
        .select(d3Chart.current)
        .attr("width", (displayWidth / width) * width)
        .attr("height", (displayWidth / width) * height * 3)
        .append("g")
        .attr(
          "transform",
          `translate(${0}, ${((displayWidth / width) * width) / 4}) scale(${
            displayWidth / width
          })`
        );
      d3.select("#hoveredText").append("text");

      console.log(svgNode, "abc");
      svg.node().append(svgNode);
      d3.selectAll(".mask")
        .on("mouseover", function (d) {
          d3.select("#hoveredText").selectAll("*").text("");
          d3.select("#hoveredText").append("text").text(this.innerHTML);
        })
        .on("mouseout", function (d) {});
    });
  }, [selectedCar]);

  return (
    <span>
      <span id="wordCloud">
        <span
          id="hoveredText"
          style={{
            fontSize: 30,
            display: "block",
            textAlign: "left",
            marginLeft: textMarginWidth / 2,
          }}
        >
          <text>Hover word cloud to see word</text>
        </span>
        <svg id="cloud" ref={d3Chart} style={{ verticalAlign: "top" }}></svg>
      </span>
    </span>
  );
};

export default WorldCloud;
