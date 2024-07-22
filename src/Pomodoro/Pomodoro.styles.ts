import { Button } from "antd";
import styled from "styled-components";

export const PomodoroContainer = styled.div`
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  gap: 4rem;

  .timer {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 10px solid rgb(255, 50, 78);
    border-radius: 80%;
    width: 50vh;
    height: 50vh;
    padding: 0 4px;
    font-size: 8rem;
    color: white;
  }

  .icon-buttons-container {
    display: flex;
    gap: 4rem;
  }

  .break-buttons-container {
    display: flex;
    gap: 2rem;
  }
`;

export const IconButton = styled(Button)`
  color: white;
  svg {
    transform: scale(2.7);
  }
`;

export const BreakButton = styled.button`
  color: white;
  font-size: 2rem;
  padding: 2rem;
  margin-top: 2rem;
  background-color: transparent;
  border: 2px solid rgb(255, 50, 78);
  border-radius: 8rem;
  &:hover {
    transform: scale(1.1);
  }
  &:active {
    transform: scale(0.9);
  }
  &:focus {
    transform: scale(0.9);
  }
`;
