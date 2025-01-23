import React, { useState, useRef, useEffect } from "react";
// import { useParams } from "react-router-dom";
import styled from "styled-components";
import { MdMoreVert } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { getCookie } from "../utils/Cookie";

const TeamFormation = () => {
  const { id } = useParams();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate(); // useNavigate 훅 사용
  const [project, setProject] = useState("");
  const [projectMembers, setProjectMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleClose = async () => {
    try {
      const token = getCookie("token");
      await axios.put(
        `${process.env.REACT_APP_API_URL}/projects/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate(`/project/${id}/evaluation`);
    } catch (err) {
      console.error("Error during handleClose:", err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getCookie("token");
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/projects/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = response.data;
        setProject(data.project);
        setProjectMembers(data.projectMembers);
        console.log("Project data fetched:", data);
      } catch (err) {
        if (err.response) {
          setError(`Error: ${err.response.status} ${err.response.statusText}`);
        } else if (err.request) {
          // Request was made but no response received
          setError("Error: No response received from server.");
        } else {
          // Something else happened
          setError(err.message || "Failed to fetch project data.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const difficultyMapping = {
    1: "쉬움",
    2: "중간",
    3: "어려움",
  };

  const difficultyColorMapping = {
    쉬움: "#27ae60",
    중간: "#f1c40f",
    어려움: "#e74c3c",
  };

  // Department Mapping
  const departmentMapping = {
    1: "ai",
    2: "프론트엔드",
    3: "백엔드",
    4: "앱",
    5: "게임",
    // Add more mappings as needed
  };

  // 댓글 기능 상태 및 로직
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const bottomRef = useRef(null);

  const handleAddComment = () => {
    if (newComment.trim() === "") return;

    const newCommentData = {
      id: comments.length + 1,
      author: `작성자 ${comments.length + 1}`,
      date: new Date().toLocaleString("ko-KR"),
      text: newComment,
    };

    setComments([...comments, newCommentData]);
    setNewComment("");
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [comments]);

  return (
    <Container>
      <Rectangle>
        <Title>팀 완성</Title>
        <Header>
          <Difficulty
            color={
              difficultyColorMapping[
                difficultyMapping[project.difficult] || "중간"
              ] || "#bdc3c7"
            }
          >
            난이도 : {difficultyMapping[project.difficult] || "중간"}
          </Difficulty>
          <Title>{project.title}</Title>
        </Header>
        <div>
          <Ttag># 프로젝트 진행중</Ttag>
        </div>
      </Rectangle>
      <div>
        <AuthorRow>
          <span>
            팀장: {project.userNickname}(
            {departmentMapping[project.departments] || "기타"}) - 팀원:{" "}
            {projectMembers.length > 0
              ? projectMembers.map((member, index) => (
                  <span key={member.id}>
                    {member.nickname} (
                    {departmentMapping[member.department] || "기타"})
                    {index < projectMembers.length - 1 && ", "}
                  </span>
                ))
              : "없음"}
          </span>
          <IconWrapper onClick={toggleMenu}>
            <MdMoreVert size={24} color="#1c1c1d" />
          </IconWrapper>
          {isMenuOpen && (
            <Menu>
              <MenuItem onClick={handleClose}>마감</MenuItem>
            </Menu>
          )}
        </AuthorRow>
        <Border></Border>
      </div>
      <DetailLayout>
        <DetailTitle>프로젝트 내용 설명</DetailTitle>
        <Detail>{project.description}</Detail>
      </DetailLayout>
      {/* 댓글 섹션 */}
      <DetailTitle>댓글 창</DetailTitle>
      <CommentContainer>
        <CommentList>
          {comments.map((comment) => (
            <CommentItem key={comment.id}>
              <CommentAuthor>{comment.author}</CommentAuthor>
              <CommentDate>{comment.date}</CommentDate>
              <CommentText>{comment.text}</CommentText>
            </CommentItem>
          ))}
          <div ref={bottomRef} />
        </CommentList>
        <CommentInputWrapper>
          <CommentInput
            placeholder="댓글을 입력하세요..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <SubmitButton onClick={handleAddComment}>작성</SubmitButton>
        </CommentInputWrapper>
      </CommentContainer>
    </Container>
  );
};

export default TeamFormation;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  /* height: 100vh; */
  min-height: 100vh; /* 높이를 최소 화면 크기로 설정 */
  padding: 24px;
  margin: auto;
  max-width: 1440px;
  width: 100%;
  /* overflow: auto; */
`;

const Rectangle = styled.div`
  padding: 24px;
  background: #f8f1f6;
  border: 1px solid #e8e0e8;
  border-radius: 24px;
  margin-bottom: 24px;
`;

const Title = styled.div`
  font-size: 36px;
  font-weight: bold;
`;

const Header = styled.div`
  font-size: 18px;
  margin-bottom: 16px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-top: 44px;
  gap: 12px;
`;

const Ttag = styled.div`
  font-size: 14px;
  border-radius: 24px;
  background-color: #e8e0e8;
  padding: 8px 16px;
  display: inline-block;
  text-align: center;
`;

const Border = styled.div`
  border: 1px solid #1c1c1d;
  margin-top: 24px;
  margin-bottom: 60px;
`;

const DetailLayout = styled.div`
  display: flex;
  margin-bottom: 48px;
  flex-direction: column;
  gap: 12px;
  align-items: flex-start;
`;

const DetailTitle = styled.div`
  font-size: 24px;
  margin-bottom: 24px;
  display: flex;
  font-weight: bold;
  flex-direction: column;
  gap: 8px;
`;

const Detail = styled.div`
  font-size: 16px;
`;

const AuthorRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  position: relative;
`;

const IconWrapper = styled.div`
  cursor: pointer;
  position: relative;

  transition: transform 0.2s ease, color 0.3s ease;

  &:hover {
    transform: scale(2.4);
    color: #21005d;
  }

  svg {
    transition: color 0.3s ease;
  }
`;

const Menu = styled.div`
  position: absolute;
  top: 32px;
  right: 0;
  background: #fff;
  border: 1px solid #1c1c1d;
  border-radius: 24px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 120px;
  z-index: 1000;
  overflow: hidden;
`;

const MenuItem = styled.div`
  padding: 12px 16px;
  font-size: 16px;
  font-weight: bold;
  color: #1c1c1d;
  cursor: pointer;
  text-align: center;
  border-bottom: 1px solid #1c1c1d;

  &:last-child {
    border-bottom: none;
  }

  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: #dcdaf5;
    color: #1c1c1d;
  }
`;

const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px;
  border: 1px solid #e8e0e8;
  border-radius: 12px;
  background-color: #f8f1f6;
`;

const CommentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-height: 300px;
  overflow-y: auto;
`;

const CommentItem = styled.div`
  padding: 12px;
  border: 1px solid #e8e0e8;
  border-radius: 8px;
  background-color: #ffffff;
`;

const CommentAuthor = styled.div`
  font-weight: bold;
  font-size: 14px;
`;

const CommentDate = styled.div`
  font-size: 12px;
  color: #888888;
`;

const CommentText = styled.div`
  margin-top: 8px;
  font-size: 16px;
`;

const CommentInputWrapper = styled.div`
  display: flex;
  gap: 8px;
`;

const CommentInput = styled.input`
  flex: 1;
  padding: 12px;
  border: 1px solid #e8e0e8;
  border-radius: 8px;
  font-size: 16px;
`;

const SubmitButton = styled.button`
  padding: 12px 24px;
  background-color: #dcdaf5;
  color: #21005d;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  transition: background-color 0.3s;

  &:hover {
    background-color: #21005d;
    color: #ffffff;
  }
`;

const Difficulty = styled.div`
  font-size: 18px;
  padding: 8px 16px;
  border-radius: 24px;
  color: #ffffff;
  background-color: ${(props) => props.color || "#bdc3c7"};
  text-align: center;
  display: inline-block;
`;
