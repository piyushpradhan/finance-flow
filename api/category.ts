import axios from "./index";
import type { Category } from "../app/types";

const backendUrl = process.env.EXPO_PUBLIC_BACKEND_URL;

export const getCategories = (uid: string) =>
  axios.get(`${backendUrl}/category/all`, {
    params: {
      uid: uid,
    },
  });

export const createCategory = (data: Omit<Category, "id">) =>
  axios.post(`${backendUrl}/category/create`, {
    name: data.name,
    transactions: data.transactions ?? [],
    subCategories: data.subCategories ?? [],
    icon: data.icon,
    uid: data.uid,
    type: data.type,
  });

export const deleteSubCategory = (uid: string, id: string) =>
  axios.delete(`${backendUrl}/category/delete`, {
    data: {
      uid,
      id,
    },
  });

export const updateCategory = (uid: string, id: string, category: Category) => {
  return axios.post(`${backendUrl}/category/update`, {
    uid,
    id,
    name: category.name,
    icon: category.icon,
    transactions: category.transactions,
    subCategories: category.subCategories,
    isSubCategory: category.isSubcategory,
    type: category.type,
  });
};

export const deleteCategory = (uid: string, id: string) => {
  return axios.delete(`${backendUrl}/category/delete`, {
    data: {
      uid,
      id,
    },
  });
};
