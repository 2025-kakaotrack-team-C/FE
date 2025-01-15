import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";
import styled from "styled-components";

const Layout = () => {
  return (
    <Container>
      <SideBarWrapper>
        <SideBar />
      </SideBarWrapper>
      <ContentWrapper>
        <Outlet />
      </ContentWrapper>
    </Container>
  );
};

export default Layout;

// 스타일링
const Container = styled.div`
  display: flex;
  height: 100vh;
`;

const SideBarWrapper = styled.div`
  height: 100%;
  flex-shrink: 0;
`;

const ContentWrapper = styled.div`
  flex: 1;
  overflow-y: auto;
  background-color: #fefbff;
`;
