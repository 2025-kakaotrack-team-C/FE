// MyPostsSection.jsx
import React, { useState } from "react";
import styled from "styled-components";
import { FaChevronLeft, FaChevronRight, FaFilter } from "react-icons/fa";

function MyPostsSection({
  myPosts,
  appliedPosts,
  myProjects,
  ongoingProjects,
  goToPostDetail,
}) {
  // ===============================
  // 슬라이더 관련 상태 & 로직
  // ===============================
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
  // 필터 상태 & 함수
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
    <div>
      {/* 필터 헤더 영역 */}
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

      {/* 슬라이더 영역 */}
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
    </div>
  );
}

export default MyPostsSection;

/* =============================== */
/* styled-components 부분         */
/* =============================== */

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
`;

const Header = styled.h2`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 16px;
  font-family: "yg-jalnan", sans-serif;
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

const FilterMenu = styled.div`
  position: absolute;
  top: 50%;
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
`;

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
`;

const SliderButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 24px;
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
`;

const FieldContainer = styled.div`
  justify-content: flex-end;
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
`;

const FieldChip = styled.div`
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;

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
