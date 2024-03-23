import styled from "@emotion/styled";
import Modal from "react-modal";
import { Button, styled as styledMUI } from "@mui/material";

Modal.setAppElement("#root");
type ModalProps = {
  modalIsOpen: boolean;
  onRequestClose: () => void;
  onClick: () => void;
};
export const CommonCompleteModal = (props: ModalProps) => {
  return (
    <>
      <Modal
        isOpen={props.modalIsOpen}
        style={StyledSmallModal}
        onRequestClose={props.onRequestClose}
      >
        <StyledFlecificationDiv>
          <StyledTextUpperCenterDiv>Completed</StyledTextUpperCenterDiv>
          <StyledBottomAlignDiv>
            <StyledInModalButton onClick={props.onClick}>
              Close
            </StyledInModalButton>
          </StyledBottomAlignDiv>
        </StyledFlecificationDiv>
      </Modal>
    </>
  );
};

export const StyledFlecificationDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
`;

export const StyledBottomAlignDiv = styled.div`
  display: flex;
  justify-content: center;
  margin-top: auto;
`;

export const StyledInModalButton = styledMUI(Button)({
  margin: "20px",
});

export const StyledTextUpperCenterDiv = styled.div`
  text-align: center;
  margin-top: 25px;
`;

export const StyledSmallModal = {
  overlay: {
    zIndex: "2",
    backgroundColor: "rgba(0,0,0,0.85)",
  },
  content: {
    top: "20%",
    right: "35%",
    left: "35%",
    bottom: "47%",
    backgroundColor: "#ffffff",
    borderRadius: "1rem",
    padding: "1.5rem",
  },
};
