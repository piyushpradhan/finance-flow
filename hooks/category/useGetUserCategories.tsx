import { useQuery } from "@tanstack/react-query";
import useUserStore from "../../store/features/user";
import { getUserDetails } from "../../api/user";

const useGetUserCategories = () => {
  // const queryClient = useQueryClient();
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
    queryFn: () => getUserDetails(userStore.uid),
  });

  return {
    response,
    isFetched,
    isSuccess,
    isLoading,
    isError,
    error,
  };
};

export default useGetUserCategories;
