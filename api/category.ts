import axios from "axios";

const backendUrl = process.env.EXPO_PUBLIC_BACKEND_URL;

export const getCategories = async (
  accessToken: string,
  refreshToken: string
) => {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${backendUrl}/category/all`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Cookie: `access_token=${accessToken}; refresh_token=${refreshToken}`,
    },
  };

  try {
    const response = await axios.request(config);
    return response.data;
  } catch (err) {
    console.error("API Request failed: ", err);
  }
};
