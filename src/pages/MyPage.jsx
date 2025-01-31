// MyPage.jsx
import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import {
  FaJsSquare,
  FaPython,
  FaJava,
  FaCode, // C++ / C#에 사용 (임의 아이콘)
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getCookie } from "../utils/Cookie";

import MyPosts from "../components/MyPosts";

function MyPage() {
  const navigate = useNavigate();

  // ---------------------------
  // 1) state: 서버에서 가져올/보여줄 데이터
  // ---------------------------
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [major, setMajor] = useState("");
  const [github, setGithub] = useState("");
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [fields, setFields] = useState([]);

  // ---------------------------
  // 2) 언어/분야 매핑 객체
  // ---------------------------
  // 2-1) 서버 → 프론트 (숫자 → 문자열)
  const languageMapping = {
    1: "python",
    2: "javascript",
    3: "java",
    4: "c++",
    5: "c#",
  };
  const departmentMapping = {
    1: "ai", // AI
    2: "frontend",
    3: "backend",
    4: "app", // 앱
    5: "game", // 게임
  };

  // 2-2) 프론트 → 서버 (문자열 → 숫자)
  const languageMappingReverse = {
    python: 1,
    javascript: 2,
    java: 3,
    "c++": 4,
    "c#": 5,
  };
  const departmentMappingReverse = {
    ai: 1,
    frontend: 2,
    backend: 3,
    app: 4,
    game: 5,
  };

  // ---------------------------
  // 3) 서버에서 GET으로 초기 데이터 불러오기
  // ---------------------------
  useEffect(() => {
    const token = getCookie("token");
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/mypage`, {
        headers: {
          Authorization: `Bearer ${token}`, // 토큰 추가
        },
      })
      .then((res) => {
        const data = res.data;
        console.log("GET mypage data:", data);

        // 예시 응답:
        // {
        //   "username": "tkdrud@naver.com",
        //   "major": "Computer Science",
        //   "github": "https://github.com/2025-kakaotrack-team-C/BE/pull/10",
        //   "language": [1,4],
        //   "department": [3,5]
        // }

        // (a) 기본 정보
        setName(data.nickname || "");
        setEmail(data.username || ""); // email이 따로 있을 경우
        setMajor(data.major || "비전공");
        setGithub(data.github || "");

        // (b) 언어 (숫자 ID 배열 → 문자열 배열)
        if (Array.isArray(data.language)) {
          const mappedLangs = data.language
            .map((numId) => languageMapping[numId])
            .filter(Boolean); // 매핑 안되는 값은 제외
          setSelectedLanguages(mappedLangs);
        }

        // (c) 분야 (숫자 ID 배열 → 문자열 배열)
        if (Array.isArray(data.department)) {
          const mappedDeps = data.department
            .map((numId) => departmentMapping[numId])
            .filter(Boolean);
          setFields(mappedDeps);
        }
      })
      .catch((err) => {
        console.error("마이페이지 데이터 불러오기 실패:", err);
      });
  }, []);

  // ---------------------------
  // 4) 수정 모드 (edit / save)
  // ---------------------------
  const [editing, setEditing] = useState(false);

  const handleEditToggle = () => {
    // "수정" → editing = true
    // "저장" → PATCH 후 editing = false
    if (editing) {
      handleSave(); // 저장 로직
    } else {
      setEditing(true);
    }
  };

  // ---------------------------
  // 5) PATCH 요청 (수정 사항 저장)
  // ---------------------------
  const handleSave = async () => {
    try {
      const token = getCookie("token");

      // (a) 문자열 배열 → 숫자 배열
      const languageIds = selectedLanguages
        .map((langStr) => languageMappingReverse[langStr]) // 언어 매핑
        .filter(Boolean);

      const departmentIds = fields
        .map((depStr) => departmentMappingReverse[depStr]) // 분야 매핑
        .filter(Boolean);

      // (b) 서버에 전송할 body
      const bodyData = {
        github, // 깃허브 URL
        major, // 전공
        language: languageIds, // 언어 ID 배열
        department: departmentIds, // 분야 ID 배열
      };

      console.log("PATCH bodyData:", bodyData);

      // (c) PATCH 요청
      await axios.patch(
        `${process.env.REACT_APP_API_URL}/api/mypage`,
        bodyData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // 토큰 추가
          },
        }
      );

      // (d) 성공 시
      setEditing(false);
      alert("수정사항이 저장되었습니다.");
      window.location.reload();
    } catch (error) {
      console.error("마이페이지 수정 실패:", error);
      alert("수정 중 오류가 발생했습니다.");
    }
  };

  // ---------------------------
  // 6) 체크박스 / 아이콘 토글
  // ---------------------------
  // 분야 체크박스 목록 (프론트에서 사용하는 문자열 ID와 라벨)
  const fieldOptions = [
    { id: "ai", label: "AI" },
    { id: "frontend", label: "프론트엔드" },
    { id: "backend", label: "백엔드" },
    { id: "app", label: "앱" },
    { id: "game", label: "게임" },
  ];

  const toggleField = (id) => {
    setFields((prev) =>
      prev.includes(id)
        ? prev.filter((fieldId) => fieldId !== id)
        : [...prev, id]
    );
  };

  // 언어 아이콘 목록 (프론트에서 사용하는 문자열 ID와 라벨)
  // *C++ / C# 은 FaCode 아이콘으로 임시 적용
  const languageOptions = [
    {
      id: "python",
      label: "Python",
      icon: <FaPython size={24} color="#3776ab" />,
    },
    {
      id: "javascript",
      label: "JavaScript",
      icon: <FaJsSquare size={24} color="#f7df1e" />,
    },
    {
      id: "java",
      label: "Java",
      icon: <FaJava size={24} color="#007396" />,
    },
    {
      id: "c++",
      label: "C++",
      icon: <FaCode size={24} />, // 원하는 아이콘으로 교체 가능
    },
    {
      id: "c#",
      label: "C#",
      icon: <FaCode size={24} />, // 원하는 아이콘으로 교체 가능
    },
  ];

  const toggleLanguage = (langId) => {
    setSelectedLanguages((prev) =>
      prev.includes(langId)
        ? prev.filter((id) => id !== langId)
        : [...prev, langId]
    );
  };

  // 상세 페이지 이동 함수
  const goToPostDetail = (postId) => {
    navigate(`/project/${postId}`);
  };

  return (
    <Container>
      {/* ----- 내 정보 섹션 ----- */}
      <Header>내 정보</Header>
      <InfoCard>
        <NameContainer>
          <NameWrapper>
            <Name>{name || "이름 없음"}</Name>
            {editing && <DeleteButton>탈퇴하기</DeleteButton>}
          </NameWrapper>
          <Email>{email}</Email>
        </NameContainer>

        {/* ----- 전공, 분야, 언어, 깃허브 ----- */}
        <InfoSection>
          <InfoRow>
            <InfoColumn>
              <InfoTitle>전공</InfoTitle>
              {editing ? (
                <Select
                  value={major}
                  onChange={(e) => setMajor(e.target.value)}
                >
                  <option value="비전공">비전공</option>
                  <option value="Computer Science">전공</option>
                </Select>
              ) : (
                <InfoContent>{major}</InfoContent>
              )}
            </InfoColumn>

            <InfoColumn>
              <InfoTitle>분야</InfoTitle>
              {editing ? (
                <CheckboxGroup>
                  {fieldOptions.map((fieldOpt) => (
                    <CheckboxLabel key={fieldOpt.id}>
                      <Checkbox
                        type="checkbox"
                        checked={fields.includes(fieldOpt.id)}
                        onChange={() => toggleField(fieldOpt.id)}
                      />
                      <span>{fieldOpt.label}</span>
                    </CheckboxLabel>
                  ))}
                </CheckboxGroup>
              ) : (
                <InfoContent>
                  {fields.length > 0
                    ? fields
                        .map((f) => {
                          const found = fieldOptions.find(
                            (opt) => opt.id === f
                          );
                          return found ? found.label : f;
                        })
                        .join(", ")
                    : "선택 없음"}
                </InfoContent>
              )}
            </InfoColumn>
          </InfoRow>

          <InfoRow>
            <InfoColumn>
              <InfoTitle>언어</InfoTitle>
              {editing ? (
                <LanguageContainer>
                  {languageOptions.map((lang) => (
                    <LanguageIcon
                      key={lang.id}
                      onClick={() => toggleLanguage(lang.id)}
                      selected={selectedLanguages.includes(lang.id)}
                    >
                      {lang.icon}
                      <IconLabel>{lang.label}</IconLabel>
                    </LanguageIcon>
                  ))}
                </LanguageContainer>
              ) : (
                <InfoContent>
                  {selectedLanguages.length > 0
                    ? selectedLanguages
                        .map((langId) => {
                          const found = languageOptions.find(
                            (opt) => opt.id === langId
                          );
                          return found ? found.label : langId;
                        })
                        .join(", ")
                    : "선택 없음"}
                </InfoContent>
              )}
            </InfoColumn>

            <InfoColumn>
              <InfoTitle>깃허브</InfoTitle>
              {editing ? (
                <Input
                  type="text"
                  value={github}
                  onChange={(e) => setGithub(e.target.value)}
                />
              ) : github ? (
                <InfoContent>
                  <a href={github} target="_blank" rel="noopener noreferrer">
                    {github}
                  </a>
                </InfoContent>
              ) : (
                <InfoContent>깃허브 없음</InfoContent>
              )}
            </InfoColumn>
          </InfoRow>
        </InfoSection>

        {/* ----- 수정/저장 버튼 ----- */}
        <EditButton onClick={handleEditToggle}>
          {editing ? "저장" : "수정"}
        </EditButton>
      </InfoCard>

      {/* ----- 내가 작성한 공고, 지원/진행 공고 ----- */}
      <MyPosts goToPostDetail={goToPostDetail} />
    </Container>
  );
}

export default MyPage;

/* =============================== */
/* styled-components 부분         */
/* =============================== */

/* (1) 공통 스타일 믹스인 */
const sameHeightStyle = css`
  height: 62.5px;
  line-height: 40px;
  border-radius: 24px;
  font-size: 16px;
`;

/* (2) 기본 레이아웃 */
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

const Header = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 16px;
  font-family: "yg-jalnan", sans-serif;
`;

const InfoCard = styled.div`
  background-color: #f8f1f6;
  border-radius: 16px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 24px;
`;

/* (3) 상단 이름/이메일 */
const NameContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #ddd;
  padding-bottom: 16px;
  margin-bottom: 16px;
`;

const NameWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const DeleteButton = styled.button`
  color: #ff6140;
  font-size: 16px;
  text-decoration: underline;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
`;

const Name = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 8px;
`;

const Email = styled.div`
  font-size: 14px;
  color: #4d4256;
`;

/* (4) 전공/분야/언어/깃허브 */
const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
  gap: 16px;
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 8px;
  }
`;

const InfoColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const InfoTitle = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #1c1c1d;
  margin-bottom: 8px;
`;

const InfoContent = styled.div`
  font-size: 16px;
`;

/* (5) 수정/저장 버튼 */
const EditButton = styled.button`
  width: 122px;
  height: 56px;
  background-color: #dcdaf5;
  color: #21005d;
  font-size: 20px;
  border-radius: 24px;
  padding: 16px 24px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  align-self: flex-end;
  &:hover {
    background-color: #21005d;
    color: #dcdaf5;
  }
`;

/* (6) Select/Input 공통 스타일 */
const Select = styled.select`
  ${sameHeightStyle}
  padding: 0 12px;
  border: 1px solid #ccc;
`;

const Input = styled.input`
  ${sameHeightStyle}
  padding: 0 12px;
  border: 1px solid #ccc;
`;

/* (7) 체크박스 */
const CheckboxGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const CheckboxLabel = styled.label`
  ${sameHeightStyle}
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 0 12px;
  border: 1px solid #ccc;
  cursor: pointer;
`;

const Checkbox = styled.input`
  accent-color: #7a5fef;
  width: 20px;
  height: 20px;
`;

/* (8) 언어 아이콘 */
const LanguageContainer = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 8px;
  @media (max-width: 768px) {
    flex-wrap: wrap;
    gap: 8px;
  }
`;

const LanguageIcon = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  border: 2px solid ${({ selected }) => (selected ? "#7a5fef" : "#ccc")};
  border-radius: 8px;
  padding: 8px;
  min-width: 60px;
  text-align: center;
  &:hover {
    border-color: #7a5fef;
  }
`;

const IconLabel = styled.span`
  margin-top: 4px;
  font-size: 12px;
`;
