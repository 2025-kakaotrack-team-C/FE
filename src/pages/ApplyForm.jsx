import React, { useState } from "react";
import styled from "styled-components";
import { IoClose } from "react-icons/io5";
import ReactModal from "react-modal";
import axios from "axios";
import { getCookie } from "../utils/Cookie";

const Container = styled.div`
  flex: 1;
`;

const Modal = styled(ReactModal)`
  width: 40vw;
  max-height: 55vh;
  position: fixed;
  top: 50%;
  left: calc(50% + 143.5px);
  transform: translate(-50%, -50%);
  background-color: #ffffff;
  border: 0.1vw solid;
  border-radius: 24px;
  border-color: #e8e0e8;
  padding: 20px;
  overflow-y: auto;
  &:focus {
    outline: none;
  }
`;

const TopContainer = styled.div`
  font-size: 2vw;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.div`
  font-family: "yg-Jalnan";
  font-size: 2vw;
  margin: 2vw;
`;

const ButtonContainer = styled.div`
  cursor: pointer;
  margin: 2vw;
`;

const FormContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center; /* 수평 가운데 정렬 */
  justify-content: center; /* 수직 가운데 정렬 */
`;

const Select = styled.select`
  width: 30vw;
  height: 7vh;
  margin: 5vh;
  font-family: "yg-Jalnan";
  font-size: 1.3vw;
  border: 0.1vw solid #e8e0e8;
  border-radius: 24px;
`;

const Text = styled.div`
  width: 100%;
  margin: 4vh 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ff6140;
  font-size: 1vw;
  text-align: center;
`;

const SubmitButton = styled.button`
  align-items: center;
  margin-bottom: 5vh;
  width: 12vw;
  height: 5.5vh;
  border-radius: 24px;
  font-size: 1.3vw;
  font-weight: bolder;
  background-color: #dcdaf5;
  color: #21005d;
  border: none;

  &:hover {
    cursor: pointer;
  }

  &:active {
    background-color: #21005d;
    color: #dcdaf5;
  }
`;

/**
 * 부모로부터
 *    isOpen, closeModal(모달 제어)
 *    projectId(프로젝트 식별을 위한 id)
 * 을 props로 받아 지원하기 요청을 합니다.
 */
const ApplyForm = ({ isOpen, closeModal, projectId }) => {
  const [selectedOption, setSelectedOption] = useState("");

  // 서버에 전송할 때 사용할 department 매핑 예시 (필요에 맞게 수정하세요)
  // 예: AI=101, FRONTEND=102, BACKEND=103, APP=104, GAME=105 등
  const departmentMapping = {
    ai: 1,
    frontend: 2,
    backend: 3,
    app: 4,
    game: 5,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = getCookie("token");
      const departmentCode = departmentMapping[selectedOption];
      if (!departmentCode) {
        alert("지원 분야를 선택해주세요.");
        return;
      }

      // 실제로 서버에 지원 요청 보내기
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/applications/${projectId}`,
        {
          department: departmentCode, // { "department": 101 } 같은 형태
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("지원이 완료되었습니다!");
      setSelectedOption("");
      closeModal();
    } catch (error) {
      console.error("지원 중 오류 발생:", error);
      alert("지원에 실패했습니다. 다시 시도해 주세요.");
    }
  };

  return (
    <Container>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.0)",
          },
        }}
      >
        <TopContainer>
          <Title>지원하기</Title>
          <ButtonContainer onClick={closeModal}>
            <IoClose fontSize="4vw" />
          </ButtonContainer>
        </TopContainer>
        <FormContainer>
          <form onSubmit={handleSubmit}>
            <Select
              id="options"
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
              required
            >
              <option value="" disabled>
                분야 선택
              </option>
              <option value="ai">AI</option>
              <option value="frontend">프론트엔드</option>
              <option value="backend">백엔드</option>
              <option value="app">앱</option>
              <option value="game">게임</option>
            </Select>
            <Text>한번 결정하면 다시 바꿀 수 없습니다.</Text>
            {/* form 안에서 제출 버튼을 눌러야 onSubmit이 동작합니다 */}
            <FormContainer>
              <SubmitButton type="submit">제출하기</SubmitButton>
            </FormContainer>
          </form>
        </FormContainer>
      </Modal>
    </Container>
  );
};

export default ApplyForm;
