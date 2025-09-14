import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }
  body {
    margin: 0;
    font-family: 'Pretendard', 'Noto Sans KR', sans-serif;
    background: #ffffff;
    color: #222222;
  }
`;