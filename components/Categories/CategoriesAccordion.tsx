import React from "react";
import { Accordion } from "../ui";
import CategoriesItemLeft from "./CategoriesItemLeft";
import CategoriesItemRight from "./CategoriesItemRight";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../../api";
import useUserStore from "../../store/features/user";
import { FlatList } from "react-native";

import type { Category } from "../../app/types";

const CategoriesAccordion = () => {
  const userStore = useUserStore();

  const categoryQuery = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(userStore.accessToken, userStore.refreshToken),
  });

  const categories: Array<Category> = categoryQuery.data.map(
    (category: Category) => ({
      title: category.name,
      leftComponent: <CategoriesItemLeft />,
      rightComponent: <CategoriesItemRight />,
    })
  );

  return (
    <FlatList
      data={categoryQuery.data}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({ item: category }) => (
        <Accordion
          id="bills"
          title={"Bills"}
          rightComponent={null}
          items={category.subCategories}
        />
      )}
    />
  );
};

export default CategoriesAccordion;
