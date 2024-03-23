import { Route, Routes } from "react-router-dom";
import { SignIn } from "../pages/SignIn/SignIn";
import { ProtectedLayout } from "../Layout/ProtectedLayout";
import { PaymentList } from "../pages/Payment/PaymentList";
import { PaymentDetail } from "../pages/Payment/PaymentDetail";
import { ChangePassword } from "../pages/Admin/ChangePassword";

export const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/" element={<ProtectedLayout />}>
          <Route path="/" element={<ChangePassword />} />
          <Route path="/payment" element={<PaymentList />} />
          <Route
            path="/payment/detail/:paymentMethodId"
            element={<PaymentDetail />}
          />
          <Route path="/user/change-password" element={<ChangePassword />} />
        </Route>
      </Routes>
    </>
  );
};
