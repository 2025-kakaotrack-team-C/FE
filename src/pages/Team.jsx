import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import Search from "../components/Search";

const Team = () => {
  const navigate = useNavigate();
  const { category } = useParams(); // URL 파라미터에서 category 가져오기
  const normalizedCategory = category?.toLowerCase(); // 소문자로 변환

  // 부서 데이터를 미리 정의 (부서 번호 -> 부서 이름 매핑)
  const departmentsData = {
    1: "ai",
    2: "frontend",
    3: "backend",
    4: "app",
    5: "game",
    // 추가 부서 정보
  };

  const [projects, setProjects] = useState([]); // 프로젝트 데이터 상태

  // API 호출 및 데이터 가져오기
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(
          "http://3.34.170.189:8080/api/projects"
        );

        // 최근 게시물이 맨 앞으로 오도록 내림차순 정렬
        // (id가 클수록 최근 생성된 데이터라고 가정)
        const sortedProjects = response.data.sort((a, b) => b.id - a.id);

        setProjects(sortedProjects);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  // 카테고리에 맞는 프로젝트 필터링
  const filteredProjects = normalizedCategory
    ? projects.filter((project) =>
        project.departments.some((deptId) => {
          const deptName = departmentsData[deptId]; // deptId로 departmentsData에서 이름 조회
          return deptName?.toLowerCase() === normalizedCategory; // 이름과 normalizedCategory 비교
        })
      )
    : projects;

  // 페이지네이션 상태
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // 페이지당 항목 수

  // 현재 페이지 데이터 계산
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProjects.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // 페이지 변경 핸들러
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // 전체 페이지 수 계산
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);

  const goToCreateTeamPage = () => {
    navigate(`/create`);
  };

  return (
    <Container>
      <Search />
      <Title>
        <Header>{category ? `${category} 프로젝트` : "전체 프로젝트"}</Header>
        <AddButton onClick={goToCreateTeamPage}>
          <AiOutlinePlusCircle />
        </AddButton>
      </Title>
      <TeamWrapper>
        {currentItems.map((project) => (
          <TeamBorder
            key={project.id}
            onClick={() => navigate(`/project/${project.id}`)} // 프로젝트 세부 페이지로 이동
          >
            <FieldLayout>
              {project.departments.map((deptId) => (
                <Field key={deptId}>{departmentsData[deptId]}</Field>
              ))}
            </FieldLayout>
            <TeamTitle>{project.title}</TeamTitle>
            <TeamInfo>
              <div>참여 인원: {project.totalRange}</div>
              <div>마감일: {project.deadline}</div>
            </TeamInfo>
          </TeamBorder>
        ))}
      </TeamWrapper>
      <Pagination>
        {Array.from({ length: totalPages }, (_, index) => (
          <PageButton
            key={index}
            isActive={currentPage === index + 1}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </PageButton>
        ))}
      </Pagination>
    </Container>
  );
};

export default Team;

// 스타일 정의
const Container = styled.div`
  flex: 1;
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 10px;
  }
`;

const Header = styled.h1`
  font-size: 36px;
  font-family: "yg-jalnan", sans-serif;
  color: #1c1c1d;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 28px;
  }

  @media (max-width: 480px) {
    font-size: 24px;
  }
`;

const AddButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background: none;
  border: none;
  color: #21005d;
  font-size: 40px;
  cursor: pointer;
  margin: 0;
  transition: color 0.3s, transform 0.2s;

  &:hover {
    color: #dcdaf5;
    transform: scale(1.1);
  }

  &:active {
    color: #dcdaf5;
    transform: scale(0.95);
  }

  @media (max-width: 480px) {
    font-size: 32px;
  }
`;

const TeamWrapper = styled.div`
  display: grid;
  gap: 24px;
  flex-grow: 1;

  @media (min-width: 1025px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 767px) {
    grid-template-columns: 1fr;
  }
`;

const TeamBorder = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  background-color: #f8f1f6;
  border-radius: 20px;
  min-width: 250px;
  min-height: 280px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.15);
    background-color: #dcdaf5;
  }

  @media (max-width: 480px) {
    padding: 16px;
  }
`;

const FieldLayout = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  align-items: center;

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 5px;
  }
`;

const Field = styled.div`
  padding: 8px 16px;
  border-radius: 20px;
  font-weight: bold;
  background-color: #00e636;
  font-size: 13px;
  text-align: center;

  @media (max-width: 480px) {
    font-size: 12px;
    padding: 6px 12px;
  }
`;

const TeamTitle = styled.h2`
  font-size: 22px;
  font-weight: bold;
  margin-top: 14px;
  color: #1c1c1d;

  @media (max-width: 768px) {
    font-size: 18px;
  }

  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

const TeamInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-size: 15px;
  color: #1c1c1d;

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 14px;
  padding: 8px 16px;
  gap: 12px;

  @media (max-width: 480px) {
    gap: 8px;
  }
`;

const PageButton = styled.button`
  padding: 12px 16px;
  border-radius: 50%;
  background-color: ${(props) => (props.isActive ? "#21005d" : "#f8f1f6")};
  color: ${(props) => (props.isActive ? "#ffffff" : "#21005d")};
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s;

  &:hover {
    background-color: #dcdaf5;
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }

  @media (max-width: 480px) {
    padding: 8px 12px;
    font-size: 14px;
  }
`;
