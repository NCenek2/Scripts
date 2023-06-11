import React, { useState } from "react";
import "./ColorBox.css";

const ColorBox = () => {
  const [color, setColor] = useState("");

  const handlePress = document.addEventListener("keypress", (e) => {
    if (e.key === " ") {
      e.preventDefault();
      setColor("");
    }
    return () => document.removeEventListener(handlePress);
  });

  return (
    <React.Fragment>
      <div className="colorbox-container">
        <div className="colorbox-box" style={{ backgroundColor: color }}></div>
        <div className="colorbox-input-box">
          <input
            value={color}
            placeholder={"Enter a color"}
            onChange={(e) => setColor(e.target.value)}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default ColorBox;
