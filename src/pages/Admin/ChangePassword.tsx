import styled from "@emotion/styled";
import {
  Alert,
  Box,
  Button,
  Container,
  Stack,
  TextField,
  ThemeProvider,
  createTheme,
  styled as styledMUI,
} from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { authContextValueType, useAuth } from "../../hooks/useAuth";
import { useMutateTask } from "../../hooks/useMutateTask";

type FormData = {
  oldPassword: string;
  newPassword: string;
  newConfirmPassword: string;
};

export type changeRequestBody = {
  oldPassword: string;
  newPassword: string;
};

export const ChangePassword: React.FC = () => {
  const navigate = useNavigate();
  const { userInfo } = useAuth() as authContextValueType;
  const userId = userInfo.userId;
  const [
    changePasswordCompleteModalIsOpen,
    setChangePasswordCompleteModalIsOpen,
  ] = useState(false);
  const { changePasswordMutation } = useMutateTask();

  const [badRequestError, setBadRequestError] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<FormData>({
    mode: "onChange",
  });
  return (
    <>
      <ThemeProvider theme={helperTextTheme}>
        <h2>Change Password</h2>
        <StyledOnlyFlexDiv>
          {badRequestError ? (
            <StyledFlexCenterCenterDiv>
              <Alert
                variant="outlined"
                security="error"
                style={StyledErrorText}
              >
                {badRequestError}
              </Alert>
            </StyledFlexCenterCenterDiv>
          ) : (
            " "
          )}
          <br />
          <Container component="main" maxWidth="md">
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <Stack>
                <label>Current Password</label>
                <TextField
                  margin="normal"
                  id="oldPassword"
                  type="password"
                  autoComplete="oldPassword"
                  {...register("oldPassword")}
                  error={"oldPassword" in errors}
                  helperText={errors.oldPassword?.message}
                />
                <br />
                <label>New Password</label>
                <TextField
                  margin="normal"
                  id="newPassword"
                  type="password"
                  autoComplete="newPassword"
                  {...register("newPassword")}
                  error={"newPassword" in errors}
                  helperText={errors.newPassword?.message}
                />
                <br />
                <label>New Confirm Password</label>
                <TextField
                  margin="normal"
                  id="newConfirmPassword"
                  type="password"
                  autoComplete="newConfirmPassword"
                  {...register("newConfirmPassword")}
                  error={"newConfirmPassword" in errors}
                  helperText={errors.newConfirmPassword?.message}
                />
                <br />
                <br />
                <StyledBottomAlignDiv>
                  <StyledNormalButton
                    onClick={() => navigate(-1)}
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Return
                  </StyledNormalButton>
                  <StyledNormalButton
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Submit
                  </StyledNormalButton>
                </StyledBottomAlignDiv>
              </Stack>
            </Box>
          </Container>
        </StyledOnlyFlexDiv>
      </ThemeProvider>
    </>
  );
};

export const helperTextTheme = createTheme({
  components: {
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          margin: "0  auto",
        },
      },
    },
  },
});

export const StyledOnlyFlexDiv = styled.div`
  display: flex;
  vertical-align: baseline;
`;

export const StyledFlexCenterCenterDiv = styled.div`
  display: flex;
  margin: 0 auto;
`;

export const StyledErrorText = {
  color: "#ff0000",
};

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
