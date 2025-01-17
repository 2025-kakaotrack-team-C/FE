import React from "react";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideUp = keyframes`
  from {
    transform: translateY(20px);
  }
  to {
    transform: translateY(0);
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: ${fadeIn} 0.3s ease;
`;

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #ffffff;
  padding: 30px;
  border-radius: 16px;
  min-width: 450px;
  max-width: 90%;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  animation: ${slideUp} 0.3s ease;
  text-align: center;
`;

const ModalTitle = styled.h2`
  margin-bottom: 20px;
  font-size: 1.8rem;
  font-weight: bold;
  color: #222;
`;

const ModalContent = styled.p`
  margin-bottom: 40px;
  font-size: 1.2rem;
  line-height: 1.6;
  color: #555;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
`;

const ModalButton = styled.button`
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  color: #fff;
  background-color: ${({ buttonColor }) => buttonColor || "#007BFF"};
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: ${({ buttonColor }) => buttonColor || "#0056b3"};
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const Modal = ({
  title,
  content,
  confirmButtonName = "확인",
  cancelButtonName = "취소",
  confirmButtonColor = "#FF4500",
  cancelButtonColor = "#555",
  onConfirm,
  onClose,
}) => {
  return (
    <ModalOverlay>
      <ModalContainer>
        <ModalTitle>{title}</ModalTitle>
        <ModalContent>{content}</ModalContent>
        <ButtonContainer>
          <ModalButton buttonColor={confirmButtonColor} onClick={onConfirm}>
            {confirmButtonName}
          </ModalButton>
          <ModalButton buttonColor={cancelButtonColor} onClick={onClose}>
            {cancelButtonName}
          </ModalButton>
        </ButtonContainer>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default Modal;
