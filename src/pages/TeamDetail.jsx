import React, { useState } from "react";
import styled from "styled-components";
import { MdMoreVert } from "react-icons/md";

const TeamDetail = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <Container>
      <Rectangle>
        <div>날짜</div>
        <Header>
          <div>난이도</div>
          <Title>제목</Title>
        </Header>
        <div>
          <Ttag># 태그</Ttag>
        </div>
      </Rectangle>
      <div>
        <AuthorRow>
          <div>작성자</div>
          <IconWrapper onClick={toggleMenu}>
            <MdMoreVert size={24} color="#1c1c1d" />
          </IconWrapper>
          {isMenuOpen && (
            <Menu>
              <MenuItem>수정</MenuItem>
              <MenuItem>삭제</MenuItem>
            </Menu>
          )}
        </AuthorRow>
        <Border></Border>
      </div>
      <DetailLayout>
        <DetailTitle>프로젝트 내용 설명</DetailTitle>
        <Detail>내용</Detail>
      </DetailLayout>
      <DetailLayout>
        <DetailTitle>구하는 분야 및 인원?</DetailTitle>
        <Detail>내용</Detail>
      </DetailLayout>
      <DetailLayout>
        <DetailTitle>지원 마감일</DetailTitle>
        <Detail>내용</Detail>
      </DetailLayout>
      <StButton>지원 확인</StButton>
    </Container>
  );
};

export default TeamDetail;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  min-height: 100vh; /* 높이를 최소 화면 크기로 설정 */
  padding: 24px;
  margin: 0 auto;
  max-width: 1440px;
  width: 100%;
  /* overflow: auto; */
`;

const Rectangle = styled.div`
  padding: 24px;
  background: #f8f1f6;
  border: 1px solid #e8e0e8;
  border-radius: 24px;
  margin-bottom: 24px;
`;

const Title = styled.div`
  font-size: 36px;
  font-weight: bold;
`;

const Header = styled.div`
  font-size: 18px;
  margin-bottom: 16px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-top: 44px;
  gap: 12px;
`;

const Ttag = styled.div`
  font-size: 14px;
  border-radius: 24px;
  background-color: #e8e0e8;
  padding: 8px 16px;
  display: inline-block;
  text-align: center;
`;

const Border = styled.div`
  border: 1px solid #1c1c1d;
  margin-top: 24px;
  margin-bottom: 60px;
`;

const DetailLayout = styled.div`
  display: flex;
  margin-bottom: 48px;
  flex-direction: column;
  gap: 12px;
  align-items: flex-start;
`;

const DetailTitle = styled.div`
  font-size: 24px;
  margin-bottom: 16px;
  display: flex;
  font-weight: bold;
  flex-direction: column;
  gap: 8px;
`;

const Detail = styled.div`
  font-size: 16px;
`;

const StButton = styled.button`
  background-color: #dcdaf5;
  color: #21005d;
  font-size: 20px;
  border-radius: 24px;
  padding: 16px 24px;
  cursor: pointer;
  margin-left: auto;
  transition: background-color 0.3s, color 0 3s;

  &:hover {
    background-color: #21005d;
    color: #dcdaf5;
  }
`;

const AuthorRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  position: relative;
`;

const IconWrapper = styled.div`
  cursor: pointer;
  position: relative;

  transition: transform 0.2s ease, color 0.3s ease;

  &:hover {
    transform: scale(1.1);
    color: #21005d;
  }

  svg {
    transition: color 0.3s ease;
  }
`;
const Menu = styled.div`
  position: absolute;
  top: 32px;
  right: 0;
  background: #fff;
  border: 1px solid #1c1c1d;
  border-radius: 24px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 120px;
  z-index: 1000;
  overflow: hidden;
`;

const MenuItem = styled.div`
  padding: 12px 16px;
  font-size: 16px;
  font-weight: bold;
  color: #1c1c1d;
  cursor: pointer;
  text-align: center;
  border-bottom: 1px solid #1c1c1d;

  &:last-child {
    border-bottom: none;
  }

  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: #dcdaf5;
    color: #1c1c1d;
  }
`;
