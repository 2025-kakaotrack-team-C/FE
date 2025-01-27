// src/components/SideBarPicture.js
import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

// 이미지 임포트
import rating1 from "../assets/Red.png";
import rating2 from "../assets/Orange.png";
import rating3 from "../assets/Yellow.png";
import rating4 from "../assets/Green.png";
import rating5 from "../assets/Blue.png";
import defaultProfile from "../assets/Green.png"; // 기본 프로필 사진

const SideBarPicture = ({ rating }) => {
  // 평가에 따라 이미지 선택
  const getRatingImage = () => {
    switch (rating) {
      case 1:
        return rating1;
      case 2:
        return rating2;
      case 3:
        return rating3;
      case 4:
        return rating4;
      case 5:
        return rating5;
      default:
        return defaultProfile; // 평가가 없거나 유효하지 않은 경우 기본 프로필 사진
    }
  };

  return (
    <PictureContainer>
      <ProfileImage src={getRatingImage()} alt="User Rating" />
    </PictureContainer>
  );
};

// PropTypes 설정 (선택 사항)
SideBarPicture.propTypes = {
  rating: PropTypes.number,
};

SideBarPicture.defaultProps = {
  rating: null,
};

export default SideBarPicture;

// Styled Components
const PictureContainer = styled.div`
  width: 128px;
  height: 128px;
  border-radius: 50%;
  /* margin-bottom: 16px; */
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #4caf50; /* 배경색 (선택 사항) */
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
