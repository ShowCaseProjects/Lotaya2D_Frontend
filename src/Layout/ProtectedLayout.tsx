import { Navigate, Outlet } from "react-router-dom";
import { MainLayout } from "./MainLayout";
import { Toolbar } from "@mui/material";

export const ProtectedLayout = () => {
  const isSignIn = window.localStorage.getItem("isSignInInfo");
  if (!isSignIn) {
    return <Navigate to="/signIn" />;
  }
  return (
    <MainLayout>
      <Toolbar />
      <Outlet />
    </MainLayout>
  );
};
