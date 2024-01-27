import axios from "axios";
import { Category } from "../models";

const backendUrl = process.env.EXPO_PUBLIC_BACKEND_URL;

export const getCategories = (
  accessToken: string,
  refreshToken: string,
  uid: string
) =>
  axios({
    method: "post",
    url: `${backendUrl}/category/all`,
    data: { uid },
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      Cookie: `access_token=${accessToken}; refresh_token=${refreshToken}`,
    },
  });

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

export const deleteSubCategory = (
  accessToken: string,
  refreshToken: string,
  uid: string,
  subCategoryName: string
) =>
  axios.delete(`${backendUrl}/category/delete`, {
    data: {
      uid,
      name: subCategoryName,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Cookie: `access_token=${accessToken}; refresh_token=${refreshToken}`,
      "Content-Type": "application/json",
    },
  });
