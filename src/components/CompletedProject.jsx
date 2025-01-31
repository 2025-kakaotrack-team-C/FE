import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { getCookie } from "../utils/Cookie";
import SideBarPicture from "../components/SideBarPicture";

function CompletedProject() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [projectData, setProjectData] = useState(null);
  const [teamMembers, setTeamMembers] = useState([]);

  const departmentMap = {
    1: "AI",
    2: "프론트엔드",
    3: "백엔드",
    4: "게임",
    5: "기타",
  };

  const languageMap = {
    1: "Python",
    2: "JavaScript",
    3: "Java",
    4: "C++",
    5: "C#",
  };

  useEffect(() => {
    const token = getCookie("token");

    const fetchData = async () => {
      try {
        // 프로젝트 상세 정보 가져오기
        const responseProject = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/projects/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProjectData(responseProject.data);

        // 팀원 정보 가져오기
        const responseMembers = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/reviews/project/member/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTeamMembers(responseMembers.data);
      } catch (error) {
        console.error("프로젝트/팀원 데이터 가져오기 오류:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <Container>
      <Content>
        {projectData && (
          <>
            <Title>프로젝트: {projectData.title}</Title>
            <Description>프로젝트 내용: {projectData.description}</Description>
          </>
        )}

        <MembersContainer>
          <MembersTitle>팀원 소개</MembersTitle>
          {teamMembers.map((member) => (
            <MemberCard key={member.userId}>
              <ProfileWrapper>
                <SideBarPicture rating={member.rating} />
              </ProfileWrapper>
              <InfoWrapper>
                <Nickname>{member.nickname}</Nickname>
                <Department>
                  전공: {departmentMap[member.department] || "선택 안함"}
                </Department>
                <Language>
                  언어: {languageMap[member.language] || "선택 안함"}
                </Language>
                {/* {member.rating && (
                  <Rating>최종 평점: {member.rating} / 5</Rating>
                )} */}
              </InfoWrapper>
            </MemberCard>
          ))}
        </MembersContainer>

        <Button onClick={handleGoHome}>메인 페이지로 가기</Button>
      </Content>
    </Container>
  );
}

export default CompletedProject;

// ================== Styled Components ==================
const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 24px;
  margin: 0 auto;
  max-width: 1440px;
  background-color: #f8f1f6;
`;

const Content = styled.div`
  background-color: #ffffff;
  border: 1px solid #e8e0e8;
  border-radius: 24px;
  padding: 48px;
  margin: 0 auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  /* 프로젝트 정보 왼쪽 정렬 */
  align-items: flex-start;
`;

const Title = styled.h1`
  font-size: 36px;
  font-family: "yg-jalnan", sans-serif;
  color: #1c1c1d;
  margin-bottom: 16px;
  text-align: left; /* 왼쪽 정렬 */
  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

const Description = styled.p`
  font-size: 20px;
  color: #1c1c1d;
  margin-bottom: 32px;
  line-height: 1.5;
  text-align: left; /* 왼쪽 정렬 */
  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const MembersContainer = styled.div`
  width: 100%;
  margin-bottom: 32px;
`;

const MembersTitle = styled.h2`
  font-size: 28px;
  margin-bottom: 24px;
  font-weight: bold;
`;

const MemberCard = styled.div`
  display: flex;
  align-items: center;
  padding: 24px;
  margin-bottom: 16px;
  border: 1px solid #e8e0e8;
  border-radius: 16px;
  background-color: #f8f1f6;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 12px;
  }
`;

const ProfileWrapper = styled.div`
  margin-right: 24px;
  @media (max-width: 768px) {
    margin-right: 0;
  }
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Nickname = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 8px;
`;

const Department = styled.div`
  font-size: 18px;
  margin-bottom: 4px;
`;

const Language = styled.div`
  font-size: 18px;
  margin-bottom: 4px;
`;

const Rating = styled.div`
  font-size: 18px;
  margin-top: 4px;
  font-weight: 600;
  color: #ff9900;
`;

const Button = styled.button`
  /* 버튼만 중앙 정렬 */
  align-self: center; /* flex 컨테이너에서 개별 요소 중앙 배치 */

  background-color: #dcdaf5;
  color: #21005d;
  font-size: 18px;
  border: none;
  border-radius: 24px;
  padding: 16px 24px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s, transform 0.2s;

  &:hover {
    background-color: #21005d;
    color: #dcdaf5;
    transform: scale(1.05);
  }
`;
