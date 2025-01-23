import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";

const Container = styled.div`
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
  font-family: "yg-Jalnan";
  font-size: 1.5vw;
  margin-top: 2vh;
  margin-left: 2vw;
`;

const Subtitle = styled.div`
  font-family: "yg-Jalnan";
  font-size: 1.2vw;
  margin-top: 5vh;
  margin-left: 2vw;
`;

const Divider = styled.hr`
  height: 0.2vh;
  background-color: #000000;
  margin-top: 3vh;
`;

const BoxContainer = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  margin-top: 3vh;
`;

const Box = styled.div`
  width: 65vw;
  height: 20vh;
  margin-top: 4vh;
  border-radius: 24px;
  border: none;

  background-color: ${(props) => {
    if (props.status === 1) return "#F8F1F6"; // 대기중 - 연한 분홍색
    if (props.status === 2) return "#E8F5E9"; // 수락됨 - 연한 초록색
    if (props.status === 3) return "#FFEBEE"; // 거절됨 - 연한 빨간색
    return "#F8F1F6";
  }};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2vw;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  }
`;

const UserPicture = styled.div`
  width: 128px;
  height: 128px;
  background-color: #4caf50;
  border-radius: 50%;
`;

const Contents = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 88%;
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 46px;
`;

const UserName = styled.div`
  display: flex;
  align-items: center;
  font-family: "Pretendard-Regular";
  font-size: 1.8vw;
`;

const UseProfile = styled.div`
  white-space: pre-line;
  font-family: "Pretendard-Regular";
  font-size: 1.3vw;
  margin-top: 2vh;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BoxButton = styled.button`
  width: 12vw;
  height: 5.5vh;
  margin: 0.8vw;
  border-radius: 24px;
  font-size: 1.3vw;
  font-weight: bolder;
  background-color: ${(props) => props.ButtonColor};
  color: ${(props) => props.TextColor};
  border: none;

  &:hover {
    cursor: pointer;
  }

  &:active {
    background-color: ${(props) => props.TextColor};
    color: ${(props) => props.ButtonColor};
  }
`;

const CloseButton = styled.button`
  width: 12vw;
  height: 5.5vh;
  border-radius: 24px;
  font-size: 1.3vw;
  font-weight: bolder;
  background-color: #f2ecee;
  color: #787579;
  margin-top: 7vh;
  border: none;

  &:hover {
    cursor: pointer;
  }

  &:active {
    background-color: #787579;
    color: #f2ecee;
  }
`;

const ApplyStatus = () => {
  const [applications, setApplications] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams(); // URL에서 projectId 추출

  const reversedDepartmentMapping = {
    1: "ai",
    2: "frontend",
    3: "backend",
    4: "app",
    5: "game",
  };

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/applications`
        );
        // projectId와 일치하는 항목만 필터링
        const filteredApps = response.data.filter(
          (app) => String(app.project.projectId) === String(id)
        );

        setApplications(filteredApps);
      } catch (error) {
        console.error("데이터 불러오기 실패:", error);
      }
    };
    fetchApplications();
  }, [id]);

  const pendingApps = applications.filter((app) => app.status === 1);
  const acceptedApps = applications.filter((app) => app.status === 2);
  const rejectedApps = applications.filter((app) => app.status === 3);

  const handleAccept = async (applicationId) => {
    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/api/applications/${applicationId}/accept`
      );
      setApplications((prev) =>
        prev.map((app) =>
          app.applicationId === applicationId ? { ...app, status: 2 } : app
        )
      );
    } catch (error) {
      console.error("수락 처리 실패:", error);
    }
  };

  const handleReject = async (applicationId) => {
    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/api/applications/${applicationId}/reject`
      );
      setApplications((prev) =>
        prev.map((app) =>
          app.applicationId === applicationId ? { ...app, status: 3 } : app
        )
      );
    } catch (error) {
      console.error("거절 처리 실패:", error);
    }
  };

  const handleClose = () => {
    navigate(-1);
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 1:
        return "대기중";
      case 2:
        return "수락됨";
      case 3:
        return "거절됨";
      default:
        return "상태 정보 없음";
    }
  };

  const renderApplicationBoxes = (apps) => {
    return apps.map((app) => (
      <Box key={app.applicationId} status={app.status}>
        <UserPicture />
        <Contents>
          <TextBox>
            <UserName>{app.member?.username || "이름 정보 없음"}</UserName>
            <UseProfile>
              전공(부서):{" "}
              {reversedDepartmentMapping[app.department] || "부서 정보 없음"}
              <br />
              현재 상태: {getStatusLabel(app.status)}
            </UseProfile>
          </TextBox>
          {app.status === 1 && (
            <ButtonContainer>
              <BoxButton
                ButtonColor="#DCDAF5"
                TextColor="#21005D"
                onClick={() => handleAccept(app.applicationId)}
              >
                수락
              </BoxButton>
              <BoxButton
                ButtonColor="#F2ECEE"
                TextColor="#787579"
                onClick={() => handleReject(app.applicationId)}
              >
                거절
              </BoxButton>
            </ButtonContainer>
          )}
        </Contents>
      </Box>
    ));
  };

  return (
    <Container>
      <Title>지원 현황 ({applications.length}명)</Title>
      <Divider />

      <Subtitle>대기중 ({pendingApps.length}명)</Subtitle>
      <BoxContainer>{renderApplicationBoxes(pendingApps)}</BoxContainer>

      <Subtitle>수락됨 ({acceptedApps.length}명)</Subtitle>
      <BoxContainer>{renderApplicationBoxes(acceptedApps)}</BoxContainer>

      <Subtitle>거절됨 ({rejectedApps.length}명)</Subtitle>
      <BoxContainer>{renderApplicationBoxes(rejectedApps)}</BoxContainer>

      <ButtonContainer>
        <CloseButton onClick={handleClose}>닫기</CloseButton>
      </ButtonContainer>
    </Container>
  );
};

export default ApplyStatus;
