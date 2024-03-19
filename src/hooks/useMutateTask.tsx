import { useMutation } from "react-query";
import axios from "axios";
import { API_URL } from "../config";
import { SignInRequestBody } from "../pages/SignIn/SignIn";

export const useMutateTask = () => {
  const signInMutation = useMutation(
    (body: SignInRequestBody): Promise<any> => {
      return axios.post(`${API_URL}/auth/admin/login`, body);
    }
  );

  const changePasswordMutation = useMutation(
    (body: SignInRequestBody): Promise<any> => {
      return axios.post(`${API_URL}/auth/admin/login`, body).then(res=>res.data);
    }
  );

  return { signInMutation ,changePasswordMutation};
};
