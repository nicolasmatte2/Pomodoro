import { useState, useEffect, useRef } from 'react';
import { Button, Modal, InputNumber } from 'antd';
import {
  SettingFilled,
  PauseOutlined,
  CaretRightOutlined,
  SyncOutlined,
} from '@ant-design/icons';

import { BreakButton, IconButton, PomodoroContainer } from './Pomodoro.styles';

export const Pomodoro = () => {
  const [pomodoroSetting, setPomodoroSetting] = useState<number>(25 * 60);
  const [shortBreakSetting, setShortBreakSetting] = useState<number>(5 * 60);
  const [longBreakSetting, setLongBreakSetting] = useState<number>(15 * 60);
  const [timer, setTimer] = useState<number>(pomodoroSetting);
  const [seconds, setSeconds] = useState<number>(timer);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const audioContext = useRef<AudioContext | null>(null);
  const gainNode = useRef<GainNode | null>(null);
  const bufferSource = useRef<AudioBufferSourceNode | null>(null);
  const audioElement = useRef<HTMLAudioElement | null>(null);

  // Função para configurar e tocar o áudio
  const playAlarm = () => {
    if (!audioElement.current) {
      audioElement.current = new Audio('./src/sounds/clucking.mp3');
      audioElement.current.loop = true; // Repetir o áudio
    }
    if (audioElement.current) {
      audioElement.current.play();
    }
  };

  // Função para parar o alarme
  const stopAlarm = () => {
    if (audioElement.current) {
      audioElement.current.pause();
      audioElement.current.currentTime = 0;
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
    stopAlarm();
  };

  const handleOk = () => {
    setIsModalOpen(false);
    stopAlarm();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    stopAlarm();
  };

  const handlePomodoro = (value: number | null) => {
    if (value) {
      setPomodoroSetting((value ?? 25) * 60);
      setSeconds((value ?? 25) * 60);
      setTimer((value ?? 25) * 60);
    }
  };

  const handleShortBreak = (value: number | null) => {
    if (value) {
      setShortBreakSetting((value ?? 5) * 60);
    }
  };

  const handleLongBreak = (value: number | null) => {
    if (value) {
      setLongBreakSetting((value ?? 15) * 60);
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setSeconds(timer);
    stopAlarm();
  };

  const handlePlayPause = () => {
    setIsRunning(!isRunning);
    stopAlarm();
  };

  const handleBreak = (duration: number) => {
    setIsRunning(false);
    setTimer(duration);
    setSeconds(duration);
    stopAlarm();
  };

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (
        event.target instanceof HTMLElement &&
        event.target.tagName === 'BUTTON'
      ) {
        stopAlarm();
      }
    };
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  useEffect(() => {
    let intervalId: number | undefined;

    if (isRunning && seconds > 0) {
      intervalId = window.setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    } else if (seconds === 0 && isRunning) {
      playAlarm();
      setIsRunning(false);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
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
            <p>Pomodoro</p>
            <InputNumber min={0.1} defaultValue={0} onChange={handlePomodoro} />
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
          {String(minutesLeft).padStart(2, '0')}:
          {String(secondsLeft).padStart(2, '0')}
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
