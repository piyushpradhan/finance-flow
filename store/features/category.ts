import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { Category, Categories } from "../../models";

export interface ICategoryState extends Categories {
  setCategories: (categories: Array<Category>) => void;
  getCategories: () => Array<Category>;
  addCategories: (categories: Array<Category>) => void;
  // updateCategory: (updated: Category) => void;
  // deleteCategory: (categoryId: string) => void;
  // addCategory: (newCategory: Category) => void;
  // getCategory: (categoryId: string) => Category;
  // getSubcategories: (categoryId: string) => Array<Category>;
  // updateSubcategories: (
  //   categoryId: string,
  //   updated: Array<Category>
  // ) => void;
  // deleteSubcategory: (
  //   categoryId: string,
  //   subcategoryId: string
  // ) => void;
}

const useCategoryStore = create<ICategoryState>()(
  devtools(
    immer((set, get) => ({
      categories: [],
      setCategories: (categories: Array<Category>) => set({ categories }),
      getCategories: () => get().categories,
      addCategories: (categories: Array<Category>) =>
        set({ categories: [...get().categories, ...categories] }),
    }))
  )
);

export default useCategoryStore;
