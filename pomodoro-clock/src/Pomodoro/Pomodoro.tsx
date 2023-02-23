import { useState, useEffect } from "react";

import {
  PauseOutlined,
  CaretRightOutlined,
  SyncOutlined,
} from "@ant-design/icons";

import { BreakButton, IconButton, PomodoroContainer } from "./Pomodoro.styles";

export const Pomodoro = () => {
  const pomodoroTimer = 25 * 60;
  const shortBreakTimer = 5 * 60;
  const longBreakTimer = 15 * 60;
  const [timer, setTimer] = useState<number>(pomodoroTimer);
  const [seconds, setSeconds] = useState<number>(timer);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const handleReset = () => {
    setIsRunning(false);
    setSeconds(timer);
  };

  const handlePlayPause = () => {
    setIsRunning(!isRunning);
  };

  const handleBreak = (duration: number) => {
    setIsRunning(false);
    setTimer(duration);
    setSeconds(duration);
  };

  useEffect(() => {
    let intervalId: number;

    if (isRunning && seconds > 0) {
      intervalId = setInterval(() => {
        setSeconds(seconds - 1);
      }, 1000);
    }
    return () => {
      clearInterval(intervalId);
    };
  }, [seconds, isRunning]);

  const minutesLeft = Math.floor(seconds / 60);
  const secondsLeft = Math.ceil(seconds % 60);

  return (
    <PomodoroContainer>
      <div className="timer">
        {String(minutesLeft).padStart(2, "0")}:
        {String(secondsLeft).padStart(2, "0")}
        <div className="icon-buttons-container">
          <IconButton
            type="link"
            icon={isRunning ? <PauseOutlined /> : <CaretRightOutlined />}
            onClick={handlePlayPause}
          />
          <IconButton
            type="link"
            icon={<SyncOutlined />}
            onClick={handleReset}
          />
        </div>
      </div>
      <div className="break-buttons-container">
        <BreakButton onClick={() => handleBreak(pomodoroTimer)}>
          Pomodoro
        </BreakButton>
        <BreakButton onClick={() => handleBreak(shortBreakTimer)}>
          Short Break
        </BreakButton>
        <BreakButton onClick={() => handleBreak(longBreakTimer)}>
          Long Break
        </BreakButton>
      </div>
    </PomodoroContainer>
  );
};
