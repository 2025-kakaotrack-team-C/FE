import React, { useState } from "react";
import styled, { css } from "styled-components";
// 예시 아이콘
import {
  FaJsSquare,
  FaPython,
  FaJava,
  FaReact,
  FaChevronLeft,
  FaChevronRight,
  FaFilter,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function MyPage() {
  const navigate = useNavigate();

  // 1) 이름, 이메일
  const name = "홍길동";
  const email = "sdlkjdfjd@naver.com";

  // 2) 전공, 분야, 깃허브
  const [major, setMajor] = useState("비전공");
  const [fields, setFields] = useState([]);
  const [github, setGithub] = useState("https://github.com/username");

  const fieldOptions = [
    { id: "nonMajor", label: "비전공" },
    { id: "frontend", label: "프론트엔드" },
    { id: "backend", label: "백엔드" },
    { id: "fullstack", label: "풀스택" },
    { id: "etc", label: "기타" },
  ];
  const toggleField = (id) => {
    setFields((prevFields) => {
      if (prevFields.includes(id)) {
        return prevFields.filter((fieldId) => fieldId !== id);
      }
      return [...prevFields, id];
    });
  };

  // 3) 언어 여러 개 선택
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const languageOptions = [
    {
      id: "javascript",
      label: "JavaScript",
      icon: <FaJsSquare size={24} color="#f7df1e" />,
    },
    {
      id: "python",
      label: "Python",
      icon: <FaPython size={24} color="#3776ab" />,
    },
    {
      id: "java",
      label: "Java",
      icon: <FaJava size={24} color="#007396" />,
    },
    {
      id: "react",
      label: "React",
      icon: <FaReact size={24} color="#61dafb" />,
    },
  ];
  const toggleLanguage = (langId) => {
    setSelectedLanguages((prev) => {
      if (prev.includes(langId)) {
        return prev.filter((id) => id !== langId);
      }
      return [...prev, langId];
    });
  };

  // 수정 모드
  const [editing, setEditing] = useState(false);
  const handleEditToggle = () => setEditing((prev) => !prev);

  // ===============================
  // (기존) 내가 쓴 공고 데이터
  // ===============================
  const myPosts = [
    { id: 1, fields: ["백엔드", "프론트"], title: "웹개발 하실?" },
    { id: 2, fields: ["백엔드", "프론트"], title: "웹개발 하실?" },
    { id: 3, fields: ["백엔드", "프론트"], title: "웹개발 하실?" },
    { id: 4, fields: ["백엔드", "프론트"], title: "웹개발 하실?" },
  ];

  // ===============================
  // 새롭게 추가할 데이터 예시
  // ===============================
  const appliedPosts = [
    { id: 11, fields: ["백엔드"], title: "지원한 백엔드 공고" },
    { id: 12, fields: ["프론트"], title: "지원한 프론트엔드 공고" },
  ];

  const myProjects = [
    { id: 21, fields: ["백엔드"], title: "이전에 완료한 백엔드 프로젝트" },
    {
      id: 22,
      fields: ["프론트", "백엔드"],
      title: "이전에 완료한 풀스택 프로젝트",
    },
  ];

  const ongoingProjects = [
    { id: 31, fields: ["프론트"], title: "지금 진행 중인 프론트 프로젝트" },
  ];

  const goToPostDetail = (postId) => {
    navigate(`/post/${postId}`);
  };

  /* 
    ===============================
    슬라이더 관련 상태 & 로직
    ===============================
  */
  // 현재 슬라이드 인덱스
  const [currentSlide, setCurrentSlide] = useState(0);

  // 화면에 한 번에 보일 카드(박스) 개수
  const VISIBLE_CARDS = 3;

  // 다음 슬라이드
  const handleNext = () => {
    // 슬라이드 할 수 있는 마지막 인덱스 = (총개수 - VISIBLE_CARDS)
    if (currentSlide < getFilteredData().length - VISIBLE_CARDS) {
      setCurrentSlide((prev) => prev + 1);
    }
  };

  // 이전 슬라이드
  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1);
    }
  };

  // ===============================
  // (새로 추가) 필터 상태 & 함수
  // ===============================
  const [filter, setFilter] = useState("myPosts"); // 기본값: 내가 쓴 공고
  const [showFilterMenu, setShowFilterMenu] = useState(false); // 메뉴 표시 여부

  // 필터 메뉴 열기/닫기
  const handleFilterMenuToggle = () => {
    setShowFilterMenu((prev) => !prev);
  };

  // 필터 항목 선택 시
  const handleFilterSelect = (selectedFilter) => {
    setFilter(selectedFilter);
    setShowFilterMenu(false);
    setCurrentSlide(0); // 필터가 바뀔 때마다 슬라이드를 처음으로 초기화
  };

  // 현재 선택된 필터 상태에 따라 데이터를 리턴
  const getFilteredData = () => {
    if (filter === "appliedPosts") return appliedPosts;
    if (filter === "myProjects") return myProjects;
    if (filter === "ongoingProjects") return ongoingProjects;
    return myPosts; // 기본값: 내가 쓴 공고
  };

  // 현재 필터 상태에 따라 헤더 문구 변경 (옵션)
  const getHeaderTitle = () => {
    switch (filter) {
      case "appliedPosts":
        return "내가 지원한 공고";
      case "myProjects":
        return "내가 한 프로젝트";
      case "ongoingProjects":
        return "내가 진행 중인 프로젝트";
      case "myPosts":
      default:
        return "내가 쓴 공고";
    }
  };

  return (
    <Container>
      {/* ----- 내 정보 섹션 ----- */}
      <Header>내 정보</Header>
      <InfoCard>
        <NameContainer>
          <Name>{name}</Name>
          <Email>{email}</Email>
        </NameContainer>

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
                  <option value="컴퓨터공학">컴퓨터공학</option>
                  <option value="전자공학">전자공학</option>
                  <option value="기타 이공계">기타 이공계</option>
                  <option value="인문/사회/예체능">인문/사회/예체능</option>
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
              ) : (
                <InfoContent>{github}</InfoContent>
              )}
            </InfoColumn>
          </InfoRow>
        </InfoSection>
        <EditButton onClick={handleEditToggle}>
          {editing ? "저장" : "수정"}
        </EditButton>
      </InfoCard>

      {/* ================================
        내가 쓴 공고 + 필터 아이콘 영역
      ================================ */}
      <HeaderWrapper>
        <Header>{getHeaderTitle()}</Header>
        <FilterIcon onClick={handleFilterMenuToggle}>
          <FaFilter />
        </FilterIcon>

        {/* 필터 메뉴 (드롭다운) */}
        {showFilterMenu && (
          <FilterMenu>
            <FilterMenuItem onClick={() => handleFilterSelect("myPosts")}>
              내가 쓴 공고
            </FilterMenuItem>
            <FilterMenuItem onClick={() => handleFilterSelect("appliedPosts")}>
              내가 지원한 공고
            </FilterMenuItem>
            <FilterMenuItem onClick={() => handleFilterSelect("myProjects")}>
              내가 한 프로젝트
            </FilterMenuItem>
            <FilterMenuItem
              onClick={() => handleFilterSelect("ongoingProjects")}
            >
              내가 진행 중인 프로젝트
            </FilterMenuItem>
          </FilterMenu>
        )}
      </HeaderWrapper>

      {/* ----- 슬라이더 ----- */}
      <InfoCard>
        <SliderWrapper>
          <SliderButton onClick={handlePrev}>
            <FaChevronLeft />
          </SliderButton>

          <SliderTrack currentSlide={currentSlide}>
            {/* 필터 상태에 따라 반환된 데이터로 카드 렌더링 */}
            {getFilteredData().map((post) => (
              <PostCard key={post.id} onClick={() => goToPostDetail(post.id)}>
                <FieldContainer>
                  {post.fields.map((field) => (
                    <FieldChip key={field} field={field}>
                      {field}
                    </FieldChip>
                  ))}
                </FieldContainer>
                <PostTitle>{post.title}</PostTitle>
              </PostCard>
            ))}
          </SliderTrack>

          <SliderButton onClick={handleNext}>
            <FaChevronRight />
          </SliderButton>
        </SliderWrapper>
      </InfoCard>
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
  line-height: 40px; /* 세로 가운데 정렬을 위한 line-height */
  border-radius: 24px;
  font-size: 16px;
