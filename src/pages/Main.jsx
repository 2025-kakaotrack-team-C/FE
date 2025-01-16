import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import LoginBase from "../components/LoginBase.jsx";
import { FcGoogle } from "react-icons/fc";
import { RiKakaoTalkFill } from "react-icons/ri";
import { MdAlternateEmail } from "react-icons/md";

const BoxContainer = styled.div`
  position: absolute;
  top: 25vh;
  left: 65vw;
  width: 25vw;
  height: 60vh;
  background-color: transparent;
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Logo = styled.div`
  font-family: "yg-jalnan";
  font-size: 2vw;
  margin-top: 9vh;
`;

const Button = styled.button`
  border-radius: 24px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.buttonColor};
  color: ${(props) => props.textColor};
  font-weight: bold;
  font-size: 1vw;
  width: 20vw;
  height: 5vh;
  margin-top: ${(props) => props.buttonMargin || "1.3vh"};
  position: relative;
  font-family: "Pretendard-Regular";


  &:hover {
    border: 0.1vw solid;
    border-color: lightgray;
  }
`;

const IconWrapper = styled.span`
  position: absolute;
  left: 2vw;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const Divider = styled.hr`
  width: 20vw;
  height: 0.2vh;
  background-color: lightgray;
  margin-top: 7vh;
`;

const TextContainer = styled.div`
  text-align: center;
  margin-top: 6vh;
  align-items: center;
  font-family: "Pretendard-Regular";
  font-size: 1vw;
  font-weight: normal;
`;

const SignupText = styled.button`
  color: #6442DB;
  background-color: transparent;
  font-size: 1vw;
  font-weight: normal;

  &:hover {
    border-bottom: 0.1vw solid;
    border-color: #6442DB;
  }
`;

function Main() {
  const navigate = useNavigate();
  const navigateToLogin = () => {
    navigate("/login");
  };
  const navigateToSignup = () => {
    navigate("/signup");
  };

  return (
    <div>
      <LoginBase />
      <BoxContainer>
        <Logo>PIN</Logo>
        <Button textColor="#391B1B" buttonColor="#FEE500" buttonMargin="6.5vh">
          <IconWrapper><RiKakaoTalkFill color="#391B1B" size="1.5vw" /></IconWrapper>
          카카오로 로그인하기
        </Button>
        <Button textColor="#000000" buttonColor="#ffffff">
          <IconWrapper><FcGoogle size="1.5vw" /></IconWrapper>
          구글로 로그인하기
        </Button>
        <Button textColor="#000000" buttonColor="#DCDAF5" onClick={navigateToLogin}>
          <IconWrapper><MdAlternateEmail size="1.5vw" /></IconWrapper>
          이메일로 로그인하기
        </Button>
        <Divider />
        <TextContainer>아직 회원이 아니신가요? <SignupText onClick={navigateToSignup}>가입하기</SignupText></TextContainer>
      </BoxContainer>
    </div>
  );
}

export default Main;