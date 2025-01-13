import React from "react";
import { Routes, Route, useParams } from "react-router-dom";
import styled from "styled-components";

const Team = () => {
  const { category } = useParams();

  const categoryData = {
    all: "전체 팀빌딩 화면",
    ai: "AI 팀빌딩",
    frontend: "프론트엔드 팀빌딩",
    backend: "백엔드 팀빌딩",
    app: "앱 개발 팀빌딩",
    game: "게임 팀빌딩",
  };

  return (
    <Container>
      <Header>{categoryData[category] || "팀빌딩 메인 화면"}</Header>
      <Routes>
        {/* 팀빌딩 기본 화면 */}
        <Route
          path="/"
          element={<Content>팀빌딩과 관련된 메인 콘텐츠입니다.</Content>}
        />
        {/* 카테고리별 화면 */}
        <Route
          path=":category"
          element={
            <Content>
              여기는 <strong>{categoryData[category]}</strong> 콘텐츠입니다.
            </Content>
          }
        />
      </Routes>
    </Container>
  );
};

export default Team;

// 스타일링
const Container = styled.div`
  padding: 24px;
`;

const Header = styled.h1`
  font-size: 32px;
  margin-bottom: 16px;
`;

const Content = styled.div`
  font-size: 18px;
  color: #555;
`;
