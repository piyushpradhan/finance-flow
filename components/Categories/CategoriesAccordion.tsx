import React, { useEffect } from "react";
import { Accordion } from "../ui";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCategories } from "../../api";
import useUserStore from "../../store/features/user";
import { FlatList, StyleSheet } from "react-native";

import useCategoryStore from "../../store/features/category";
import Loader from "../Loader";
import CategoriesItemLeft from "./CategoriesItemLeft";
import CategoriesItemRight from "./CategoriesItemRight";
import { ListItemProps } from "../ui/types";
import { useAppTheme } from "../../provider/ThemeProvider";

const CategoriesAccordion = () => {
  const theme = useAppTheme();
  const queryClient = useQueryClient();
  const userStore = useUserStore();
  const categoryStore = useCategoryStore();

  const {
    data: response,
    isSuccess,
    isFetched,
    isError,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: () =>
      getCategories(
        userStore.accessToken,
        userStore.refreshToken,
        userStore.uid
      ),
  });

  useEffect(() => {
    if (isFetched) {
      if (isSuccess) {
        const responseData = response?.data ?? [];
        responseData && categoryStore.setCategories(responseData);
        queryClient.setQueryData(["categories"], () => {
          return {
            data: responseData,
          };
        });
      } else if (isError) {
        // TODO: Show a snackbar or something
        console.error("Error fetching categories: ", error);
      }
    }
  }, [response?.data, isSuccess, isFetched]);

  if (isLoading) {
    return <Loader />;
  }

  const styles = StyleSheet.create({
    accordionContainer: {
      display: "flex",
      flexDirection: "column",
      paddingHorizontal: theme.spacing(1),
    },
  });

  return (
    <FlatList
      style={styles.accordionContainer}
      data={categoryStore.categories}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({ item: category }) => {
        const categoryItems: ListItemProps[] = category.subCategories.map(
          (subCategory: string) => ({
            title: subCategory,
            leftComponent: <CategoriesItemLeft subCategoryName={subCategory} />,
            rightComponent: <CategoriesItemRight />,
          })
        );

        return (
          <Accordion
            id={category.id}
            title={category.name}
            rightComponent={<CategoriesItemRight />}
            items={categoryItems}
          />
        );
      }}
    />
  );
};

export default CategoriesAccordion;
