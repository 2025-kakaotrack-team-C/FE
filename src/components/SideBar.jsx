import React, { useState } from "react";
import styled from "styled-components";
import {
  FaUser,
  FaBell,
  FaSignOutAlt,
  FaUsers,
  FaRobot,
  FaCode,
  FaServer,
  FaMobileAlt,
  FaGamepad,
  FaChevronDown,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

const SideBar = () => {
  const [isTeamBuildingOpen, setIsTeamBuildingOpen] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const teamBuildingItems = [
    { name: "AI", icon: <FaRobot />, path: "/ai" },
    { name: "프론트엔드", icon: <FaCode />, path: "/frontend" },
    { name: "백엔드", icon: <FaServer />, path: "/backend" },
    { name: "앱 개발", icon: <FaMobileAlt />, path: "/app" },
    { name: "게임", icon: <FaGamepad />, path: "/game" },
  ];

  const handleTeamBuildingClick = () => {
    setIsTeamBuildingOpen((prev) => !prev);
    setSelectedMenuItem("팀빌딩");
  };

  const toggleSidebar = () => {
    setIsCollapsed((prev) => !prev);
    setSelectedMenuItem(null);
    setIsTeamBuildingOpen(false);
  };

  return (
    <Sidebar isCollapsed={isCollapsed}>
      <Header>
        <Logo onClick={toggleSidebar}>PIN</Logo>
      </Header>

      {!isCollapsed && (
        <>
          <SidebarProfile>
            <SideBarPicture />
            <SideBarName>이름</SideBarName>
            <SideMajor>전공</SideMajor>
            <SideBarProgress>프로그래스바</SideBarProgress>
          </SidebarProfile>
          <Menu>
            <MenuItemWithArrow
              as={NavLink}
              to="/"
              onClick={handleTeamBuildingClick}
              isSelected={
                selectedMenuItem === "팀빌딩" ||
                teamBuildingItems.some(
                  (teamItem) => teamItem.name === selectedMenuItem
                )
              }
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "12px" }}
              >
                <FaUsers /> 팀빌딩
              </div>
              <ArrowIcon isOpen={isTeamBuildingOpen}>
                <FaChevronDown />
              </ArrowIcon>
            </MenuItemWithArrow>

            <TeamBuildingMenu visible={isTeamBuildingOpen}>
              {teamBuildingItems.map((item) => (
                <MenuItem
                  as={NavLink}
                  to={item.path}
                  key={item.name}
                  isSelected={selectedMenuItem === item.name}
                  onClick={() => setSelectedMenuItem(item.name)}
                >
                  {item.icon} {item.name}
                </MenuItem>
              ))}
            </TeamBuildingMenu>
            <MenuItem
              as={NavLink}
              to="/mypage"
              isSelected={selectedMenuItem === "마이페이지"}
              onClick={() => setSelectedMenuItem("마이페이지")}
            >
              <FaUser /> 마이페이지
            </MenuItem>
          </Menu>
          <FixedBottom>
            <MenuItem
              as={NavLink}
              to="/notifications"
              isSelected={selectedMenuItem === "알림"}
              onClick={() => setSelectedMenuItem("알림")}
            >
              <FaBell /> 알림
            </MenuItem>
            <LogoutButton
              type="button"
              onClick={() => setSelectedMenuItem("로그아웃")}
              isSelected={selectedMenuItem === "로그아웃"}
            >
              <FaSignOutAlt /> 로그아웃
            </LogoutButton>
          </FixedBottom>
        </>
      )}
    </Sidebar>
  );
};

export default SideBar;

// 스타일링
const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 0px 24px 24px 0px;
  width: ${(props) => (props.isCollapsed ? "80px" : "287px")};
  background: #f2ecee;
  padding: ${(props) => (props.isCollapsed ? "16px" : "24px")};
  box-shadow: 4px 0 6px rgba(0, 0, 0, 0.1);
  z-index: 10;
  transition: width 0.3s ease, padding 0.3s ease;
  height: 100vh;
  overflow: auto;

  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #c5c2c6;
    border-radius: 24px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background-color: #9b97a0;
  }
  &::-webkit-scrollbar-track {
    background-color: #f2ecee;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
  font-family: yg-jalnan;
`;

const SidebarProfile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 24px;
`;

const SideBarPicture = styled.div`
  width: 128px;
  height: 128px;
  background-color: #4caf50;
  border-radius: 50%;
  margin-bottom: 16px;
`;

const SideBarName = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 4px;
  font-family: yg-jalnan;
`;

const SideMajor = styled.div`
  font-size: 14px;
  margin-bottom: 16px;
  font-family: yg-jalnan;
`;

const SideBarProgress = styled.div`
  border-radius: 4px;
  overflow: hidden;
  position: relative;
`;

const Menu = styled.ul`
  display: flex;
  flex-direction: column;
  font-family: yg-jalnan;
  list-style: none;
  padding: 0;
`;

const TeamBuildingMenu = styled.li`
  overflow: hidden;
  max-height: ${(props) => (props.visible ? "300px" : "0")};
  transition: max-height 0.3s ease;
  padding-left: 36px;
  font-family: yg-jalnan;
  font-size: 14px;
`;

const MenuItem = styled.li`
  display: flex;
  font-family: "yg-jalnan";
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  border-radius: 24px;
  cursor: pointer;
  background: ${(props) =>
    props.isLogout
      ? props.isSelected
        ? "#FFE6E6"
        : "transparent"
      : props.isSelected
      ? "#DCDAF5"
      : "transparent"};
  color: ${(props) =>
    props.isLogout ? "#FF6140" : props.isSelected ? "#1C1C1D" : "#675D6E"};
  font-weight: ${(props) => (props.isSelected ? "bold" : "normal")};
  text-decoration: none;
  transition: background 0.3s ease, color 0.3s ease;

  &:hover {
    background: ${(props) => (props.isLogout ? "#FFE6E6" : "#e7e0e3")};
    color: ${(props) => (props.isLogout ? "#FF6140" : "#1c1c1d")};
    font-weight: bold;
  }

  svg {
    font-size: 16px;
    line-height: 1;
  }
`;

const MenuItemWithArrow = styled(MenuItem)`
  justify-content: space-between;
`;

const ArrowIcon = styled.div`
  transition: transform 0.3s ease;
  display: flex;
  align-items: center;
  transform: ${(props) => (props.isOpen ? "rotate(180deg)" : "rotate(0deg)")};
`;

const FixedBottom = styled.div`
  margin-top: auto;
`;

const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 12px;
  padding: 12px 14px;
  border-radius: 24px;
  cursor: pointer;
  background: ${(props) => (props.isSelected ? "#FFE6E6" : "transparent")};
  color: #ff6140;
  font-family: "yg-jalnan";
  font-size: 16px;
  font-weight: ${(props) => (props.isSelected ? "bold" : "normal")};
  border: none;
  text-align: left;
  transition: background 0.3s ease, color 0.3s ease;

  &:hover {
    background: #ffe6e6;
    font-weight: bold;
  }

  svg {
    font-size: 16px;
  }
`;
