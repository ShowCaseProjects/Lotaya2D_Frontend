import { Alert, AppBar, Box, Button, Container, createTheme, CssBaseline, Stack, TextField, ThemeProvider,styled as styledMUI } from "@mui/material";
import styled from "@emotion/styled"
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup";

const scheme = yup.object({
  userId: yup
    .string()
    .required('User Id is requied.')
    .matches(
      /^[a-zA-Z0-9!-/:@/[{}]/, 'Your User Id must be alphanumeric character.'
    ),
  password: yup
    .string()
    .required('Password is requied.')
    .matches(
      /^[a-zA-Z0-9!-/:@/[{}]/, 'Password must be alphanumeric character.'
    )
});

type FormData = {
  userId: string;
  password: string;
};

export type signInRequestBody = FormData;

export const SignIn = () => {
  const [errorMessage, setErrorMessage] = useState('')

  const { register, handleSubmit, formState: { errors }, } = useForm<FormData>({
    resolver: yupResolver(scheme),
    mode: 'onChange',
    reValidateMode: 'onChange',
  });
  const theme = createTheme(
    {
      components: {
        MuiFormHelperText: {
          styleOverrides: {
            root: {
              margin: '0 auto'
            }
          }
        }
      }
    }
  );

  const onSubmit: SubmitHandler<FormData> = (formData: FormData) => {
    setErrorMessage('')
    const body: signInRequestBody = {
      ...formData
    }
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <StyledAppBar
          position="fixed"
          sx={{
            zIndex: (theme: {
              zIndex: {
                drawer: number
              }
            }) =>

              theme.zIndex.drawer + 1,

          }}>
          <div style={titleStyle}>Lotaya</div>
        </StyledAppBar>
        <Box
          sx={{
            marginTop: 25,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
          <StyledOnlyFlexDiv>
            {
              errorMessage ? (
                <Alert
                  variant="outlined"
                  severity="error"
                  style={StyledErrorText}
                >
                  {errorMessage}
                </Alert>
              ) : (
                ''
              )
            }
          </StyledOnlyFlexDiv>
          <br />
          <Container component="main" maxWidth="xs">
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <Stack>
                <TextField
                  margin="normal"
                  fullWidth
                  id="userId"
                  label="ID"
                  autoComplete="userId"
                  {...register('userId')}
                  error={'userId' in errors}
                  helperText={errors.userId?.message}
                />
                <br />
                <TextField
                  margin="normal"
                  fullWidth
                  id="password"
                  label="Password"
                  autoComplete="current-password"
                  {...register('password')}
                  error={'password' in errors}
                  helperText={errors.password?.message}
                />
                <br />
                <StyledFullWidthButton
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={handleSubmit(onSubmit)}
                >
                  Submit
                </StyledFullWidthButton>
              </Stack>
            </Box>
          </Container>
        </Box>
      </ThemeProvider>
    </>
  );
}

export const StyledAppBar = styledMUI(AppBar)({
  color: 'white',
  backgroundColor: '#14325F'
});

export const titleStyle = {
  textDecoration: 'none',
  color: 'white',
  margin: '10px',
  marginLeft: '20px',
  fontFamaily: 'system-ui',
  fontSize: '30px'
}

export const StyledOnlyFlexDiv = styled.div`
display:flex;
vertical-align:baseline;
`;

export const StyledErrorText = {
  color: '#ff0000'
}

export const StyledFullWidthButton = styledMUI(Button)({
  color: 'white',
  backgroundColor: '#14325F',
  margin: '10px 0px',
  border: '1px solid #14325F',
  width: '100%',
  padding: '5px 150px',
  textTransform: 'none',
  '&:hover': {
    color: '#14325F',
    backgroundColor: 'white',
    border: '1px solid #14325F'
  },
  '&:active': {
    background: '#c0c0c0'
  }
});


