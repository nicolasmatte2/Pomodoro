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
}
`;
export default GlobalStyle;
