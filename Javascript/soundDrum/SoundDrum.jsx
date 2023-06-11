import React, { useState } from "react";
import "./SoundDrum.css";

const SoundDrum = () => {
  const buttonsInfo = [
    {
      name: "Q",
      display: "heater-1",
      src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
    },
    {
      name: "W",
      display: "heater-2",
      src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
    },
    {
      name: "E",
      display: "heater-3",
      src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
    },
    {
      name: "A",
      display: "heater-4",
      src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
    },
    {
      name: "S",
      display: "clap",
      src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
    },
    {
      name: "D",
      display: "open-hh",
      src: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
    },
    {
      name: "Z",
      display: "kick-n-hat",
      src: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
    },
    {
      name: "X",
      display: "kick",
      src: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
    },
    {
      name: "C",
      display: "closed-hh",
      src: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
    },
  ];

  const [string, setString] = useState("");

  return (
    <div className="drum-machine-container">
      <div className="drum-machine">
        <p className="drum-display">{string}</p>
        <Buttons buttonsInfo={buttonsInfo} setString={setString} />
      </div>
    </div>
  );
};

const Buttons = ({ buttonsInfo, setString }) => {
  return (
    <span>
      {buttonsInfo.map((buttonInfo) => (
        <Button buttonInfo={buttonInfo} setString={setString} />
      ))}
    </span>
  );
};

const Button = ({ buttonInfo, setString }) => {
  const handlePress = document.addEventListener("keypress", (event) => {
    if (event.key.toUpperCase() === buttonInfo.name) handlePlay();
    return () => document.removeEventListener(handlePress);
  });

  const playSound = (source) => {
    const sound = document.getElementById(buttonInfo.name);
    sound.currentTime = 0;
    sound.play();
  };

  const handlePlay = () => {
    playSound(buttonInfo.src);
    setString(buttonInfo.display);
  };

  return (
    <div onClick={handlePlay} className="btn btn-secondary m-1 drum-pad">
      {buttonInfo.name}
      <audio className="clip" id={buttonInfo.name} src={buttonInfo.src} />
    </div>
  );
};

export default SoundDrum;
