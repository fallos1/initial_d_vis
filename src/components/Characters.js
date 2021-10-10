import React from "react";
import "../App.css";

const Characters = (props) => {
  const characterList = [
    "Takumi",
    "Keisuke",
    "Ryosuke",
    "Itsuki",
    "Iketani",
    "Kenji",
    "Bunta",
    "Natsuki",
  ];

  const displayCharacters = (char) => {
    const img_dir = "images/" + char + ".png";
    const style =
      props.selectedCharacter === char ? { border: "5px solid red" } : {};
    return (
      <span>
        <img
          className="characterImage"
          src={img_dir}
          alt={char}
          onClick={() => {
            console.log("selected" + char);
            props.setSelectedCharacter(char);
          }}
          style={style}
        />
      </span>
    );
  };
  return <div>{characterList.map((char) => displayCharacters(char))}</div>;
};

export default Characters;
