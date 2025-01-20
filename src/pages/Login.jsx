import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import LoginBase from "../components/LoginBase.jsx";
import axios from "axios";
import { setCookie } from "../utils/Cookie.jsx"; // 유틸리티 임포트

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
  align-items: flex-start;
`;

const Title = styled.div`
  font-family: "yg-jalnan";
  font-size: 1.5vw;
  margin-left: 3vw;
  margin-top: 7vh;
`;

const Text = styled.div`
  font-size: 1.2vw;
  font-family: "Pretendard-Regular";
  margin-left: 3vw;
  margin-top: 4vh;
  position: absolute;
  top: ${(props) => props.textTop};
`;

const InputBox = styled.input`
  width: 19vw;
  height: 5vh;
  border-radius: 10px;
  border: 0.1vw solid;
  border-color: #dcdaf5;
  box-shadow: none;
  font-size: 1.3vw;
  top: ${(props) => props.inputBoxTop};
  margin-left: 3vw;
  position: absolute;
`;

const WarningText = styled.div`
  color: #ff6140;
  align-self: flex-start;
  font-family: "Pretendard-Regular";
  font-size: 0.7vw;
  position: absolute;
  margin-left: 3vw;
  top: ${(props) => props.warningTop};
`;

const LoginButton = styled.button`
  width: 19vw;
  height: 5vh;
  border-radius: 10px;
  background-color: ${(props) =>
    props.disabled ? "#dcdaf5" : "rgba(100, 66, 214, 0.2)"};
  font-family: "yg-jalnan";
  font-size: 1.3vw;
  color: ${(props) => (props.disabled ? "#ffffff" : "#21005d")};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  position: absolute;
  bottom: 16vh;
  margin-left: 3vw;
`;

const TextContainer = styled.div`
  text-align: center;
  align-items: center;
  font-family: "Pretendard-Regular";
  font-size: 1vw;
  font-weight: normal;
  margin-left: 5.6vw;
  margin-top: 40.4vh;
`;

const SignupText = styled.button`
  color: #6442db;
  background-color: transparent;
  font-size: 1vw;
  font-weight: normal;
`;

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailValid(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value));
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordValid(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/.test(
        e.target.value
      )
    );
  };

  const isFormValid = emailValid && passwordValid;

  const navigate = useNavigate();
  const navigateToSignup = () => {
    navigate("/signup");
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/members/sign-in`,
        {
          username: email,
          password: password,
        }
      );

      alert("로그인에 성공했습니다!");
      // 서버에서 받은 액세스 토큰 저장
      const accessToken = response.data.accessToken;

      // 쿠키 유틸리티로 토큰 저장 (유효기간 7일 설정)
      setCookie("token", accessToken, 7);

      // 루트 페이지로 이동
      navigate("/");
    } catch (error) {
      console.error("로그인 에러:", error);
      alert("로그인에 실패했습니다.");
    }
  };

  return (
    <div>
      <LoginBase />
      <BoxContainer>
        <Title>이메일 로그인</Title>
        <Text textTop="10vh">아이디</Text>
        <InputBox
          type="text"
          value={email}
          onChange={handleEmailChange}
          inputBoxTop="17vh"
        />
        {!emailValid && email.length > 0 && (
          <WarningText warningTop="23vh">
            이메일 형식을 확인해주세요.
          </WarningText>
        )}
        <Text textTop="21vh">비밀번호</Text>
        <InputBox
          type="password"
          value={password}
          onChange={handlePasswordChange}
          inputBoxTop="28vh"
        />
        {!passwordValid && password.length > 0 && (
          <WarningText warningTop="34vh">
            비밀번호는 문자, 숫자, 특수문자를 포함하여 8~20자 이내로 입력하세요.
          </WarningText>
        )}
        <LoginButton disabled={!isFormValid} onClick={handleLogin}>
          로그인
        </LoginButton>
        <TextContainer>
          아직 회원이 아니신가요?{" "}
          <SignupText onClick={navigateToSignup}>가입하기</SignupText>
        </TextContainer>
      </BoxContainer>
    </div>
  );
}

export default Login;
