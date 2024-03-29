import styled from "@emotion/styled";
import Modal from "react-modal";
import { Button, styled as styledMUI } from "@mui/material";
import axios from "axios";
import { API_URL } from "../../config";

Modal.setAppElement("#root");
type ModalProps = {
  modalIsOpen: boolean;
  paymentId: string;
  phoneNumber: string;
  paymentType: string;
  receiverAccountName: string;
  receiverAccount: string;
  amount: string;
  approverId: string;
  onRequestClose: () => void;
  onRequestError: (error: any) => void;
  onCancel: () => void;
  setIsLoading: (b: boolean) => void;
};
export const ModalPaymentConfirm = ({
  modalIsOpen,
  paymentId,
  phoneNumber,
  paymentType,
  receiverAccountName,
  receiverAccount,
  amount,
  approverId,
  onRequestClose,
  onRequestError,
  onCancel,
  setIsLoading,
}: ModalProps) => {
  const paymentInternalId = paymentId;
  const approvePayment = (event: React.MouseEvent<Element, MouseEvent>) => {
    setIsLoading(true);
    axios
      .post(`${API_URL}/paymentmethod/${paymentInternalId}/approve`, {
        phoneNumber,
        paymentType,
        receiverAccountName,
        receiverAccount,
        amount,
        approverId,
      })
      .then((res) => res.data)
      .then(() => onCancel())
      .then(() => {
        setIsLoading(false);
        onRequestClose();
      })
      .catch((error: any) => {
        setIsLoading(false);
        if (["E1117", "E1000"].includes(error.response?.data.errorCode)) {
          onRequestError(error.response?.data.errorMessage);
        }
      });
  };
  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        style={StyledSmallModal}
        onRequestClose={onCancel}
      >
        <StyledFlecificationDiv>
          <StyledTextUpperCenterDiv>
            Are you sure to approve?
          </StyledTextUpperCenterDiv>
          <StyledBottomAlignDiv>
            <StyledInModalButton onClick={onCancel}>Cancel</StyledInModalButton>
            <StyledInModalButton onClick={approvePayment} type="submit">
              Ok
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
