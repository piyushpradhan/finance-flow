import { useQuery, useQueryClient } from "@tanstack/react-query";
import useUserStore from "../store/features/user";

const useGetUserCategories = () => {
  const queryClient = useQueryClient();
  const userStore = useUserStore();

  const {
    data: response,
    isFetched,
    isSuccess,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["getUserCategories"],
    queryFn: () => getUserDetails(),
  });
};
