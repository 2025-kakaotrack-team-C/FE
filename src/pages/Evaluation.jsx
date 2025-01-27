import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FaStar } from "react-icons/fa";
import axios from "axios";
import { getCookie } from "../utils/Cookie";
import { useNavigate, useParams } from "react-router-dom";
import SideBarPicture from "../components/SideBarPicture";

function Evaluation() {
  const { id } = useParams();
  const [userId, setUserId] = useState("");
  const [userNickname, setUserNickname] = useState("");
  const [memberData, setMemberData] = useState([]); // 팀원 데이터 상태
  const [ratings, setRatings] = useState({}); // 각 팀원에 대한 평가 점수
  const navigate = useNavigate();
  // 매핑 객체 정의
  const departmentMap = {
    1: "ai",
    2: "프론트",
    3: "백엔드",
    4: "게임",
    5: "게임",
    // 추가 부서...
  };

  const languageMap = {
    1: "python",
    2: "javascript",
    3: "java",
    4: "c++",
    5: "c#",
  };

  const handleStarClick = (userId, value) => {
    console.log(`Clicked: UserID=${userId}, Rating=${value}`);
    setRatings((prevRatings) => ({
      ...prevRatings,
      [userId]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!userId) {
      console.error("사용자 ID가 없습니다.");
      return;
    }

    // 모든 팀원이 동일한 프로젝트에 속한다고 가정하고, 첫 번째 팀원으로부터 projectId 추출
    const projectId = memberData.length > 0 ? memberData[0].projectId : null;

    if (!projectId) {
      console.error("프로젝트 ID를 찾을 수 없습니다.");
      return;
    }

    // 리뷰 배열 구성
    const reviews = memberData
      .filter((member) => ratings[member.userId]) // 평가된 팀원만 포함
      .map((member) => ({
        projectId: projectId,
        reviewerId: userId,
        revieweeId: member.userId,
        rating: ratings[member.userId],
        reviewerNickname: userNickname,
      }));

    try {
      const token = getCookie("token");
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/reviews`,
        reviews,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("리뷰가 성공적으로 제출되었습니다.");
      navigate(`/completed-project/${id}`);

      // setRatings({});
      // 사용자에게 성공 메시지 제공 (옵션)
      alert("리뷰가 성공적으로 제출되었습니다.");
    } catch (error) {
      console.error("리뷰 제출 중 오류 발생:", error);
      // 사용자에게 오류 메시지 제공 (옵션)
      alert("리뷰 제출에 실패했습니다. 다시 시도해주세요.");
    }
  };

  useEffect(() => {
    const token = getCookie("token");

    const fetchData = async () => {
      try {
        // 현재 사용자 정보 가져오기
        const userResponse = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/mypage`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUserId(userResponse.data.id);
        setUserNickname(userResponse.data.nickname);

        // 팀원 데이터 가져오기
        const memberResponse = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/reviews/project/member/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMemberData(memberResponse.data);
        console.log("팀원 데이터:", memberResponse.data);
      } catch (error) {
        console.error("데이터를 가져오는 중 에러 발생:", error);
      }
    };

    fetchData();
  }, [id]);

  // 현재 사용자를 제외한 팀원 목록 필터링
  const filteredMembers = memberData.filter(
    (member) => member.userId !== userId
  );

  // 필터링된 팀원 데이터 확인
  console.log("Filtered Members:", filteredMembers);

  return (
    <Container>
      <Title>
        <Header>팀원 평가하기</Header>
      </Title>
      {filteredMembers.map((member) => (
        <MemberContainer key={member.userId}>
          {console.log(
            `Rendering member ${member.userId} with rating ${member.rating}`
          )}
          <ProfileSection>
            <SideBarPicture rating={member.rating} />
            <ProfileDetails>
              <Name>{member.nickname}</Name>
              <Major>
                전공: {departmentMap[member.department] || "선택 안함"}
              </Major>
              <Language>
                언어: {languageMap[member.language] || "선택 안함"}
              </Language>
            </ProfileDetails>
          </ProfileSection>
          <EvaluationSection>
            <Word>이 팀원의 전체적인 평가는?</Word>
            <StarContainer>
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  filled={star <= (ratings[member.userId] || 0)}
                  onClick={() => handleStarClick(member.userId, star)}
                  aria-label={`${star} 별`}
                >
                  <FaStar />
                </Star>
              ))}
            </StarContainer>
          </EvaluationSection>
        </MemberContainer>
      ))}
      <StBtn>
        <StButton onClick={handleSubmit}>제출하기</StButton>
      </StBtn>
    </Container>
  );
}

export default Evaluation;

// Styled Components는 변경되지 않았습니다
const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 24px;
  margin: 0 auto;
  max-width: 1440px;
  /* position: relative; */

  @media (max-width: 768px) {
    padding: 16px;
  }

  @media (max-width: 480px) {
    padding: 12px;
  }
`;

const MemberContainer = styled.div`
  margin-bottom: 40px;
`;

const Header = styled.h1`
  font-size: 45px;
  font-family: "yg-jalnan", sans-serif;
  color: #1c1c1d;
  margin: 0;
  margin-bottom: 24px;

  @media (max-width: 768px) {
    font-size: 28px;
  }

  @media (max-width: 480px) {
    font-size: 24px;
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

const ProfileSection = styled.section`
  display: flex;
  align-items: center;
  margin-bottom: 40px;
  padding: 48px;
  border: 1px solid #e8e0e8;
  border-radius: 24px;
  background-color: #f8f1f6;
`;

const ProfileDetails = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 49px;
`;

const Name = styled.div`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 24px;

  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

const Major = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 16px;

  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

const Language = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 16px;

  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

const Picture = styled.figure`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 60px;
  width: 144px;
  height: 120px;
  background-color: #f8f1f6;
  border: 1px solid black;
  border-radius: 50%;
`;

const EvaluationSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Word = styled.p`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 40px;
  text-align: center;
`;

const StarContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
  justify-content: center;
`;

const Star = styled.div`
  font-size: 75px;
  cursor: pointer;
  color: ${(props) => (props.filled ? "#FFE208" : "#D9D9D9")};

  &:hover {
    transform: scale(1.2);
  }
`;

const StButton = styled.button`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background-color: #dcdaf5;
  color: #21005d;
  font-size: 20px;
  border: none; /* 기본 테두리 제거 */
  border-radius: 24px;
  padding: 16px 24px;
  cursor: pointer;
  z-index: 10; /* 필요시 조정 */

  transition: background-color 0.3s, color 0.3s, transform 0.2s;
  &:hover {
    background-color: #21005d;
    color: #dcdaf5;
  }

  @media (max-width: 480px) {
    font-size: 16px;
    padding: 12px 20px;
  }
`;

const StBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;
