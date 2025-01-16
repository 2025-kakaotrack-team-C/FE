import React, { useState } from "react";
import styled from "styled-components";
import { MdMoreVert } from "react-icons/md";
import EditTeamForm from "../components/EditTeamForm";

const dummyTeamData = {
  id: 1,
  userId: 1,
  date: "2023-07-15",
  difficulty: "중간",
  title: "팀 프로젝트 제목",
  tag: "#태그",
  author: "작성자명",
  projectDescription: "프로젝트에 대한 상세 설명입니다.",
  fieldAndMembers: "프론트엔드 2명, 백엔드 1명",
  deadline: "2023-08-31",
  fields: [
    { field: "프론트", members: 2 },
    { field: "백", members: 1 },
  ],
  description: "프로젝트 설명",
};

const TeamDetail = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [teamData, setTeamData] = useState(dummyTeamData); // 더미 데이터 사용

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleEdit = () => {
    setIsEditMode(true);
    setIsMenuOpen(false);
  };

  return (
    <Container>
      {isEditMode ? (
        <EditTeamForm
          existingData={teamData}
          onCancel={() => setIsEditMode(false)}
          onSave={(updatedData) => {
            setTeamData(updatedData);
            setIsEditMode(false);
          }}
        />
      ) : (
        <>
          <Rectangle>
            <div>{teamData.date}</div>
            <Header>
              <div>{teamData.difficulty}</div>
              <Title>{teamData.title}</Title>
            </Header>
            <div>
              <Ttag>{teamData.tag}</Ttag>
            </div>
          </Rectangle>
          <div>
            <AuthorRow>
              <div>{teamData.author}</div>
              <IconWrapper onClick={toggleMenu}>
                <MdMoreVert size={24} color="#1c1c1d" />
              </IconWrapper>
              {isMenuOpen && (
                <Menu>
                  <MenuItem onClick={handleEdit}>수정</MenuItem>
                  <MenuItem>삭제</MenuItem>
                </Menu>
              )}
            </AuthorRow>
            <Border />
          </div>
          <DetailLayout>
            <DetailTitle>프로젝트 내용 설명</DetailTitle>
            <Detail>{teamData.projectDescription}</Detail>
          </DetailLayout>
          <DetailLayout>
            <DetailTitle>구하는 분야 및 인원?</DetailTitle>
            <Detail>{teamData.fieldAndMembers}</Detail>
          </DetailLayout>
          <DetailLayout>
            <DetailTitle>지원 마감일</DetailTitle>
            <Detail>{teamData.deadline}</Detail>
          </DetailLayout>
          <StButton>지원 확인</StButton>
        </>
      )}
    </Container>
  );
};

export default TeamDetail;

// 스타일 컴포넌트 정의
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  min-height: 100vh;
  padding: 24px;
  margin: 0 auto;
  max-width: 1440px;
  width: 100%;
`;
const Rectangle = styled.div`
  padding: 24px;
  background: #f8f1f6;
  border: 1px solid #e8e0e8;
  border-radius: 24px;
  margin-bottom: 24px;
`;
const Header = styled.div`
  font-size: 18px;
  margin-bottom: 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
  margin-top: 44px;
`;
const Title = styled.div`
  font-size: 36px;
  font-weight: bold;
`;
const Ttag = styled.div`
  font-size: 14px;
  border-radius: 24px;
  background-color: #e8e0e8;
  padding: 8px 16px;
  display: inline-block;
  text-align: center;
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
  top: 36px;
  right: 0;
  background: #ffffff;
  border: 1px solid #1c1c1d;
  border-radius: 16px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  width: 140px;
  z-index: 1000;
  overflow: hidden;
  animation: fadeIn 0.3s ease-in-out;
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
const MenuItem = styled.div`
  padding: 16px;
  font-size: 16px;
  font-weight: bold;
  color: #1c1c1d;
  cursor: pointer;
  text-align: center;
  border-bottom: 1px solid #e8e0e8;
  &:last-child {
    border-bottom: none;
  }
  transition: background-color 0.3s ease, color 0.3s ease;
  &:hover {
    background-color: #f2f2f2;
  }
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
  font-weight: bold;
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
  transition: background-color 0.3s, color 0.3s;
  &:hover {
    background-color: #21005d;
    color: #dcdaf5;
  }
`;
