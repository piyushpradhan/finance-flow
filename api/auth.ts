import axios from "./index";

const backendUrl = process.env.EXPO_PUBLIC_BACKEND_URL;

export const login = (username: string, password: string) =>
  axios.post(
    `${backendUrl}/auth/login`,
    {
      username,
      password,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

export const loginWithGoogle = () => axios.get(`${backendUrl}/auth/google`);

export const logout = () => axios.get(`${backendUrl}/auth/logout`);
