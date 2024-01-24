import axios from "axios";
import { Category } from "../models";

const backendUrl = process.env.EXPO_PUBLIC_BACKEND_URL;

export const getCategories = (
  accessToken: string,
  refreshToken: string,
  uid: string
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      Cookie: `access_token=${accessToken}; refresh_token=${refreshToken}`,
    },
  };

  return axios.post(`${backendUrl}/category/all`, { uid }, config);
};

export const createCategory = (
  accessToken: string,
  refreshToken: string,
  data: Omit<Category, "id">
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Cookie: `access_token=${accessToken}; refresh_token=${refreshToken}`,
      "Content-Type": "application/json",
    },
  };

  return axios.post(
    `${backendUrl}/category/create`,
    {
      name: data.name,
      transactions: data.transactions ?? [],
      subCategories: data.subCategories ?? [],
      icon: data.icon,
      uid: data.uid,
    },
    config
  );
};
