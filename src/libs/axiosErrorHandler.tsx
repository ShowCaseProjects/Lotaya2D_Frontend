import {
  FC,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { authContextValueType, useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface Props {
  children: any;
}

export type sessionContextValueType = {
  authErrorMessage: string;
  systemErrorMessage: string;
};

const SessionContext = createContext({} as any);

export const AxiosErrorHandlerProvider: FC<Props> = ({ children }) => {
  const [authErrorMessage, setAuthErrorMessage] = useState("");
  const [systemErrorMessage, setSystemErrorMessage] = useState("");
  const { signOut } = useAuth() as authContextValueType;
  const navigate = useNavigate();
  useEffect(() => {
    setAuthErrorMessage("");
    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        switch (error.response?.status) {
          default:
            return Promise.reject();
          case 401:
            if (error.response.data.errorCode === "E1115") {
              setAuthErrorMessage(error.response.data.errorMessage);
              signOut();
            }
            return Promise.reject();
          case 500:
            if (error.response.data.errorCode === "E1119") {
              setSystemErrorMessage(error.response.data.errorMessage);
              return navigate("/system-error");
            }
            setSystemErrorMessage("");
            return navigate("/system-error");
          case 502:
            setSystemErrorMessage("");
            return navigate("/system-error");
          case 503:
            setSystemErrorMessage("");
            return navigate("/system-error");
          case 504:
            setSystemErrorMessage("");
            return navigate("/system-error");
        }
      },
    );
  }, [navigate, signOut]);
  const value: sessionContextValueType = useMemo(
    () => ({
      authErrorMessage,
      systemErrorMessage,
    }),
    [authErrorMessage, systemErrorMessage],
  );
  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
};

export const useSession = () => {
  return useContext(SessionContext);
};
