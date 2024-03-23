import styled from "@emotion/styled";
import Modal from "react-modal";
import { Button, Stack, TextField, styled as styledMUI } from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import axios from "axios";
import { API_URL } from "../../config";

Modal.setAppElement("#root");
type ModalProps = {
  modalIsOpen: boolean;
  paymentId: string;
  approverId:string;
  onRequestClose: () => void;
  onRequestError: (error: any) => void;
  onCancel: () => void;
  setIsLoading: (b: boolean) => void;
};

type PaymentDenyFormData = {
  approverId:string;
  reasonForReject: string;
};

export const DenyPaymentConfirm = ({
  modalIsOpen,
  paymentId,
  approverId,
  onRequestClose,
  onRequestError,
  onCancel,
}: ModalProps) => {
  const { handleSubmit, control, reset, setError } =
    useForm<PaymentDenyFormData>();

  const paymentMethodId = paymentId;

  const validationRule = {
    resionForReject: {
      maxLength: {
        value: 100,
        message: "Please at most 100 digits.",
      },
    },
  };

  const clearForm = (
    event: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>,
  ) => {
    reset();
    onCancel();
  };

  const updatePaymentDenyMutation = useMutation(
    (
      params: {
        paymentMethodId: string;
        body: PaymentDenyFormData;
      }
    ): Promise<any> => {
      const { paymentMethodId, body } = params;
      return axios
        .post(`${API_URL}/paymentmethod/${paymentMethodId}/reject`, body);
    }
  );

  const onSubmit: SubmitHandler<PaymentDenyFormData> = (
    formData: PaymentDenyFormData
  ) => {
    const body: PaymentDenyFormData = {
      reasonForReject: formData.reasonForReject,
      approverId:approverId,
    }
    updatePaymentDenyMutation.mutate(
      {
        paymentMethodId, body
      },
      {
        onSuccess: () => {
          reset();
          onRequestClose();
        },
        onError: (error: any) => {
          if (['E1117', 'E1000'].includes(error.response?.data.errorCode)) {
            onRequestClose();
            onRequestError(error.response?.data.errorMessage);
          }
        }
      }

    );
  }
  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        style={StyledMediumModal}
        onRequestClose={onCancel}
      >
        <Stack component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
          <StyledFlecificationDiv>
            <StyledTextUpperCenterDiv>
              Please enter the reason for rejection.
              <br />
              <br />
              <Controller
                name="reasonForReject"
                control={control}
                rules={validationRule.resionForReject}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    type="text"
                    error={fieldState.invalid}
                    onBlur={field.onBlur}
                    helperText={
                      <StyledTextCenterDiv style={StyledErrorText}>
                        {fieldState.error?.message}
                      </StyledTextCenterDiv>
                    }
                    sx={{ m: 1, minWidth: "95%" }}
                  />
                )}
              />
              <br />
              <br />
            </StyledTextUpperCenterDiv>
            <StyledBottomAlignDiv>
              <StyledInModalButton onClick={clearForm}>
                Cancel
              </StyledInModalButton>
              <StyledInModalButton type="submit">Ok</StyledInModalButton>
            </StyledBottomAlignDiv>
          </StyledFlecificationDiv>
        </Stack>
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

export const StyledTextCenterDiv = styled.div`
  text-align: center;
`;

export const StyledMediumModal = {
  overlay: {
    zIndex: "2",
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

export const StyledErrorText = {
  color: "#ff0000",
};
