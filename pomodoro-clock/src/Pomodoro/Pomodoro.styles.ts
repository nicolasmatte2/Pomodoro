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
  .btn-container {
    display: flex;
    gap: 10px;
  }
`;

export const Timer = styled.h1`
  font-family: "Nunito", sans-serif;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 10px solid #fc454a;
  border-radius: 80%;
  width: 50vh;
  height: 50vh;
  padding: 0 4px;
  font-size: 8rem;
  color: white;
`;
export const ButtonsContainer = styled.div`
  display: flex;
  gap: 4rem;
`;
export const Buttons = styled.button`
  background-color: Transparent;
  border: 0;
  & img {
    width: 50px;
    height: 50px;
    color: white;
  }
`;
