import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCategories } from "../../api";
import useUserStore from "../../store/features/user";
import { useEffect } from "react";
import useCategoryStore from "../../store/features/category";

const useGetAllCategories = () => {
  const queryClient = useQueryClient();
  const userStore = useUserStore();
  const categoryStore = useCategoryStore();

  const {
    data: response,
    isFetched,
    isSuccess,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["getCategories"],
    queryFn: () => {
      return getCategories(userStore.uid);
    },
  });

  useEffect(() => {
    if (isFetched) {
      if (isSuccess) {
        const responseData = response?.data ?? [];
        responseData && categoryStore.setCategories(responseData);
        queryClient.setQueryData(["getCategories"], () => {
          return {
            data: responseData,
          };
        });
      } else if (isError) {
        console.error("Error fetching categories: ", error);
      }
    }
  }, [response, isLoading]);

  return {
    isLoading,
    response,
    error,
  };
};

export default useGetAllCategories;
