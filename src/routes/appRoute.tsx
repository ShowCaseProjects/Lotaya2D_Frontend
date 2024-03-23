import { RouteType } from "./config";
import { PaymentList } from "../pages/Payment/PaymentList";
import { ChangePassword } from "../pages/Admin/ChangePassword";
import { ExposureOutlined, LockClockOutlined, PaidOutlined, Remove } from "@mui/icons-material";

const appRoutes: RouteType[] = [
  {
    index: true,
    element: <ChangePassword />,
    state: "Change Password"
  },
  {
    path: "/user/change-password",
    element: <ChangePassword/>,
    state: "Change Password",
    sidebarProps: {
      displayText: "Change Password",
      icon: <LockClockOutlined />
    }
  },
  {
    path: "/payment?paymentStatus=Request",
    element: <PaymentList />,
    state: "Payment",
    sidebarProps: {
      displayText: "Payment",
      icon: <PaidOutlined />
    },
    child: [
      {
        index: true,
        element: <PaymentList />,
        state: "payment.index"
      },
      {
        path: "/payment?paymentStatus=Request",
        element: <PaymentList />,
        state: "payment.request",
        sidebarProps: {
          displayText: "Request"
        },
      },
      {
        path: "/payment?paymentStatus=Approver",
        element: <PaymentList />,
        state: "payment.approver",
        sidebarProps: {
          displayText: "Approver"
        }
      },
      {
        path: "/payment?paymentStatus=Reject",
        element: <PaymentList />,
        state: "payment.reject",
        sidebarProps: {
          displayText: "Reject"
        }
      }
    ]
  },
  {
    path: "/withdraw?paymentStatus=Request",
    element: <PaymentList />,
    state: "withdraw",
    sidebarProps: {
      displayText: "Withdraw",
      icon: <ExposureOutlined />
    },
    child: [
      {
        path: "/withdraw?paymentStatus=Request",
        element: <PaymentList />,
        state: "withdraw.request",
        sidebarProps: {
          displayText: "Request"
        },
      },
      {
        path: "/withdraw?paymentStatus=Approver",
        element: <PaymentList />,
        state: "withdraw.approver",
        sidebarProps: {
          displayText: "Approver"
        }
      },
      {
        path: "/withdraw?paymentStatus=Reject",
        element: <PaymentList />,
        state: "withdraw.reject",
        sidebarProps: {
          displayText: "Reject"
        }
      }
    ]
  }
];

export default appRoutes;