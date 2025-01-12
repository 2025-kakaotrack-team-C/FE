import { createGlobalStyle } from "styled-components";

// 글로벌 스타일 정의
export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: "yg-jalnan";
    src: url("https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_four@1.2/JalnanOTF00.woff")
      format("woff");
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: "Pretendard-Regular";
    src: url("https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff")
      format("woff");
    font-weight: 400;
    font-style: normal;
  }

  body {
    background-color: #FEFBFF; /* 배경색 */
    font-family: 'Pretendard-Regular', sans-serif; /* 기본 폰트 */
    color: #1C1C1D; /* 기본 텍스트 색상 */
    margin: 0;
    padding: 0;
  }
`;
