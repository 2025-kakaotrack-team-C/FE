import React, { useState } from "react";
import styled from "styled-components";
import LoginBase from "../components/LoginBase.jsx";
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

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
    margin-left: 3vw;
    margin-top: 4vh;
    position: absolute;
    font-family: "Pretendard-Regular";
    top: ${(props) => props.textTop};
`;

const InputBox = styled.input`
    width: 19vw;
    height: 5vh;
    border-radius: 10px;
    border: 0.1vw solid;
    border-color: #DCDAF5;
    box-shadow: none;
    font-size: 1.3vw;
    top: ${(props) => props.inputBoxTop};
    margin-left: 3vw;
    position: absolute;
`;

const WarningText = styled.div`
    color: #FF6140;
    align-self: flex-start;
    font-family: "Pretendard-Regular";
    font-size: 0.7vw;
    position: absolute;
    margin-left: 3vw;
    top: ${(props) => props.warningTop};
`;

const SignupButton = styled.button`
    width: 19vw;
    height: 5vh;
    border-radius: 10px;
    background-color: ${(props) => (props.disabled ? "#DCDAF5" : "rgba(100, 66, 214, 0.2)")};
    font-family: "yg-jalnan";
    font-size: 1.3vw;
    color: ${(props) => (props.disabled ? "#ffffff" : "#21005D")};
    cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
    position: absolute;
    bottom: 8vh;
    margin-left: 3vw;
`;

function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [emailValid, setEmailValid] = useState(false);
    const [passwordValid, setPasswordValid] = useState(false);
    const [passwordMatch, setPasswordMatch] = useState(false);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setEmailValid(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value));
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setPasswordValid(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/.test(e.target.value));
        setPasswordMatch(e.target.value === confirmPassword);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        setPasswordMatch(password === e.target.value);
    };

    const navigate = useNavigate();

    // 회원가입 처리 함수 추가
    const handleSignup = async () => {
        try {
            const response = await axios.post('http://localhost:8080/members/sign-up', {
                username: email,     // email을 username으로 전송
                password: password
            });
            
            if (response.status === 200) {
                alert('회원가입이 완료되었습니다!');
                // 회원가입 성공 후 처리 (예: 로그인 페이지로 이동)
                navigate("/login");
            }
        } catch (error) {
            console.error('회원가입 에러:', error);
            alert('회원가입 중 오류가 발생했습니다.');
        }
    };

    const isFormValid = emailValid && passwordValid && passwordMatch;

    return (
        <div>
            <LoginBase />
            <BoxContainer>
                <Title>회원 정보 입력</Title>
                <Text textTop="10vh">아이디</Text>
                <InputBox type="text" value={email} onChange={handleEmailChange} inputBoxTop="17vh" />
                {!emailValid && email.length > 0 && <WarningText warningTop="23vh">이메일 형식을 확인해주세요.</WarningText>}
                <Text textTop="21vh">비밀번호</Text>
                <InputBox type="password" value={password} onChange={handlePasswordChange} inputBoxTop="28vh" />
                {!passwordValid && password.length > 0 && <WarningText warningTop="34vh">비밀번호는 문자, 숫자, 특수문자를 포함하여 8~20자 이내로 입력하세요.</WarningText>}
                <InputBox type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} inputBoxTop="36vh" />
                {!passwordMatch && confirmPassword.length > 0 && <WarningText warningTop="42vh">입력한 비밀번호가 서로 일치하지 않습니다.</WarningText>}
                <SignupButton disabled={!isFormValid} onClick={handleSignup}>회원가입 완료</SignupButton>
            </BoxContainer>
        </div>
    );
}

export default Signup;