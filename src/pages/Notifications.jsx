import React from "react";
import styled from "styled-components";
import { IoClose } from 'react-icons/io5';
import { FiBell } from "react-icons/fi";
import ReactModal from "react-modal";

const Modal = styled(ReactModal)`
  width: 50vw;
  height: 75vh;
  position: fixed;
  top: 50%;
  left: calc(50% + 143.5px); 
  transform: translate(-50%, -50%);
  background-color: #ffffff;
  border: 0.1vw solid;
  transform: translate(-50%, -50%);
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

const BoxContainer = styled.div`
  width: 48vw;
  max-height: 55vh;
  display: block;
  justify-content: center;
  align-items: center;
  position: fixed;
  overflow-y: auto;
`;

const Box = styled.div`
  width: 43vw;
  height: 5vw;
  margin: 1vw;
  margin-top: 0vw;
  background-color: #F8F1F6;
  border: 0.1vw solid;
  border-radius: 24px;
  border-color: #E8E0E8;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const Contents = styled.div`
  margin-left: 3vw;
  display: flex;
  flex-direction: row;
`;

const Text = styled.div`
  font-size: 1.5vw;
  margin-left: 2vw;
`;

const Notifications = ({ modalIsOpen, closeModal }) => {
  return (
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
        <Title>알림</Title>
        <ButtonContainer onClick={closeModal}>
          <IoClose fontSize="4vw" />
        </ButtonContainer>
      </TopContainer>
      <BoxContainer>
        <Box>
          <Contents>
            <FiBell fontSize="2vw" />
            <Text>알림 내용</Text>
          </Contents>
        </Box>
      </BoxContainer>
    </Modal>
  );
};

export default Notifications;