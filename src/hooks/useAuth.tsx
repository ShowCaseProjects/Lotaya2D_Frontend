import {
  ReactNode,
  FC,
  createContext,
  useState,
  useMemo,
  useContext,
} from "react";
import { useLocalStorage } from "./useLocalStorage";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext({} as any);

type Props = {
  children: ReactNode;
};

export interface User {
  userId: string;
  name: String;
  roleId: number;
}

export type authContextValueType = {
  isSignIn: string;
  signin: (id: string, name: string, roleId: number) => Promise<void>;
  updateUserInfo: (id: string, name: string, roleId: number) => Promise<void>;
  signOut: () => void;
  userInfo: User;
};

export const AuthProvider: FC<Props> = ({ children }) => {
  const [userInfo, setUserInfo] = useLocalStorage("userInfo", "");
  const [isSignIn, setIsSignIn] = useLocalStorage("isSignInInfo", "");
  const [signInUserId, setSignInUserId] = useState("");
  const [signInUserName, setSigUnInserName] = useState("");
  const [signInRoleId, setSignInRoleId] = useState(0);
  const navigate = useNavigate();

  const signin = async (id: string, name: string, roleId: number) => {
    setIsSignIn(id);
    const registerUserInfo: User = { userId: id, name: name, roleId: roleId };
    setUserInfo(registerUserInfo);
    navigate("/");
  };

  const updateUserInfo = async (
    updateUserId: string,
    updateUserName: string,
    updateRoleId: number,
  ) => {
    setIsSignIn(updateUserId);
    const updateUserInfo: User = {
      userId: updateUserId,
      name: updateUserName,
      roleId: updateRoleId,
    };
    setUserInfo(updateUserInfo);
  };

  const signOut = () => {
    setIsSignIn("");
    setSignInUserId("");
    setSigUnInserName("");
    setSignInRoleId(0);

    const signOutUserInfo = {
      userId: signInUserId,
      name: signInUserName,
      roleId: signInRoleId,
    };
    setUserInfo(signOutUserInfo);
    navigate("/signIn", { replace: true });
  };

  const value: authContextValueType = useMemo(
    () => ({
      isSignIn,
      userInfo,
      signin,
      updateUserInfo,
      signOut,
    }),
    [isSignIn, userInfo],
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
