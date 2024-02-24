import { Route, Routes } from "react-router-dom";
import { SignIn } from "../pages/SignIn/SignIn";
import { ProtectedLayout } from "../Layout/ProtectedLayout";
import { PaymentList } from "../Payment/PaymentList";

export const AppRoutes=()=>{
    return(
        <>
          <Routes>
              <Route path="/signIn" element={<SignIn/>}/>
              <Route path="/" element={<ProtectedLayout/>}>
              <Route path="/" element={<PaymentList/>}/>
              <Route path="/payment" element={<PaymentList/>}/>
              </Route>
          </Routes>
        </>
    );
};