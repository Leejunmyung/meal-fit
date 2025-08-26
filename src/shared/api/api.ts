import { api } from "./axiosInstance";

export const postSignUp = (params: SignUpParams) => {
  const response = api.post(`/api/auth/signup`, params);
  return response;
}

export const postLogIn = (params: LogInParams) => {
  const response = api.post(`/api/auth/login`, params);
  return response;
}