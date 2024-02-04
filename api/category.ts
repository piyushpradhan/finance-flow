import axios from "axios";
import type { Category } from "../app/types";

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
      type: data.type,
    },
    config
  );
};

export const deleteSubCategory = (
  accessToken: string,
  refreshToken: string,
  uid: string,
  id: string
) =>
  axios.delete(`${backendUrl}/category/delete`, {
    data: {
      uid,
      id,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Cookie: `access_token=${accessToken}; refresh_token=${refreshToken}`,
      "Content-Type": "application/json",
    },
  });

export const updateCategory = (
  accessToken: string,
  refreshToken: string,
  uid: string,
  id: string,
  category: Category
) => {
  return axios.post(
    `${backendUrl}/category/update`,
    {
      uid,
      id,
      name: category.name,
      icon: category.icon,
      transactions: category.transactions,
      subCategories: category.subCategories,
      isSubCategory: category.isSubcategory,
      type: category.type,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Cookie: `access_token=${accessToken}; refresh_token=${refreshToken}`,
        "Content-Type": "application/json",
      },
    }
  );
};
