import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
*{
  margin: 0;
  padding: 0;
  
}
body{
  font-family: "Nunito", sans-serif;
  background-color: #1f1f1f;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  .modal-button-container{
    display: flex;
    justify-content: flex-end;
    padding: 2rem 2rem 0 0;
    Button{
      color: white;
      transform: scale(2.2);
    }
  }
  .input-container{
      display: flex;
      flex-direction: column;
      gap: 8px;
      
    }

}
`;
export default GlobalStyle;
