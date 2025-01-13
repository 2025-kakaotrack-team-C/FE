import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";

const Layout = () => {
  //   const location = useLocation();

  // "/" 경로일 경우 사이드바를 숨김
  //   const showSidebar = location.pathname !== "/";

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <SideBar />
      <div style={{ flex: 1, padding: "24px" }}>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