`;

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

  @media (max-width: 768px) {
    padding: 16px;
  }

  @media (max-width: 480px) {
    padding: 12px;
  }
`;
/* 
  (기존) Header를 감싸는 Wrapper를 추가하여
  필터 아이콘을 Header 우측에 배치하기 위한 스타일 설정
*/
const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;

  @media (max-width: 768px) {
    align-items: center;
  }

  @media (max-width: 480px) {
    align-items: center;
  }
`;

const Header = styled.h2`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 16px;
  font-family: "yg-jalnan", sans-serif;

  @media (max-width: 768px) {
    font-size: 24px;
  }

  @media (max-width: 480px) {
    font-size: 20px;
  }
`;

const FilterIcon = styled.div`
  font-size: 20px;
  margin-left: 8px;
  cursor: pointer;
  color: #7a5fef;
  &:hover {
    color: #5f4fcf;
  }
`;

/* 필터 메뉴 (드롭다운) */
const FilterMenu = styled.div`
  position: absolute;
  top: 50%;
  /* left: 0; */
  right: 0;
  margin-top: 8px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 8px;
  z-index: 10;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  overflow: hidden;
`;

const FilterMenuItem = styled.div`
  padding: 12px 16px;
  font-size: 14px;
  color: #1c1c1d;
  cursor: pointer;

  &:hover {
    background-color: #f2f2f2;
  }
