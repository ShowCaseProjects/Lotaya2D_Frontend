import { Navigate, Outlet } from "react-router-dom";
import { authContextValueType, useAuth } from "../hooks/useAuth"
import { MainLayout } from "./MainLayout";
import { Toolbar } from "@mui/material";

export const ProtectedLayout=()=>{
    const {isSignIn}=useAuth() as authContextValueType;
    // if(!isSignIn)
    // {
    //     return <Navigate to="/signIn" />
    // }
    return(
        <MainLayout>
            <Toolbar/>
            <Outlet/>
        </MainLayout>
    );
}