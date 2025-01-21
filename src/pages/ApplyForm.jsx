import React, { useState } from 'react';
import styled from 'styled-components';
import { IoClose } from 'react-icons/io5';
import ReactModal from 'react-modal';

const Container = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
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

const TestButton = styled.button`
  width: 20vw;
  height: 7vh;
  border: 0.1vw solid;
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
  border-color: #E8E0E8;
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
  font-family: 'yg-Jalnan';
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
  align-items: center;
  justify-content: center;
`;

const Select = styled.select`
  width: 30vw;
  height: 7vh;
  margin: 5vh;
  font-family: "yg-Jalnan";
  font-size: 1.3vw;
  border: 0.1vw solid #E8E0E8;
  border-radius: 24px;
`;

const Text = styled.div`
    width: 100%;
    margin: 4vh;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #FF6140;
    font-size: 1vw;
`;

const SubmitButton = styled.button`
  width: 12vw;
  height: 5.5vh;
  margin-bottom: 3vh;
  border-radius: 24px;
  font-size: 1.3vw;
  font-weight: bolder;
  background-color: #DCDAF5;
  color: #21005D;
  border: none;

  &:hover {
    cursor: pointer;
  }

  &:active {
    background-color: #21005D;
    color: #DCDAF5;
  }
`;

const ApplyForm = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Selected Option:", selectedOption);
    setSelectedOption("");
    closeModal();
  };

  return (
    <Container>
      <TestButton onClick={openModal}>Apply</TestButton>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.0)'
          },
        }}
      >
        <TopContainer>
          <Title>요청 게시물 작성</Title>
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
              <option value="option1">백</option>
              <option value="option2">프론트</option>
              <option value="option3">AI</option>
            </Select>
          </form>
            <Text>한번 결정하면 다시 바꿀 수 없습니다.</Text>
            <SubmitButton type="submit">제출하기</SubmitButton>
        </FormContainer>
      </Modal>
    </Container>
  );
};

export default ApplyForm;