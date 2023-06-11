import React from "react";
import "./Timer.css";

const Timer = () => {
  const [seconds, setSeconds] = React.useState("00");
  const [minutes, setMinutes] = React.useState("25");
  const [breakLength, setBreakLength] = React.useState("5");
  const [sessionLength, setSessionLength] = React.useState("25");
  const [playing, setPlaying] = React.useState(false);
  const [display, setDisplay] = React.useState("Session");

  const breakIncrement = () => {
    let potentialBreakLength = parseInt(breakLength) + 1;
    if (potentialBreakLength > 60) return undefined;
    setBreakLength(potentialBreakLength.toString());
    return undefined;
  };

  const breakDecrement = () => {
    let potentialBreakLength = parseInt(breakLength) - 1;
    if (potentialBreakLength <= 0) return undefined;
    setBreakLength(potentialBreakLength.toString());
    return undefined;
  };

  const sessionIncrement = () => {
    let potentialSessionLength = parseInt(sessionLength) + 1;
    if (potentialSessionLength > 60) return undefined;
    setSessionLength(potentialSessionLength.toString());

    let newMinutes = parseInt(minutes) + 1;
    newMinutes = newMinutes.toString();
    if (newMinutes.length < 2) {
      newMinutes = newMinutes.split("");
      newMinutes.unshift("0");
      newMinutes = newMinutes.join("");
    }
    setMinutes(newMinutes);
    setSeconds("00");
    return undefined;
  };

  const sessionDecrement = () => {
    let potentialSessionLength = parseInt(sessionLength) - 1;
    if (potentialSessionLength <= 0) return undefined;
    setSessionLength(potentialSessionLength.toString());
    
    let newMinutes = parseInt(minutes) - 1;
    newMinutes = newMinutes.toString();
    if (newMinutes.length < 2) {
      newMinutes = newMinutes.split("");
      newMinutes.unshift("0");
      newMinutes = newMinutes.join("");
    }
    setMinutes(newMinutes);
    setSeconds("00");
    return undefined;
  };

  const resetSession = () => {
    setBreakLength("5");
    setSessionLength("25");
    setMinutes("25");
    setSeconds("00");
    setPlaying(false);
  };

  const playingButton = () => {
    setPlaying(!playing);
  };

  React.useEffect(() => {
    if (playing) {
      const intervalID = window.setTimeout(() => {
        if (parseInt(minutes) > 0 && parseInt(seconds) === 0) {
          setMinutes((minutes) => {
            let newMinutes = minutes - 1;
            newMinutes = newMinutes.toString();
            if (newMinutes.length < 2) {
              newMinutes = newMinutes.split("");
              newMinutes.unshift("0");
              newMinutes = newMinutes.join("");
            }
            return newMinutes;
          });
          setSeconds("59");
        } else if (parseInt(minutes) === 0 && parseInt(seconds) === 1) {
          const source = "https://samplelib.com/lib/preview/mp3/sample-3s.mp3";
          function playSound(source) {
            const sound = document.getElementById("beep");
            sound.currentTime = 0;
            sound.play();
          }
          if (display === "Session") {
            const newBreakLength = breakLength;
            setMinutes(newBreakLength);
            setDisplay("Break");
          } else {
            let newSessionLength = sessionLength;
            setMinutes(newSessionLength);
            setDisplay("Session");
          }
          playSound(source);
          setSeconds("00");
        } else {
          setSeconds((seconds) => {
            let newSeconds = parseInt(seconds) - 1;
            newSeconds = newSeconds.toString();
            if (newSeconds.length < 2) {
              newSeconds = newSeconds.split("");
              newSeconds.unshift("0");
              newSeconds = newSeconds.join("");
            }
            return newSeconds;
          });
        }
      }, 1000);
      return () => window.clearTimeout(intervalID);
    }
    return undefined;
  }, [playing, minutes, seconds]);

  return (
    <main className="timer-container">
      <section id="break-label" className="timer-section">
        <h3>Break Length</h3>
        <div className="timer-buttons-container">
          <button
            onClick={breakIncrement}
            className="btn btn-success"
            id="break-increment"
          >
            Increase
          </button>
          <h4 id="break-length">{breakLength}</h4>
          <button
            onClick={breakDecrement}
            className="btn btn-danger"
            id="break-decrement"
          >
            Decrease
          </button>
        </div>
      </section>
      <section id="session-label" className="timer-section">
        <h3>Session Length</h3>
        <div className="timer-buttons-container">
          <button
            onClick={sessionIncrement}
            className="btn btn-success "
            id="session-increment"
          >
            Increase
          </button>
          <h4 id="session-length">{sessionLength}</h4>
          <button
            onClick={sessionDecrement}
            className="btn btn-danger "
            id="session-decrement"
          >
            Decrease
          </button>
        </div>
      </section>
      <section className="timer-section">
        <h3 id="timer-label">{display}</h3>
        <h4 id="time-left">
          {minutes}:{seconds}
        </h4>
      </section>
      <section className="timer-section">
        <div className="timer-control-container">
          <button
            className="btn btn-primary"
            onClick={playingButton}
            id="start_stop"
          >
            Start/Stop
          </button>
          <button className="btn btn-primary" onClick={resetSession} id="reset">
            Reset
          </button>
          <audio
            id="beep"
            src="https://samplelib.com/lib/preview/mp3/sample-3s.mp3"
          />
        </div>
      </section>
    </main>
  );
};

export default Timer;
