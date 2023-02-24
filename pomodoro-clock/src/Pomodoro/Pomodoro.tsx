import { useState, useEffect } from "react";
import { Button, Modal, InputNumber } from "antd";
import {
  SettingFilled,
  PauseOutlined,
  CaretRightOutlined,
  SyncOutlined,
} from "@ant-design/icons";

import { BreakButton, IconButton, PomodoroContainer } from "./Pomodoro.styles";

export const Pomodoro = () => {
  const [pomodoroSetting, setPomodoroSetting] = useState<number>(25 * 60);
  const [shortBreakSetting, setShortBreakSetting] = useState<number>(5 * 60);
  const [longBreakSetting, setLongBreakSetting] = useState<number>(15 * 60);
  const [timer, setTimer] = useState<number>(pomodoroSetting);
  const [seconds, setSeconds] = useState<number>(timer);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handlePomodoro = (value: 0 | 0.1 | null) => {
    if (value) {
      setPomodoroSetting((value ?? 25) * 60);
      setSeconds((value ?? 25) * 60);
      setTimer((value ?? 25) * 60);
    }
  };

  const handleShortBreak = (value: 0 | 0.1 | null) => {
    if (value) {
      setShortBreakSetting((value ?? 5) * 60);
    }
  };

  const handleLongBreak = (value: 0 | 0.1 | null) => {
    if (value) {
      setLongBreakSetting((value ?? 15) * 60);
    }
  };

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
    <>
      <div className="modal-button-container">
        <Button
          type="link"
          className=".modal-button"
          icon={<SettingFilled />}
          onClick={showModal}
        ></Button>
      </div>
      <Modal
        title="Setting"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className="input-container">
          <div>
            <p>Pomodoro</p>{" "}
            <InputNumber min={0.1} defaultValue={0} onChange={handlePomodoro} />{" "}
          </div>
          <div>
            <p>Short Break</p>
            <InputNumber
              min={0.1}
              defaultValue={0}
              onChange={handleShortBreak}
            />
          </div>

          <div>
            <p>Long Break</p>
            <InputNumber
              min={0.1}
              defaultValue={0}
              onChange={handleLongBreak}
            />
          </div>
        </div>
      </Modal>
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
          <BreakButton onClick={() => handleBreak(pomodoroSetting)}>
            Pomodoro
          </BreakButton>
          <BreakButton onClick={() => handleBreak(shortBreakSetting)}>
            Short Break
          </BreakButton>
          <BreakButton onClick={() => handleBreak(longBreakSetting)}>
            Long Break
          </BreakButton>
        </div>
      </PomodoroContainer>
    </>
  );
};
