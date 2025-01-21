import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div` 
    display: flex; 
    flex-direction: column; 
    min-height: 100vh; 
    padding: 24px; 
    margin: 0 auto; 
    max-width: 1440px;
    
    @media (max-width: 768px) { 
        padding: 16px; 
    } 

    @media (max-width: 480px) { 
        padding: 12px; 
    } 
`;

const Title = styled.div`
    font-family: "yg-Jalnan";
    font-size: 1.5vw;
    margin-top: 2vh;
    margin-left: 2vw;
`;

const Divider = styled.hr`
    height: 0.2vh;
    background-color: #000000;
    margin-top: 3vh;
`;

const BoxContainer = styled.div`
    align-items: center;
    justify-content: center;
    display: flex;
    flex-direction: column;
    margin-top: 3vh;
`;

const Box = styled.div`
    width: 65vw;
    height: 20vh;
    margin-top: 4vh;
    border-radius: 24px;
    border: 0.1vw solid;
    border-color: #E8E0E8;
    background-color: #F8F1F6;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2vw;
`;

const UserPicture = styled.div`
    width: 128px;
    height: 128px;
    background-color: #4caf50;
    border-radius: 50%;
`;

const Contents = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 88%;
`;

const TextBox = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-left: 4vw;
`;

const UserName = styled.div`
    font-family: "Pretendard-Regular";
    font-size: 1.8vw;
`;

const UseProfile = styled.div`
    white-space: pre-line;
    font-family: "Pretendard-Regular";
    font-size: 1.3vw;
    margin-top: 2vh;
    margin-left: 2vw;
`;

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const BoxButton = styled.button`
    width: 12vw;
    height: 5.5vh;
    margin: 0.8vw;
    border-radius: 24px;
    font-size: 1.3vw;
    font-weight: bolder;
    background-color: ${(props) => props.ButtonColor};
    color: ${(props) => props.TextColor};
    border: none;
    
    &:hover {
        cursor: pointer;
    }

    &:active {
        background-color: ${(props) => props.TextColor};
        color: ${(props) => props.ButtonColor};
    }
`;

const Button = styled.button`
    width: 12vw;
    height: 5.5vh;
    border-radius: 24px;
    font-size: 1.3vw;
    font-weight: bolder;
    background-color: #F2ECEE;
    color: #787579;
    margin-top: 7vh;
    border: none;
    
    &:hover {
        cursor: pointer;
    }

    &:active {
        background-color: #787579;
        color: #F2ECEE;
    }
`;

const ApplyStatus = () => {
    const [isEditClicked, setIsEditClicked] = useState(false); 
    const [isCloseClicked, setIsCloseClicked] = useState(false); 
    const handleEditClick = () => { 
        setIsEditClicked((prev) => !prev); 
    }; 
    const handleCloseClick = () => { 
        setIsCloseClicked((prev) => !prev); 
    };
    
    return (
        <Container>
            <Title>지원 현황 (명)</Title>
            <Divider />
            <BoxContainer>
                <Box>
                    <UserPicture />
                    <Contents>
                        <TextBox>
                            <UserName>이름</UserName>
                            <UseProfile>
                                {`전공: \n 언어: \n 깃허브: `}
                            </UseProfile>
                        </TextBox>
                        <ButtonContainer>
                            <BoxButton 
                                ButtonColor="#DCDAF5" 
                                TextColor="#21005D" 
                                isClicked={isEditClicked} 
                                onClick={handleEditClick}
                            >
                                수정
                            </BoxButton>
                            <BoxButton 
                                ButtonColor="#F2ECEE" 
                                TextColor="#787579" 
                                isClicked={isCloseClicked} 
                                onClick={handleCloseClick}
                            >
                                닫기
                            </BoxButton>
                        </ButtonContainer>
                    </Contents>
                </Box>
            </BoxContainer>
            <ButtonContainer>
                <Button>닫기</Button>
            </ButtonContainer>
        </Container>
    );
}


export default ApplyStatus;