import React, { useState } from "react";
import styled from "styled-components";
import { FaStar } from "react-icons/fa";

function Evaluation() {
  const [rating, setRating] = useState(0);

  const handleStarClick = (value) => {
    setRating(value);
  };

  return (
    <Container>
      <Title>
        <Header>당신의 온도는?</Header>
      </Title>
      <ProfileSection>
        <Picture>사진</Picture>
        <ProfileDetails>
          <Name>이름</Name>
          <Major>전공</Major>
          <Language>언어</Language>
        </ProfileDetails>
      </ProfileSection>
      <EvaluationSection>
        <Word>이 팀원의 전체적인 평가는?</Word>
        <StarContainer>
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              filled={star <= rating}
              onClick={() => handleStarClick(star)}
            >
              <FaStar />
            </Star>
          ))}
        </StarContainer>
      </EvaluationSection>
      <StButton>제출하기</StButton>
    </Container>
  );
}

export default Evaluation;

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 24px;
  margin: 0 auto;
  max-width: 1440px;
  position: relative;

  @media (max-width: 768px) {
    padding: 16px;
  }

  @media (max-width: 480px) {
    padding: 12px;
  }
`;

const Header = styled.h1`
  font-size: 45px;
  font-family: "yg-jalnan", sans-serif;
  color: #1c1c1d;
  margin: 0;
  margin-bottom: 24px;

  @media (max-width: 768px) {
    font-size: 28px;
  }

  @media (max-width: 480px) {
    font-size: 24px;
  }
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 10px;
  }
`;

const ProfileSection = styled.section`
  display: flex;
  align-items: center;
  margin-bottom: 40px;
  padding: 48px;
  border: 1px solid #e8e0e8;
  border-radius: 24px;
  background-color: #f8f1f6;
`;

const ProfileDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const Name = styled.div`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 24px;

  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

const Major = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 16px;

  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

const Language = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 16px;

  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

const Picture = styled.figure`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 60px;
  width: 144px;
  height: 120px;
  background-color: #f8f1f6;
  border: 1px solid black;
  border-radius: 50%;
`;

const EvaluationSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Word = styled.p`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 40px;
  text-align: center;
`;

const StarContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
  justify-content: center;
`;

const Star = styled.div`
  font-size: 75px;
  cursor: pointer;
  color: ${(props) => (props.filled ? "#FFE208" : "#D9D9D9")};

  &:hover {
    transform: scale(1.2);
  }
`;

const StButton = styled.button`
  position: absolute;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #dcdaf5;
  color: #21005d;
  font-size: 20px;
  border-radius: 24px;
  padding: 16px 24px;
  cursor: pointer;

  transition: background-color 0.3s, color 0.3s;
  &:hover {
    background-color: #21005d;
    color: #dcdaf5;
  }
`;
