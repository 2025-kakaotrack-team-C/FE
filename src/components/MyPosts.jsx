// MyPostsSection.jsx

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FaChevronLeft, FaChevronRight, FaFilter } from "react-icons/fa";
import { getCookie } from "../utils/Cookie";
import axios from "axios";

function MyPostsSection({ goToPostDetail }) {
  const [data, setData] = useState({
    writtenProjects: [],
    appliedProjects: [],
    completedProjects: [],
    ongoingProjects: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ===============================
  // \*Added: department mapping
  // ===============================
  const departmentMap = {
    1: "ai",
    2: "프론트",
    3: "백엔드",
    4: "앱",
    5: "게임",
  };

  function getDepartmentName(deptCode) {
    return departmentMap[deptCode] || "기타";
  }

  // ===============================
  // 데이터 가져오기
  // ===============================
  useEffect(() => {
    const fetchData = async () => {
      const token = getCookie("token");
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/mypage`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setData({
          writtenProjects: response.data.writtenProjects || [],
          appliedProjects: response.data.appliedProjects || [],
          completedProjects: response.data.completedProjects || [],
          ongoingProjects: response.data.ongoingProjects || [],
        });
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch data:", err);
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ===============================
  // 슬라이더 관련 상태 & 로직
  // ===============================
  const [currentSlide, setCurrentSlide] = useState(0);
  const VISIBLE_CARDS = 3;

  const handleNext = () => {
    if (currentSlide < getFilteredData().length - VISIBLE_CARDS) {
      setCurrentSlide((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1);
    }
  };

  // ===============================
  // 필터 상태 & 함수
  // ===============================
  const [filter, setFilter] = useState("writtenProjects");
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  const handleFilterMenuToggle = () => {
    setShowFilterMenu((prev) => !prev);
  };

  const handleFilterSelect = (selectedFilter) => {
    setFilter(selectedFilter);
    setShowFilterMenu(false);
    setCurrentSlide(0);
  };

  const getFilteredData = () => {
    if (filter === "appliedProjects") return data.appliedProjects;
    if (filter === "completedProjects") return data.completedProjects;
    if (filter === "ongoingProjects") return data.ongoingProjects;
    return data.writtenProjects;
  };

  const getHeaderTitle = () => {
    switch (filter) {
      case "appliedProjects":
        return "내가 지원한 공고";
      case "completedProjects":
        return "완료된 프로젝트";
      case "ongoingProjects":
        return "진행 중인 프로젝트";
      case "writtenProjects":
      default:
        return "내가 쓴 공고";
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading data: {error.message}</div>;

  return (
    <div>
      {/* 필터 헤더 */}
      <HeaderWrapper>
        <Header>{getHeaderTitle()}</Header>
        <FilterIcon onClick={handleFilterMenuToggle}>
          <FaFilter />
        </FilterIcon>
        {showFilterMenu && (
          <FilterMenu>
            <FilterMenuItem
              onClick={() => handleFilterSelect("writtenProjects")}
            >
              내가 쓴 공고
            </FilterMenuItem>
            <FilterMenuItem
              onClick={() => handleFilterSelect("appliedProjects")}
            >
              내가 지원한 공고
            </FilterMenuItem>
            <FilterMenuItem
              onClick={() => handleFilterSelect("completedProjects")}
            >
              완료된 프로젝트
            </FilterMenuItem>
            <FilterMenuItem
              onClick={() => handleFilterSelect("ongoingProjects")}
            >
              진행 중인 프로젝트
            </FilterMenuItem>
          </FilterMenu>
        )}
      </HeaderWrapper>

      {/* 슬라이더 */}
      <InfoCard>
        <SliderWrapper>
          <SliderButton onClick={handlePrev}>
            <FaChevronLeft />
          </SliderButton>
          <SliderTrack currentSlide={currentSlide}>
            {getFilteredData().map((post) => {
              // \*Added: get the department name for each post
              const deptName = getDepartmentName(post.department);

              return (
                <PostCard
                  key={post.projectId}
                  onClick={() => goToPostDetail(post.projectId)}
                >
                  <FieldContainer>
                    <FieldChip field={deptName}>{deptName}</FieldChip>
                  </FieldContainer>
                  {/* <p>마감일: {post.deadline}</p>
                  <p>난이도: {post.difficult}</p> */}
                  <PostTitle>{post.title}</PostTitle>
                </PostCard>
              );
            })}
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
  margin-bottom: 16px;
`;

const Header = styled.h2`
  font-size: 24px;
  font-weight: bold;
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

const FilterMenu = styled.div`
  position: absolute;
  top: 100%;
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
  /* height: 300px; */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 24px;

  @media (max-width: 768px) {
    padding: 16px;
  }

  @media (max-width: 480px) {
    padding: 12px;
  }
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
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  z-index: 2;
  background-color: rgba(255, 255, 255, 0.75);

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
    transition: all 0.3s ease-in-out;
    background-color: #dcdaf5;
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
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
  justify-content: flex-end; /* 모든 화면 크기에서 오른쪽 정렬 */
`;

const FieldChip = styled.div`
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;

  background-color: #39d372;
`;

const PostTitle = styled.div`
  font-size: 24px;
  font-weight: bold;
`;
