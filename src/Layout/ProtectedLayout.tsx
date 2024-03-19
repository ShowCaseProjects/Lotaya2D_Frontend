import { Navigate, Outlet } from "react-router-dom";
import { authContextValueType, useAuth } from "../hooks/useAuth";
import { MainLayout } from "./MainLayout";
import { Toolbar } from "@mui/material";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const ProtectedLayout = () => {
  const  isSignIn  =window.localStorage.getItem('isSignInInfo');
  console.log(isSignIn+"Data")
  if(!isSignIn)
  {
      return <Navigate to="/signIn" />
  }
  return (
    <MainLayout>
      <Toolbar />
      <Outlet />
    </MainLayout>
  );
};
