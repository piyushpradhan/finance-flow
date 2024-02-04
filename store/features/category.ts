import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import type { Category, Categories } from "../../app/types";

export interface ICategoryState extends Categories {
  getParentCategories: () => Array<Category>;
  setCategories: (categories: Array<Category>) => void;
  getCategories: () => Array<Category>;
  addCategories: (categories: Array<Category>) => void;
  // updateCategory: (updated: Category) => void;
  deleteCategory: (
    params: { categoryId: string } | { categoryName: string }
  ) => void;
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
      categoriesById: {},
      categoriesByName: {},
      getParentCategories: () =>
        get().categories.filter((category) => !category.isSubcategory),
      setCategories: (categories: Array<Category>) => {
        return set({
          categories,
          categoriesById: categories.reduce((byId, category) => {
            byId[category.id] = category;
            return byId;
          }, get().categoriesById),
          categoriesByName: categories.reduce((byName, category) => {
            byName[category.name] = category;
            return byName;
          }, get().categoriesByName),
        });
      },
      getCategories: () => get().categories,
      addCategories: (categories: Array<Category>) =>
        set({
          categories: [...get().categories, ...categories],
          categoriesById: categories.reduce((updated, category) => {
            updated[category.id] = category;
            return updated;
          }, get().categoriesById),
          categoriesByName: categories.reduce((updated, category) => {
            updated[category.name] = category;
            return updated;
          }, get().categoriesByName),
        }),
      deleteCategory: (
        params: { categoryId: string } | { categoryName: string }
      ) =>
        set((state) => {
          const categoriesByName = state.categoriesByName;
          const categoriesById = state.categoriesById;

          if (
            "categoryId" in params &&
            params.categoryId in state.categoriesById
          ) {
            const categoryNameToDelete =
              state.categoriesById[params.categoryId]?.name;
            delete categoriesById[params.categoryId];
            categoryNameToDelete &&
              delete categoriesByName[categoryNameToDelete];
          } else if (
            "categoryName" in params &&
            params.categoryName in state.categoriesByName
          ) {
            const categoryIdToDelete =
              state.categoriesByName[params.categoryName]?.id;
            delete categoriesByName[params.categoryName];
            categoryIdToDelete && delete categoriesByName[categoryIdToDelete];
          }

          return {
            categories: Object.values(categoriesById),
            categoriesById: categoriesById,
            categoriesByName: categoriesByName,
          };
        }),
    }))
  )
);

export default useCategoryStore;
