import { useState, useEffect } from "react";
import { PomodoroContainer } from "./Pomodoro.styles";
import { Timer } from "./Pomodoro.styles";
import { Buttons } from "./Pomodoro.styles";
import { ButtonsContainer } from "./Pomodoro.styles";
import play from "../assets/play.png";
import pause from "../assets/pause.png";
import restart from "../assets/restart.png";

export const Pomodoro = () => {
  var fotos = [play, pause];
  const [image, setImage] = useState(play);
  const handleClick = () => {
    if (image == fotos[0]) {
      setImage(pause);
    } else if (image == fotos[1]) {
      setImage(play);
    }
  };
  const originalSeconds = 25 * 60;

  const [seconds, setSeconds] = useState(originalSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const [isReseted, setIsReseted] = useState(false);

  const minutesLeft = Math.floor(seconds / 60);
  const secondsLeft = Math.floor(seconds % 60);

  console.log(minutesLeft, secondsLeft);

  const handleStart = () => {
    setIsRunning(!isRunning);
    setIsReseted(false);
  };

  const handleReset = () => {
    setIsReseted(!isReseted);
  };

  useEffect(() => {
    if (isReseted === false && isRunning === true && seconds > 0) {
      setTimeout(() => {
        setSeconds(seconds - 1);
      }, 1000);
    } else if (isReseted === true) {
      setSeconds(originalSeconds);
      setIsRunning(false);
    }
  }, [seconds, isRunning, isReseted]);
  return (
    <PomodoroContainer>
      <Timer>
        {String(minutesLeft).padEnd(2, "0")}:
        {String(secondsLeft).padEnd(2, "0")}
        <ButtonsContainer>
          <Buttons onClick={handleStart}>
            <img src={image} alt="" onClick={handleClick} />
          </Buttons>
          <Buttons onClick={handleReset}>
            <img src={restart} />
          </Buttons>
        </ButtonsContainer>
      </Timer>
    </PomodoroContainer>
  );
};
