import React from "react";
import { View, StyleSheet } from "react-native";
import { IconButton } from "../../components/ui";
import { useAppTheme } from "../../provider/ThemeProvider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useUserStore from "../../store/features/user";
import { deleteSubCategory } from "../../api";
import useCategoryStore from "../../store/features/category";
import { Category } from "../../app/types";

type Props = {
  subCategory: Category | string;
  disabled?: boolean;
};

const CategoriesItemLeft = ({ disabled = false, subCategory }: Props) => {
  const userStore = useUserStore();
  const categoryStore = useCategoryStore();
  const queryClient = useQueryClient();

  const subCategoryName =
    typeof subCategory === "string" ? subCategory : subCategory?.name ?? "";

  const deleteSubCategoryMutation = useMutation({
    mutationKey: ["deleteSubCategory"],
    mutationFn: () => {
      const targetCategory = categoryStore.categoriesByName[subCategoryName];
      return deleteSubCategory(userStore.uid, targetCategory.id);
    },
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: ["categories", "deleteSubCategory"],
      });
      const prevData: { data: Category[] } = queryClient.getQueryData([
        "categories",
      ]) ?? { data: [] };

      const categoryToBeDeleted =
        categoryStore.categoriesByName[subCategoryName];

      const updatedCategories = (prevData?.data ?? []).filter((category) => {
        if (categoryToBeDeleted.isSubcategory) {
          const updatedParent =
            category.subCategories.includes(subCategoryName) &&
            category.subCategories.filter((item) => item !== subCategoryName);
          return updatedParent;
        }
        return category.name !== subCategoryName;
      });

      categoryStore.deleteCategory({ categoryName: subCategoryName });
      queryClient.setQueryData(["categories"], updatedCategories);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const theme = useAppTheme();

  const styles = StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "row",
      gap: theme.spacing(2),
      justifyContent: "space-between",
      alignItems: "center",
    },
  });

  return (
    <View style={styles.container}>
      <IconButton
        name="trash-2"
        disabled={disabled}
        onPress={() => {
          deleteSubCategoryMutation.mutate();
        }}
      />
    </View>
  );
};

export default CategoriesItemLeft;
