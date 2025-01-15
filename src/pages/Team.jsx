import React, { useState } from "react";
import styled from "styled-components";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useParams, useNavigate } from "react-router-dom";
import Search from "../components/Search";

const Team = () => {
  const { type } = useParams(); // URL의 type 파라미터 가져오기
  const navigate = useNavigate();

  // URL의 type이 없을 경우 기본값 'all' 사용
  const effectiveType = type || "all";

  // 페이지 제목과 필드 설정
  const pageData = {
    all: { title: "전체", fields: ["전체", "전체"] },
    ai: { title: "AI 팀", fields: ["머신러닝", "데이터 분석"] },
    frontend: { title: "프론트엔드 팀", fields: ["React", "CSS"] },
    backend: { title: "백엔드 팀", fields: ["Node.js", "Database"] },
    app: { title: "앱 개발 팀", fields: ["iOS", "Android"] },
    game: { title: "게임 개발 팀", fields: ["Unity", "C#"] },
  };

  const currentPageData = pageData[effectiveType] || {
    title: "팀 정보 없음",
    fields: [],
  };

  // 테스트용 데이터 배열 생성
  const teamData = Array.from({ length: 30 }, (_, index) => ({
    id: index,
    title: `${currentPageData.title} ${index + 1}`,
    fields: currentPageData.fields,
    info: ["참여인원", "언제까지"],
  }));

  // 페이지네이션 상태
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // 페이지당 항목 수

  // 현재 페이지 데이터 계산
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = teamData.slice(indexOfFirstItem, indexOfLastItem);

  // 페이지 변경 핸들러
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // 전체 페이지 수 계산
  const totalPages = Math.ceil(teamData.length / itemsPerPage);

  const goToCreateTeamPage = () => {
    navigate(`/create`);
  };

  return (
    <Container>
      <Search />
      <Title>
        <Header>{currentPageData.title}</Header>
        <AddButton onClick={goToCreateTeamPage}>
          <AiOutlinePlusCircle />
        </AddButton>
      </Title>
      <TeamWrapper>
        {currentItems.map((team) => (
          <TeamBorder
            key={team.id}
            onClick={() => navigate(`/${effectiveType}/${team.id}`)} // 항상 유효한 URL 생성 // 게시물 클릭 시 이동
          >
            <FieldLayout>
              {team.fields.map((field, index) => (
                <Field key={index}>{field}</Field>
              ))}
            </FieldLayout>
            <TeamTitle>{team.title}</TeamTitle>
            <TeamInfo>
              {team.info.map((info, index) => (
                <div key={index}>{info}</div>
              ))}
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
  min-height: 100vh; /* 높이를 최소 화면 크기로 설정 */
  padding: 24px;
  margin: 0 auto; /* 중앙 정렬 */
  max-width: 1440px;
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Header = styled.h1`
  font-size: 36px;
  font-family: "yg-jalnan", sans-serif;
  color: #1c1c1d;
  margin: 0;
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
`;

const TeamWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 한 줄에 3개 */
  gap: 20px;
  flex-grow: 1;
`;

const TeamBorder = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  background-color: #f8f1f6;
  border-radius: 20px;
  min-width: 300px;
  min-height: 280px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.15);
    background-color: #dcdaf5;
  }
`;

const FieldLayout = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  align-items: center;
`;

const Field = styled.div`
  padding: 8px 16px;
  border-radius: 20px;
  font-weight: bold;
  background-color: #00e636;
  font-size: 13px;
  text-align: center;
`;

const TeamTitle = styled.h2`
  font-size: 22px;
  font-weight: bold;
  margin-top: 14px;
  color: #1c1c1d;
`;

const TeamInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-size: 15px;
  color: #1c1c1d;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 14px;
  padding: 8px 16px;
  gap: 12px; /* 간격 조정 */
`;

const PageButton = styled.button`
  padding: 12px 16px; /* 버튼 크기 증가 */
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
`;
