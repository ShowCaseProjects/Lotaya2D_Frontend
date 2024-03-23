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
import { ModalPaymentConfirm } from "./ApprovePaymentConfirm";
import { DenyPaymentConfirm } from "./DenyPaymentConfirm";
import { CommonCompleteModal } from "../../pages/Common/CommonCompleteModal";
import { useNavigate, useParams } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { API_URL } from "../../config";
import { useQuery } from "react-query";
import { Loading } from "../Common/Loading";

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
  const { paymentMethodId } = useParams();
  const [errorMessage, setErrorMessage] = useState("");
  const [approveConfirmModalIsOpen, setApproveConfirmMdalIsOpen] =
    useState(false);
  const [rejectConfirmModalIsOpen, setRejectConfirmMdalIsOpen] =
    useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [commonCompleteModalIsOpen, setCommonCompleteModalIsOpen] =
    useState(false);

  const [paymentDetailApiError, setPaymentDetailApiError] =
    useState<AxiosError | null>(null);

  const fetchPaymentDetail = async () => {
    const paymentDetail: PaymentDetailResponseBody = await axios
      .get(`${API_URL}/paymentmethod/payment/` + paymentMethodId)
      .then((res) => {
        setIsLoading(false);
        return res.data;
      })
      .catch((error) => {
        setIsLoading(false);
        setPaymentDetailApiError(error);
      });
    return paymentDetail;
  };

  const { error, data, refetch } = useQuery({
    queryKey: "paymentDetail" + paymentMethodId,
    queryFn: fetchPaymentDetail,
  });

  if (isLoading) {
    return (
      <>
        <h2>Payment detail</h2>
        <span>Loading</span>
        <Loading loadingIsOpen={isLoading} />
      </>
    );
  }

  if (error instanceof AxiosError) {
    return (
      <>
        <h2>Payment detail</h2>
        Error
      </>
    );
  }
  if (paymentDetailApiError instanceof AxiosError) {
    const innerApiError: TypeApiError = paymentDetailApiError?.response
      ?.data as TypeApiError;
    if (
      innerApiError?.errorCode === "E1000" ||
      innerApiError?.errorCode === "E1111"
    ) {
      return (
        <>
          <h2>Payment detail</h2>
          <br />
          <StyledFlexBlockLeftDiv>
            <Alert variant="outlined" severity="error" style={StyledErrorText}>
              {innerApiError?.errorMessage}
            </Alert>
          </StyledFlexBlockLeftDiv>
        </>
      );
    } else {
      return (
        <>
          <h2>Payment detail</h2>
          Error
        </>
      );
    }
  }
  const detail: PaymentType[] = [
    {
      id: "paymentMethodId",
      label: "Payment Method ID",
      value: data?.paymentMethodId,
    },

    {
      id: "userId",
      label: "User ID",
      value: data?.userId,
    },
    {
      id: "paymentType",
      label: "Payment type",
      value: data?.paymentType,
    },
    {
      id: "paymentAccountName",
      label: "Payment Account Name",
      value: data?.paymentAccountName,
    },
    {
      id: "paymentAccount",
      label: "Payment Account Number",
      value: data?.paymentAccount,
    },
    {
      id: "receiverAccountName",
      label: "Receiver Account Name",
      value: data?.receiverAccountName,
    },
    {
      id: "receiverAccount",
      label: "Receiver Account Number",
      value: data?.receiverAccount,
    },
    {
      id: "amount",
      label: "Amount",
      value: data?.amount,
    },
    {
      id: "paymentConfirmationCode",
      label: "Payment Confirmation Code",
      value: data?.paymentConfirmationCode,
    },
    {
      id: "registerDate",
      label: "Register Date",
      value: data?.registerDate,
    },
    {
      id: "updatedDate",
      label: "Updated Date",
      value: data?.updatedDate,
    },
  ];

  const approvePayment = () => {
    setApproveConfirmMdalIsOpen(true);
    setErrorMessage('');
  };

  const denyPayment = () => {
    setRejectConfirmMdalIsOpen(true);
    setErrorMessage('');
  };

  return (
    <>
      <ModalPaymentConfirm
        modalIsOpen={approveConfirmModalIsOpen}
        paymentId={String(paymentMethodId)}
        phoneNumber={String(data?.userId)}
        paymentType={String(data?.paymentType)}
        receiverAccountName={String(data?.receiverAccountName)}
        receiverAccount={String(data?.receiverAccount)}
        amount={String(data?.amount)}
        approverId={String(window.localStorage.getItem("isSignInInfo"))}
        onRequestClose={() => {
          setCommonCompleteModalIsOpen(true);
        }}
        onRequestError={(err) => {
          setCommonCompleteModalIsOpen(false);
          setErrorMessage(err);
        }}
        onCancel={() => {
          setApproveConfirmMdalIsOpen(false);
        }}
        setIsLoading={setIsLoading}
      />

      <DenyPaymentConfirm
        modalIsOpen={rejectConfirmModalIsOpen}
        paymentId={String(paymentMethodId)}
        approverId={String(window.localStorage.getItem("isSignInInfo"))}
        onRequestClose={() => {
          setRejectConfirmMdalIsOpen(false);
          setCommonCompleteModalIsOpen(true);
        }}
        onRequestError={(err) => {
          setRejectConfirmMdalIsOpen(false);
          setCommonCompleteModalIsOpen(false);
          setErrorMessage(err);
        }}
        onCancel={() => {
          setRejectConfirmMdalIsOpen(false);
        }}
        setIsLoading={setIsLoading}
      />
      <CommonCompleteModal
        modalIsOpen={commonCompleteModalIsOpen}
        onRequestClose={() => setCommonCompleteModalIsOpen(false)}
        onClick={() => {
          refetch();
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
        {data?.paymentStatus === "Request" ? (
          <StyledNormalButton onClick={approvePayment}>
            Approve
          </StyledNormalButton>
        ) : (
          ""
        )}
        {data?.paymentStatus === "Request" ? (
          <StyledNormalButton onClick={denyPayment}>Reject</StyledNormalButton>
        ) : (
          ""
        )}
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

export const StyledFlexBlockLeftDiv = styled.div`
  display: flex;
  margin: left;
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

export type PaymentDetailResponseBody = {
  paymentMethodId: string;
  paymentStatus: string;
  userId: string;
  paymentType: string;
  paymentAccountName: string;
  paymentAccount: string;
  receiverAccountType: string;
  receiverAccountName: string;
  receiverAccount: string;
  amount: string;
  paymentConfirmationCode: string;
  registerDate: string;
  updatedDate: string;
};

type TypeApiError = {
  errorCode?: string;
  message?: string;
  errorMessage?: string;
};
