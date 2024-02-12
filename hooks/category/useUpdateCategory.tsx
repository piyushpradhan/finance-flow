import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as queryKeys from "../keys";
import { updateCategory } from "../../api";
import useUserStore from "../../store/features/user";
import useCategoryStore from "../../store/features/category";
import { Category } from "../../app/types";
import { AxiosResponse } from "axios";

type Variables = {
  category: Category;
  categoryName: string;
  subCategories: Array<string>;
};

const useUpdateCategoryMutation = () => {
  const userStore = useUserStore();
  const categoryStore = useCategoryStore();
  const queryClient = useQueryClient();

  const { mutate } = useMutation<
    AxiosResponse<unknown, unknown>,
    Error,
    { category: Category; categoryName: string; subCategories: Array<string> }
  >({
    mutationKey: [queryKeys.categories.UPDATE_CATEGORY],
    mutationFn: ({ category, categoryName, subCategories }: Variables) =>
      updateCategory(userStore.uid, category?.id, {
        id: category?.id,
        name: categoryName,
        transactions: category?.transactions,
        subCategories,
        uid: userStore.uid,
        isSubcategory: false,
        type: "expense",
      }),
    onMutate: async ({ category, categoryName, subCategories }: Variables) => {
      await queryClient.cancelQueries({
        queryKey: [
          queryKeys.categories.GET_CATEGORIES,
          queryKeys.categories.ADD_CATEGORY,
        ],
      });

      const prevData: { data: Array<Category> } = queryClient.getQueryData([
        queryKeys.categories.GET_CATEGORIES,
      ]) ?? { data: [] };

      const updatedCategory: Category = {
        id: category.id,
        name: categoryName,
        transactions: category.transactions ?? [],
        subCategories,
        uid: userStore.uid,
        isSubcategory: false,
        type: category.type,
      };

      const updatedCategories = prevData.data.map((item) => {
        if (item.id === category.id) {
          return updatedCategory;
        }
        return item;
      });

      categoryStore.setCategories(updatedCategories);
      queryClient.setQueryData(
        [queryKeys.categories.GET_CATEGORIES],
        updatedCategories
      );
    },
  });

  return { mutate };
};

export default useUpdateCategoryMutation;
