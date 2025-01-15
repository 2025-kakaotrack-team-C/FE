import React, { useState, useRef, useEffect } from "react";
// import { useParams } from "react-router-dom";
import styled from "styled-components";
import { MdMoreVert } from "react-icons/md";

const TeamDetail = () => {
  //   const { type, id } = useParams();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  // 댓글 기능 상태 및 로직
  const [comments, setComments] = useState([
    {
      id: 1,
      author: "작성자 1",
      date: "2024.05.26 16:20",
      text: "ㅋㅋㅋㅋㅋㅋ",
    },
    {
      id: 2,
      author: "작성자 2",
      date: "2024.05.26 00:20",
      text: "ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ",
    },
  ]);
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
        <div>날짜</div>
        <Header>
          <div>난이도</div>
          <Title>제목</Title>
        </Header>
        <div>
          <Ttag># 태그</Ttag>
        </div>
      </Rectangle>
      <div>
        <AuthorRow>
          <div>작성자</div>
          <IconWrapper onClick={toggleMenu}>
            <MdMoreVert size={24} color="#1c1c1d" />
          </IconWrapper>
          {isMenuOpen && (
            <Menu>
              <MenuItem>마감</MenuItem>
            </Menu>
          )}
        </AuthorRow>
        <Border></Border>
      </div>
      <DetailLayout>
        <DetailTitle>프로젝트 내용 설명</DetailTitle>
        <Detail>내용</Detail>
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

export default TeamDetail;

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
