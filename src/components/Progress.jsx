// components/ProgressBar.js
import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

// 프로그레스 바의 외부 컨테이너
const ProgressBarContainer = styled.div`
  width: 100%;
  background-color: #e0e0de;
  border-radius: 8px;
  height: 24px; /* 높이를 늘려 수치 표시 공간 확보 */
  margin-top: 8px;
  position: relative; /* 수치 텍스트의 절대 위치를 위해 relative 설정 */
`;

// 프로그레스 바의 채워진 부분
const Progress = styled.div`
  height: 100%;
  width: ${(props) => props.width}%;
  background-color: ${(props) => props.color};
  border-radius: 8px;
  transition: width 0.3s ease, background-color 0.3s ease;
`;

// 레이팅 설명 텍스트
const RatingDescription = styled.div`
  margin-top: 4px;
  text-align: center;
  font-size: 14px;
  color: #333;
  font-family: "yg-jalnan";

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const ProgressBar = ({ rating }) => {
  // 레이팅 값이 1에서 5 사이인지 확인, 아니면 기본값 4로 설정
  const safeRating = rating >= 1 && rating <= 5 ? rating : 4;
  const progressPercentage = (safeRating / 5) * 100;

  // 레이팅에 따른 색상 지정
  const getColor = (rating) => {
    switch (rating) {
      case 1:
        return "#f44336"; // 빨간색
      case 2:
        return "#ff9800"; // 주황색
      case 3:
        return "#ffeb3b"; // 노란색
      case 4:
        return "#4caf50"; // 초록색
      case 5:
        return "#2196f3"; // 파란색
      default:
        return "#e0e0de"; // 기본 색상
    }
  };

  const color = getColor(safeRating);

  // 레이팅 값에 따른 설명 매핑
  const getDescription = (rating) => {
    switch (rating) {
      case 1:
        return "매우 안좋음";
      case 2:
        return "안좋음";
      case 3:
        return "보통";
      case 4:
        return "좋음";
      case 5:
        return "매우 좋음";
      default:
        return "";
    }
  };

  const description = getDescription(safeRating);

  return (
    <>
      <ProgressBarContainer
        role="progressbar"
        aria-valuenow={safeRating}
        aria-valuemin="1"
        aria-valuemax="5"
        aria-label={`사용자 레이팅: ${safeRating}점`}
      >
        <Progress width={progressPercentage} color={color} />
      </ProgressBarContainer>
      <RatingDescription>{description}</RatingDescription>
    </>
  );
};

ProgressBar.propTypes = {
  rating: PropTypes.number,
};

ProgressBar.defaultProps = {
  rating: 4, // 기본값을 '좋음'으로 설정
};

export default ProgressBar;
