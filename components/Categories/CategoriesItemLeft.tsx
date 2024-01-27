import React from "react";
import { View, StyleSheet } from "react-native";
import { IconButton } from "../../components/ui";
import { useAppTheme } from "../../provider/ThemeProvider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useUserStore from "../../store/features/user";
import { deleteSubCategory } from "../../api";
import useCategoryStore from "../../store/features/category";

type Props = {
  subCategoryName: string;
  disabled?: boolean;
};

const CategoriesItemLeft = ({ disabled = false, subCategoryName }: Props) => {
  const userStore = useUserStore();
  const categoryStore = useCategoryStore();
  const queryClient = useQueryClient();

  const deleteSubCategoryMutation = useMutation({
    mutationKey: ["deleteSubCategory"],
    mutationFn: () =>
      deleteSubCategory(
        userStore.accessToken,
        userStore.refreshToken,
        userStore.uid,
        subCategoryName
      ),
    onMutate: () => {
      categoryStore.deleteCategory({ categoryName: subCategoryName });
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
