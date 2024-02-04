import axios from "axios";

const backendUrl = process.env.EXPO_PUBLIC_BACKEND_URL;

export const getUserDetails = (
  accessToken: string,
  refreshToken: string,
  uid: string
) =>
  axios.get(`${backendUrl}/user/${uid}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer: ${accessToken}`,
      Cookie: `access_token=${accessToken}; refresh_token=${refreshToken}`,
    },
  });
