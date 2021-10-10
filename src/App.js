import "./App.css";
import Introduction from "./components/Introduction";
import Characters from "./components/Characters";
import CharacterPopularityGauge from "./components/CharacterPopularityGauge";
import CharacterApperanceGauge from "./components/CharacterApperanceGauge";
import SentimentGauge from "./components/SentimentGauge";
import CarChord from "./components/CarChord";
import WorldCloud from "./components/WorldCloud";

import React, { useState } from "react";

function App() {
  const [selectedCharacter, setSelectedCharacter] = useState("Takumi");
  const [darkMode, setDarkMode] = useState(false);
  const [selectedCar, setSelectedCar] = useState("AE86");

  const backgroundColor = darkMode === false ? "black" : "white";
  const fontColor = darkMode === false ? "white" : "black";
  return (
    <body>
      <div className="App">
        <div
          style={{ position: "absolute", top: 0, left: 0 }}
          onClick={() => {
            setDarkMode(darkMode === false ? true : false);
            document.querySelector("body").style.background = backgroundColor;
            document.querySelector("body").style.color = fontColor;
          }}
        >
          <img
            src={"images/high_beam_" + backgroundColor + ".svg"}
            width={50}
            alt="High Beam Light"
          />
          Enable Dark Mode
        </div>
        <Introduction />
        <h1>Characters</h1>
        <Characters
          selectedCharacter={selectedCharacter}
          setSelectedCharacter={setSelectedCharacter}
        />
        <h2>Character Popularity</h2>
        <CharacterApperanceGauge
          selectedCharacter={selectedCharacter}
          darkMode={darkMode}
        />
        <CharacterPopularityGauge
          selectedCharacter={selectedCharacter}
          darkMode={darkMode}
        />
        <SentimentGauge selectedCharacter={selectedCharacter} />
        <h1>Cars</h1>
        <WorldCloud selectedCar={selectedCar} />
        <CarChord darkMode={darkMode} setSelectedCar={setSelectedCar} />
        {/* <CarWorldCloud /> */}
        <h2>Credits</h2>
        Data and pictures taken from: {"  "}
        <a href="https://initiald.fandom.com/wiki/Initial_D_Wiki">
          Initial D Fandom
        </a>
        <br />
        Fonts: <b>Microgramma, Eurostile</b>
      </div>
    </body>
  );
}

export default App;
