import { useMutation, useQueryClient } from "@tanstack/react-query";
import useCategoryStore from "../../store/features/category";
import useUserStore from "../../store/features/user";
import { deleteCategory } from "../../api";
import { Category } from "../../app/types";
import * as queryKeys from "../keys";

const useDeleteParentCategory = () => {
  const queryClient = useQueryClient();
  const categoryStore = useCategoryStore();
  const userStore = useUserStore();

  const {
    data: response,
    error,
    mutate,
  } = useMutation({
    mutationKey: [queryKeys.categories.DELETE_CATEGORY],
    mutationFn: (id: string) => deleteCategory(userStore.uid, id),
    onMutate: async (id: string) => {
      await queryClient.cancelQueries({
        queryKey: [
          queryKeys.categories.DELETE_CATEGORY,
          queryKeys.categories.GET_CATEGORIES,
        ],
      });

      const prevData: { data: Array<Category> } = queryClient.getQueryData([
        queryKeys.categories.GET_CATEGORIES,
      ]) ?? { data: [] };

      const updatedCategories = (prevData.data ?? []).filter(
        (category: Category) => category.id !== id
      );
      categoryStore.setCategories(updatedCategories);
      queryClient.setQueryData(
        [queryKeys.categories.GET_CATEGORIES],
        updatedCategories
      );

      return { prevData, updatedCategories };
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.categories.GET_CATEGORIES],
      });
    },
    onError: (_error, _variables, context) => {
      if (context?.prevData?.data) {
        categoryStore.setCategories(context?.prevData?.data);
      }
      queryClient.setQueryData(
        [queryKeys.categories.GET_CATEGORIES],
        context?.prevData
      );
    },
  });

  return {
    mutate,
    response,
    error,
  };
};

export default useDeleteParentCategory;
