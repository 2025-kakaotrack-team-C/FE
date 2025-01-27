import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { MdMoreVert } from "react-icons/md";
import axios from "axios";
import EditTeamForm from "../components/EditTeamForm";
import ApplyForm from "../pages/ApplyForm"; // ApplyForm 컴포넌트 import
import { useNavigate, useParams } from "react-router-dom";
import { getCookie } from "../utils/Cookie";

const TeamDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [teamData, setTeamData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState(null);

  // 모달 열림/닫힘 상태
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectState, setProjectState] = useState(null);

  // "지원자 현황" 버튼 클릭 시 이동
  const handleOpenApplyStatus = () => {
    navigate(`/applystatus/${id}`);
  };

  // "지원하기" 모달 열기/닫기
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // API에서 사용하는 부서(department) 매핑
  const departmentsData = {
    1: "ai",
    2: "frontend",
    3: "backend",
    4: "app",
    5: "game",
  };

  // 현재 사용자 정보 불러오기
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const token = getCookie("token");
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/mypage`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCurrentUserId(response.data.id);
        console.log("현재 사용자 ID:", response.data);
      } catch (error) {
        console.error("현재 사용자 정보를 가져오는 데 실패했습니다:", error);
      }
    };

    fetchCurrentUser();
  }, []);

  // 특정 프로젝트(팀) 데이터 불러오기
  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/projects/${id}`
        );
        const data = response.data;
        console.log(data);
        // 프로젝트 state 값 설정
        setProjectState(data.status); // API 응답에 state가 있다고 가정

        const difficultyMapping = {
          1: "쉬움",
          2: "중간",
          3: "어려움",
        };

        const formattedData = {
          id: data.id,
          date: data.createdAt.split("T")[0],
          difficulty: `난이도: ${
            difficultyMapping[data.difficult] || "알 수 없음"
          }`,
          title: data.title,
          tag: "#프로젝트",
          author: data.user.username,
          authorId: data.user.id,
          projectDescription: data.description,
          fieldAndMembers: data.fields
            .map(
              (field) =>
                `${departmentsData[field.department] || "알 수 없음"} 분야 ${
                  field.range
                }명`
            )
            .join(", "),
          deadline: data.deadline,
          fields: data.fields,
        };

        setTeamData(formattedData);
      } catch (error) {
        console.error("데이터 가져오기 실패:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchTeamData();
    }
  }, [id]);

  // 더보기 메뉴 열기/닫기
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  // 게시물 수정
  const handleEdit = () => {
    setIsEditMode(true);
    setIsMenuOpen(false);
  };

  // 난이도 색상 매핑
  const difficultyColorMapping = {
    쉬움: "#27ae60",
    중간: "#f1c40f",
    어려움: "#e74c3c",
  };

  // 진행 중
  if (projectState === 2) {
    navigate(`/projects/${id}/formation`);
  }
  if (projectState === 3) {
    navigate(`/project/${id}/evaluation`);
  }
  if (projectState === 4) {
    navigate(`/completed-project/${id}`);
  }
  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (!teamData) {
    return <div>데이터를 불러오지 못했습니다.</div>;
  }

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
            <div>작성일 : {teamData.date}</div>
            <Header>
              <Difficulty
                color={
                  difficultyColorMapping[
                    teamData.difficulty.replace("난이도: ", "")
                  ] || "#bdc3c7"
                }
              >
                {teamData.difficulty}
              </Difficulty>
              <Title>{teamData.title}</Title>
            </Header>
            <div>
              <Ttag># 프로젝트 모집중</Ttag>
            </div>
          </Rectangle>

          <div>
            <AuthorRow>
              <div>작성자 : {teamData.author}</div>
              {currentUserId === teamData.authorId && (
                <>
                  <IconWrapper onClick={toggleMenu}>
                    <MdMoreVert size={24} color="#1c1c1d" />
                  </IconWrapper>
                  {isMenuOpen && (
                    <Menu>
                      <MenuItem onClick={handleEdit}>수정</MenuItem>
                      <MenuItem>삭제</MenuItem>
                    </Menu>
                  )}
                </>
              )}
            </AuthorRow>
            <Border />
          </div>

          <DetailLayout>
            <DetailTitle>프로젝트 내용 설명</DetailTitle>
            <Detail>{teamData.projectDescription}</Detail>
          </DetailLayout>
          <DetailLayout>
            <DetailTitle>구하는 분야 및 인원</DetailTitle>
            <Detail>{teamData.fieldAndMembers}</Detail>
          </DetailLayout>
          <DetailLayout>
            <DetailTitle>지원 마감일</DetailTitle>
            <Detail>{teamData.deadline}</Detail>
          </DetailLayout>

          {currentUserId === teamData.authorId ? (
            <StButton onClick={handleOpenApplyStatus}>지원자 현황</StButton>
          ) : (
            // "지원하기" 버튼 클릭 -> 모달 열림
            <StButton onClick={openModal}>지원하기</StButton>
          )}
        </>
      )}

      {/*
        ApplyForm에 
          isOpen={isModalOpen}
          closeModal={closeModal}
          projectId={id}   <-- 추가!!
        을 props로 넘겨 모달 열림/닫힘을 제어하면서
        어느 프로젝트에 지원하는지 식별할 수 있도록 합니다.
      */}
      <ApplyForm
        isOpen={isModalOpen}
        closeModal={closeModal}
        projectId={id} // 추가
      />
    </Container>
  );
};

export default TeamDetail;

// --- 스타일 컴포넌트 ---

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

const Difficulty = styled.div`
  font-size: 18px;
  padding: 8px 16px;
  border-radius: 24px;
  color: #ffffff;
  background-color: ${(props) => props.color || "#bdc3c7"};
  text-align: center;
  display: inline-block;
`;
