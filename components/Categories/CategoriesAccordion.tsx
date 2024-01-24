import React, { useEffect, useState } from "react";
import { Accordion } from "../ui";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../../api";
import useUserStore from "../../store/features/user";
import { FlatList } from "react-native";

import useCategoryStore from "../../store/features/category";
import Loader from "../Loader";
import { Category } from "../../app/types";
import CategoriesItemLeft from "./CategoriesItemLeft";
import CategoriesItemRight from "./CategoriesItemRight";
import { ListItemProps } from "../ui/types";

const CategoriesAccordion = () => {
  const userStore = useUserStore();
  const categoryStore = useCategoryStore();
  // TODO: Better naming
  const [categoryAccordion] = useState<Map<string, ListItemProps[]>>(
    new Map<string, ListItemProps[]>()
  );

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
        responseData.forEach((category: Category) => {
          if (category.subCategories && category.subCategories.length !== 0) {
            category.subCategories.forEach((subCategory: string) => {
              // TODO: Better name please
              const subItems = categoryAccordion.get(category._id) ?? [];
              categoryAccordion.set(category._id, [
                ...subItems,
                {
                  title: subCategory,
                  leftComponent: <CategoriesItemLeft />,
                  rightComponent: <CategoriesItemRight />,
                },
              ]);
            });
          }
        });
      } else if (isError) {
        // Handle the error condition
        console.error("Error fetching categories: ", error);
      }
    }
  }, [response?.data, isSuccess, isFetched]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <FlatList
      data={categoryStore.categories}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({ item: category }) => (
        <Accordion
          id={category.id}
          title={category.name}
          rightComponent={<CategoriesItemRight />}
          items={categoryAccordion.get(category._id ?? "") ?? []}
        />
      )}
    />
  );
};

export default CategoriesAccordion;
