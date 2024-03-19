import styled from "@emotion/styled";
import {
  Alert,
  Button,
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  styled as styledMUI,
} from "@mui/material";
import { useState } from "react";
import { StyledTable } from "./PaymentList";
import { ModalPaymentConfirm } from "./ModalPaymentConfirm";
import { DenyPaymentConfirm } from "./DenyPaymentConfirm";
import { CommonCompleteModal } from "../../pages/Common/CommonCompleteModal";
import { useNavigate } from "react-router-dom";

type PaymentType = {
  id:
    | "paymentMethodId"
    | "userId"
    | "paymentType"
    | "paymentAccountName"
    | "paymentAccount"
    | "receiverAccountName"
    | "receiverAccount"
    | "amount"
    | "paymentConfirmationCode"
    | "registerDate"
    | "updatedDate";
  label?: string;
  value?: any;
};

export const PaymentDetail = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [approveConfirmModalIsOpen, setApproveConfirmMdalIsOpen] =
    useState(false);
  const [rejectConfirmModalIsOpen, setRejectConfirmMdalIsOpen] =
    useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [commonCompleteModalIsOpen, setCommonCompleteModalIsOpen] =
    useState(false);

  const detail: PaymentType[] = [
    {
      id: "paymentMethodId",
      label: "Payment Method ID",
      value: "",
    },

    {
      id: "userId",
      label: "User ID",
      value: "",
    },
    {
      id: "paymentType",
      label: "Payment type",
      value: "",
    },
    {
      id: "paymentAccountName",
      label: "Payment Account Name",
      value: "",
    },
    {
      id: "paymentAccount",
      label: "Payment Account Number",
      value: "",
    },
    {
      id: "receiverAccountName",
      label: "Receiver Account Name",
      value: "",
    },
    {
      id: "receiverAccount",
      label: "Receiver Account Number",
      value: "",
    },
    {
      id: "amount",
      label: "Amount",
      value: "",
    },
    {
      id: "paymentConfirmationCode",
      label: "Payment Confirmation Code",
      value: "",
    },
    {
      id: "registerDate",
      label: "Register Date",
      value: "",
    },
    {
      id: "updatedDate",
      label: "Updated Date",
      value: "",
    },
  ];

  const approvePayment = () => {
    setApproveConfirmMdalIsOpen(true);
    setErrorMessage("");
  };

  const denyPayment = () => {
    setRejectConfirmMdalIsOpen(true);
    setErrorMessage("");
  };

  return (
    <>
      <ModalPaymentConfirm
        modalIsOpen={approveConfirmModalIsOpen}
        paymentId={""}
        onRequestClose={() => {
          setCommonCompleteModalIsOpen(true);
        }}
        onRequestError={(err) => {
          setCommonCompleteModalIsOpen(false);
        }}
        onCancel={() => {
          setApproveConfirmMdalIsOpen(false);
        }}
        setIsLoading={setIsLoading}
      />

      <DenyPaymentConfirm
        modalIsOpen={rejectConfirmModalIsOpen}
        paymentId={""}
        onRequestClose={() => {
          setCommonCompleteModalIsOpen(true);
        }}
        onRequestError={(err) => {
          setCommonCompleteModalIsOpen(false);
          setCommonCompleteModalIsOpen(true);
        }}
        onCancel={() => {
          setRejectConfirmMdalIsOpen(false);
          setCommonCompleteModalIsOpen(true);
        }}
        setIsLoading={setIsLoading}
      />
      <CommonCompleteModal
        modalIsOpen={commonCompleteModalIsOpen}
        onRequestClose={() => setCommonCompleteModalIsOpen(false)}
        onClick={() => {
          setCommonCompleteModalIsOpen(false);
        }}
      />
      <h2>Payment Detail</h2>
      {errorMessage ? (
        <StyledBlockLeftDiv>
          <Alert variant="outlined" severity="error" style={StyledErrorText}>
            {errorMessage}
          </Alert>
        </StyledBlockLeftDiv>
      ) : (
        " "
      )}
      <StyledLeftAlignDiv>
        <Paper style={{ width: "100%" }}>
          <TableContainer>
            <StyledTable stickyHeader aria-label="sticky table">
              <TableBody>
                {detail?.map((row) => {
                  return (
                    <TableRow tabIndex={-1} key={row.id}>
                      <TableCell
                        style={{
                          width: 300,
                          maxWidth: 300,
                          minWidth: 300,
                          wordBreak: "break-all",
                          backgroundColor: "#F4F0E7",
                        }}
                      >
                        {row.label}
                      </TableCell>
                      <TableCell>{row.value}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </StyledTable>
          </TableContainer>
        </Paper>
      </StyledLeftAlignDiv>
      <StyledBottomAlignDiv>
        <StyledNormalButton onClick={() => navigate(-1)}>
          Return
        </StyledNormalButton>
        <StyledNormalButton onClick={approvePayment}>
          Approve
        </StyledNormalButton>
        <StyledNormalButton onClick={denyPayment}>Reject</StyledNormalButton>
      </StyledBottomAlignDiv>
    </>
  );
};

export const StyledBlockLeftDiv = styled.div`
  display: flex;
  margin: left;
`;

export const StyledErrorText = {
  color: "#ff0000",
};

export const StyledLeftAlignDiv = styled.div`
  text-align: left;
  display: inline-block;
  _display: inline;
  width: 100%;
  padding: 0px;
`;

export const StyledBottomAlignDiv = styled.div`
  display: flex;
  justify-content: center;
  margin-top: auto;
`;

export const StyledNormalButton = styledMUI(Button)({
  color: "white",
  backgroundColor: "#14325F",
  margin: "5px 10px",
  border: "1px solid #14325F",
  "&:hover": {
    color: "#14325F",
    backgroundColor: "white",
    border: "1px solid #14325F",
  },
  "&:active": {
    background: "#c0c0c0",
  },
});
