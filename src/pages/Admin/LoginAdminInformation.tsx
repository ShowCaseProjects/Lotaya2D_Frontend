import styled from "@emotion/styled";
import { authContextValueType, useAuth } from "../../hooks/useAuth";
import { Button, styled as styledMUI } from "@mui/material";
import Modal from "react-modal";

type LoginAdminProps = {
  modalIsOpen: boolean;
  onRequestClose(): void;
  onClick(): void;
};

export const LoginAdminInformation = (props: LoginAdminProps) => {
  const { userInfo } = useAuth() as authContextValueType;
  return (
    <>
      <StyledBackRetainButton onClick={props.onClick}>
        {userInfo.userId}
      </StyledBackRetainButton>
      <Modal
        isOpen={props.modalIsOpen}
        style={maxZIndexMediumModal}
        onRequestClose={props.onRequestClose}
      >
        <StyledFlecificationDiv>
          <h2>Admin Information</h2>
          <h2>ID:{userInfo.userId}</h2>
          <hr>Name:{userInfo.name}</hr>
          <StyledBottomAlignDiv>
            <StyledInModalButton onClick={props.onRequestClose}>
              Close
            </StyledInModalButton>
          </StyledBottomAlignDiv>
        </StyledFlecificationDiv>
      </Modal>
    </>
  );
};

export const StyledBackRetainButton = styledMUI(Button)({
  color: "white",
  textTransform: "none",
  margin: "2px 5px",
  "&:active": {
    background: "#c0c0c0",
  },
});

export const maxZIndexMediumModal = {
  overlay: {
    zIndex: "999",
    backgroundColor: "rgba(0,0,0,0.85)",
  },
  content: {
    top: "20%",
    right: "30%",
    left: "30%",
    bottom: "30%",
    backgroundColor: "#ffffff",
    borderRadius: "1rem",
    padding: "1.5rem",
  },
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
