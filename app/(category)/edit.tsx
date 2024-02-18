import React, { useRef, useState } from "react";
import { v4 } from "uuid";
import {
  View,
  StyleSheet,
  NativeSyntheticEvent,
  TextInputSubmitEditingEventData,
  FlatList,
} from "react-native";
import { Text, IconButton, Input, Switch, Button } from "../../components/ui";
import { useAppTheme } from "../../provider/ThemeProvider";
import { List } from "react-native-paper";
import CategoriesItemRight from "../../components/Categories/CategoriesItemRight";
import CategoryListItem from "../../components/Categories/CategoryListItem";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useUserStore from "../../store/features/user";
import { createCategory } from "../../api";
import * as keys from "../../hooks/keys";
import useCategoryStore from "../../store/features/category";
import {
  NavigationContainerRef,
  useNavigation,
} from "@react-navigation/native";
import { Category, RootStackParamList } from "../types";
import useUpdateCategoryMutation from "../../hooks/category/useUpdateCategory";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function EditCategory(props: any) {
  const theme = useAppTheme();
  const navigation =
    useNavigation<NavigationContainerRef<RootStackParamList>>();
  const categoryStore = useCategoryStore();
  const userStore = useUserStore();
  const queryClient = useQueryClient();

  const containerRef = useRef(null);

  const category: Category = props?.route?.params?.category;

  const [categoryName, setCategoryName] = useState<string>(
    category?.name ?? ""
  );
  const [subCategoryName, setSubcategoryName] = useState<string>("");
  const [hasSubcategory, setHasSubcategory] = useState<boolean>(
    category ? category.subCategories.length > 0 : false
  );
  const [showSubcategoryInput, setShowSubcategoryInput] =
    useState<boolean>(false);

  const existingSubCategories: Array<Category> =
    categoryStore.getSubCategories(category?.id) ?? [];

  const [subCategories, setSubcategories] = useState<Array<Category>>(
    existingSubCategories ?? []
  );

  const { mutate: mutateUpdateCategory } = useUpdateCategoryMutation();

  console.log("Creation payload: ", {
    name: categoryName,
    transactions: [],
    subCategories: subCategories.map((item) => item.name),
    uid: userStore.uid,
    isSubcategory: false,
    type: "expense",
  });

  const saveCategoryMutation = useMutation({
    mutationKey: [keys.categories.ADD_CATEGORY],
    mutationFn: () =>
      createCategory({
        name: categoryName,
        transactions: [],
        subCategories: subCategories.map((item) => item.id),
        uid: userStore.uid,
        isSubcategory: false,
        type: "expense",
      }),

    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: [
          keys.categories.ADD_CATEGORY,
          keys.categories.GET_CATEGORIES,
        ],
      });

      const prevData: { data: Array<Category> } = queryClient.getQueryData([
        keys.categories.GET_CATEGORIES,
      ]) ?? { data: [] };

      const newCategory: Category = {
        id: "random butllshit",
        name: categoryName,
        transactions: [],
        subCategories: subCategories.map((item) => item.id),
        uid: userStore.uid,
        isSubcategory: false,
        type: "expense",
      };

      const updatedCategories = [...prevData.data, newCategory];

      console.log("Inside onMutate", updatedCategories);

      categoryStore.setCategories(updatedCategories);
      queryClient.setQueryData(
        [keys.categories.GET_CATEGORIES],
        updatedCategories
      );

      return { prevData, updatedCategories };
    },
    onSettled: (data) => {
      console.log("Settled", data);
      queryClient.invalidateQueries({
        queryKey: [keys.categories.GET_CATEGORIES],
      });
    },
    onError: (error, _variables, context) => {
      console.error(error);
      if (context?.prevData?.data) {
        categoryStore.setCategories(context?.prevData?.data);
      }
      queryClient.setQueryData(
        [keys.categories.GET_CATEGORIES],
        context?.prevData
      );
    },
  });

  const [editSubcategoryInput, setEditSubcategoryInput] = useState<
    number | null
  >(null);

  const handleSubcategoryToggle = () => {
    setHasSubcategory((prev) => !prev);
  };

  const handleTextChange = (text: string) => {
    setCategoryName(text);
  };

  // Add an input field for a new subCategory
  const addSubcategoryInput = () => {
    setShowSubcategoryInput((prev) => !prev);
  };

  // Update the sub category value
  const updateSubcategory = (
    event: NativeSyntheticEvent<TextInputSubmitEditingEventData>
  ) => {
    const value = event.nativeEvent.text;

    if (value.trim().length === 0) {
      event.preventDefault();
      return;
    }

    const updatedCategory: Category = {
      id: "",
      name: value,
      transactions: [],
      subCategories: [],
      isSubcategory: true,
      type: "expense",
      uid: userStore.uid,
    };

    if (!editSubcategoryInput) {
      value &&
        value.trim().length !== 0 &&
        setSubcategories((prev) => [...prev, updatedCategory]);
    } else {
      const updatedSubcategories = subCategories;
      updatedSubcategories[editSubcategoryInput - 1] = updatedCategory;

      value &&
        value.trim().length !== 0 &&
        setSubcategories(updatedSubcategories);

      setEditSubcategoryInput(null);
    }
    setShowSubcategoryInput(false);
    setSubcategoryName("");
  };

  console.log({ subCategories, subCategoryName, category });

  const styles = StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      padding: theme.spacing(2),
      gap: theme.spacing(1),
      height: "100%",
    },
    categoryFormContainer: {
      flexGrow: 1,
    },
    saveButton: {
      marginBottom: theme.spacing(1),
    },
    subCategoryToggleContainer: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    subCategoriesContainer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    accordionItem: {
      padding: theme.spacing(1),
    },
    subCategoryInputContainer: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginHorizontal: 8,
    },
    subCategoryInput: {
      width: "90%",
      height: 16,
      fontSize: 14,
      paddingVertical: theme.spacing(1),
    },
    subCategoryRemoveContainer: {
      height: "100%",
      flexGrow: 1,
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    addSubcategoryInputButton: {
      display: hasSubcategory ? "flex" : "none",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      paddingVertical: theme.spacing(1.2),
      backgroundColor: theme.colors.primary,
    },
    subCategoriesList: {
      width: "100%",
    },
  });

  return (
    <View style={styles.container} ref={containerRef}>
      <Text
        variant="headlineLarge"
        style={{
          fontWeight: "600",
        }}
      >
        Add category
      </Text>
      <View style={styles.categoryFormContainer}>
        <Input
          value={categoryName}
          onChangeText={handleTextChange}
          mode="outlined"
          label="Category name"
          props={{
            blurOnSubmit: true,
            autoCapitalize: "none",
          }}
        />
        <View style={styles.subCategoryToggleContainer}>
          <Text variant="labelSmall">Has sub-category</Text>
          <Switch
            disabled={categoryName.trim().length === 0}
            value={hasSubcategory}
            toggleSwitch={handleSubcategoryToggle}
          />
        </View>
        <View style={styles.subCategoriesContainer}>
          <FlatList
            data={subCategories}
            style={styles.subCategoriesList}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item: subCategory, index }) => {
              return editSubcategoryInput &&
                editSubcategoryInput - 1 === index ? (
                <CategoryListItem
                  key={index}
                  name={subCategoryName}
                  setName={setSubcategoryName}
                  updateValue={updateSubcategory}
                  setShowSubcategoryInput={setShowSubcategoryInput}
                  handleCancelEdit={() => {
                    setEditSubcategoryInput(null);
                    setShowSubcategoryInput(false);
                  }}
                />
              ) : (
                <List.Item
                  key={index}
                  style={styles.accordionItem}
                  title={subCategory.name}
                  right={() => (
                    <CategoriesItemRight
                      disabled={!hasSubcategory}
                      handleEditItem={() => {
                        setEditSubcategoryInput(index + 1);
                        setSubcategoryName(subCategory.name);
                      }}
                    />
                  )}
                />
              );
            }}
          />
          {showSubcategoryInput && (
            <CategoryListItem
              name={subCategoryName}
              setName={setSubcategoryName}
              updateValue={updateSubcategory}
              setShowSubcategoryInput={setShowSubcategoryInput}
            />
          )}

          {!showSubcategoryInput && hasSubcategory && !editSubcategoryInput && (
            <IconButton
              disabled={!hasSubcategory}
              color={theme.colors.surface}
              name="plus"
              onPress={addSubcategoryInput}
              style={styles.addSubcategoryInputButton}
            />
          )}
        </View>
      </View>
      <Button
        mode="contained"
        handleClick={() => {
          if (category) {
            mutateUpdateCategory({
              category,
              categoryName,
              subCategories: subCategories.map((item) => item.id),
            });
          } else {
            saveCategoryMutation.mutate();
          }

          navigation.goBack();
        }}
      >
        Save
      </Button>
    </View>
  );
}