`;

const InfoCard = styled.div`
  background-color: #f8f1f6;
  border-radius: 16px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 24px;

  @media (max-width: 768px) {
    padding: 16px;
  }

  @media (max-width: 480px) {
    padding: 12px;
  }
`;

const NameContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #ddd;
  padding-bottom: 16px;
  margin-bottom: 16px;
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

  @media (max-width: 480px) {
    gap: 4px;
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

const EditButton = styled.button`
  background-color: #eee7ff;
  border: none;
  border-radius: 8px;
  color: #7a5fef;
  font-size: 14px;
  font-weight: bold;
  padding: 10px 20px;
  cursor: pointer;
  align-self: flex-end;
  &:hover {
    background-color: #d8cfff;
  }
`;

/* (2) Select와 Input에 sameHeightStyle 적용 */
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

/* (3) 체크박스 */
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

/* (4) 언어 아이콘 */
const LanguageContainer = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 8px;

  @media (max-width: 768px) {
    flex-wrap: wrap;
    gap: 8px;
  }

  @media (max-width: 480px) {
    gap: 4px;
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

/* =============================== */
/* (5) 내가 쓴 공고 (슬라이더)   */
/* =============================== */
const SliderWrapper = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
`;

const SliderTrack = styled.div`
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  transform: translateX(${({ currentSlide }) => `-${currentSlide * 100}%`});
  transition: transform 0.3s ease;

  @media (max-width: 768px) {
    gap: 16px;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }

  @media (max-width: 480px) {
    gap: 8px;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
`;

const SliderButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 24px;
  /* background-color: rgba(255, 255, 255, 0.7); */
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  z-index: 2;

  &:first-of-type {
    left: 16px;
  }

  &:last-of-type {
    right: 16px;
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.9);
  }
`;

const PostCard = styled.div`
  flex: 0 0 auto;
  width: 250px;
  height: 250px;
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 16px;
  cursor: pointer;

  &:hover {
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    width: calc(100% - 32px);
    margin: 0 auto;
  }

  @media (max-width: 480px) {
    width: calc(100% - 16px);
    margin: 8px auto;
  }
`;

const FieldContainer = styled.div`
  justify-content: flex-end;
  display: flex;
  gap: 8px;
  margin-bottom: 12px;

  @media (max-width: 768px) {
    justify-content: center;
    flex-wrap: wrap;
  }

  @media (max-width: 480px) {
    gap: 4px;
    justify-content: flex-start;
  }
`;

const FieldChip = styled.div`
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;

  /* 간단히 필드명에 따라 색상 다르게 예시 */
  background-color: ${({ field }) =>
    field === "백엔드"
      ? "#39D372" // 녹색
      : field === "프론트"
      ? "#FFE28C" // 노란색
      : "#ccc"};
  color: #1c1c1d;
`;

const PostTitle = styled.div`
  font-size: 24px;
  font-weight: bold;
`;
