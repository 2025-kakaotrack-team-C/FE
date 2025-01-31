import React from "react";
import styled from "styled-components";
import Character from "../assets/character.png";
import Linecharacter from "../assets/linecharacter.png";

const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  background-color: #f5f5f5;
  margin: 0;
  background-image: url(${Linecharacter});
  background-repeat: no-repeat;
  background-size: 25vw;
  background-position-x: 65vw;
  background-position-y: 19vh;
`;

const LeftSection = styled.div`
  width: 50vw;
  height: 100vh;
  background-color: rgba(100, 66, 214, 0.1);
  border-radius: 0px 24px 0px 0px;
  background-image: url(${Character});
  background-repeat: no-repeat;
  background-position-x: 1vw;
  background-position-y: 20vh;
  background-size: 58vw;
`;

const WelcomeText = styled.div`
  white-space: pre-line;
  font-family: "yg-jalnan";
  font-size: 2.5vw;
  margin-left: 4vw;
  margin-top: 7vh;
`;

const Box = styled.div`
  margin-top: 25vh;
  margin-left: 15vw;
  width: 25vw;
  height: 70vh;
  background-color: #f2ecee;
  border-radius: 24px;
`;

function LoginBase() {
  return (
    <Wrapper>
      <LeftSection>
        <WelcomeText>
          {"환영합니다!\nPIN과 함께 멋진 팀을 만들어보세요."}
        </WelcomeText>
      </LeftSection>
      <Box />
    </Wrapper>
  );
}

export default LoginBase;
