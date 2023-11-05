import { createGlobalStyle, css } from "styled-components";
import "./fonts.css";

const GlobalStyle = createGlobalStyle`${css`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    overflow-x: hidden;
  }

  button {
    font-family: inherit;
  }
`}`;

export default GlobalStyle;
