import React from "react";
import { Accordion } from "../ui";
import { FlatList, StyleSheet } from "react-native";

import useCategoryStore from "../../store/features/category";
import Loader from "../Loader";
import CategoriesItemLeft from "./CategoriesItemLeft";
import CategoriesItemRight from "./CategoriesItemRight";
import { ListItemProps } from "../ui/types";
import { useAppTheme } from "../../provider/ThemeProvider";
import useGetAllCategories from "../../hooks/useGetAllCategories";

const CategoriesAccordion = () => {
  const theme = useAppTheme();
  const categoryStore = useCategoryStore();
  const categories = categoryStore.getParentCategories();

  const { isLoading } = useGetAllCategories();

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
      data={categories}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({ item: category }) => {
        const categoryItems: ListItemProps[] = category.subCategories.map(
          (subCategoryId: string) => {
            const subCategoryName: string =
              categoryStore.categoriesById[subCategoryId]?.name ?? "";
            return {
              title: subCategoryName,
              leftComponent: (
                <CategoriesItemLeft subCategoryName={subCategoryName} />
              ),
              rightComponent: <CategoriesItemRight parentCategory={category} />,
            };
          }
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
