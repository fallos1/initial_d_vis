import React from "react";

const Introduction = () => {
  const handleMethodologyVisible = () => {
    if (document.getElementById("methodology").hidden) {
      document.getElementById("methodology").hidden = false;
    } else {
      document.getElementById("methodology").hidden = true;
    }
  };
  return (
    <div>
      <h2>Introduction</h2>
      <p>
        This is a dashboard visualising text data from the show Initial D which
        premiered on 18 April 1998.{" "}
      </p>
      <p onClick={handleMethodologyVisible}>
        Click here to expand methodology [+]
      </p>
      <div id="methodology" hidden>
        <span
          style={{
            position: "fixed",
            right: 0,
            display: "block",
            fontSize: 30,
            fontWeight: "bolder",
          }}
          onClick={handleMethodologyVisible}
        >
          Close
        </span>
        <h2>Methodology</h2>
        <h3>Character Popularty</h3>
        <b>Episode Appearances</b> is the amount of episodes a character has
        apperaed in. <br />
        <b>x100 mensions</b> is the amount of times a characters name is
        mentioned. <br />
        <b>SENTIMENT</b> is the seniment score of a characters comment section
        on{" "}
        <a href="https://initiald.fandom.com/wiki/Initial_D_Wiki">
          Initial D Fandom
        </a>
        <h3>Cars</h3>
        The <b>Word Cloud</b> shows the frequency of words used during the
        series, minus some common english words. <br />
        The <b>Chord diagram</b> shows us how the five popular cars are related
        to to each stage. The size of the arc represents the frequency
      </div>
    </div>
  );
};

export default Introduction;
