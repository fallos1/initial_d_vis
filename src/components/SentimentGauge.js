import { React, useRef, useEffect } from "react";
import * as d3 from "d3";
import "./Gauge.css";

const SentimentGauge = (props) => {
  const d3Chart = useRef();
  useEffect(() => {
    const width = parseInt(d3.select("#sentimentGauge").style("width"));
    const height = parseInt(d3.select("#sentimentGauge").style("height"));

    const characterSentiment = {
      Bunta: 2.3529411765,
      Itsuki: 2.1176470588,
      Keisuke: 3.08,
      Kenji: 3.4,
      Iketani: 2.5454545455,
      Natsuki: 3.375,
      Ryosuke: 3.0,
      Takumi: 2.45,
    };

    const characterSentimentScore =
      props.selectedCharacter == null
        ? 0
        : characterSentiment[props.selectedCharacter];

    // Setup SVG canvas
    d3.select(d3Chart.current).selectAll("*").remove();
    const svg = d3
      .select(d3Chart.current)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    svg
      .append("rect")
      .attr("id", "needle")
      .attr("x", -width * 0.015)
      .attr("y", (-height / 2) * 1.2)
      .attr("width", width * 0.03)
      .attr("height", height * 0.8)
      .attr("fill", "red");

    // Make difference more dramatic
    const multiplier = characterSentimentScore === 0 ? 1 : 2;
    const xNeedleMovement = (sentiment) => {
      if (sentiment > 2.5) {
        const difference = sentiment - 2.5;
        return width * 0.4 * (difference / 2.5) * multiplier;
      } else if (sentiment < 2.5) {
        const difference = 2.5 - sentiment;
        return -1 * width * 0.4 * (difference / 2.5) * multiplier;
      } else {
        return 0;
      }
    };

    const rotateNeedle = (sentiment) => {
      const difference = sentiment - 2.5;
      // Rotate from -45 degrees to 45 degrees
      return (difference / 2.5) * 45 * multiplier;
    };
    svg
      .select("#needle")
      .transition()
      .duration(1000)
      .attr(
        "transform",
        `translate(${xNeedleMovement(
          characterSentimentScore
        )}, 0)rotate(${rotateNeedle(characterSentimentScore)})`
      );
  }, [props.selectedCharacter]);

  return (
    <div>
      <span id="sentimentGauge">
        <svg ref={d3Chart}></svg>
      </span>
    </div>
  );
};

export default SentimentGauge;
