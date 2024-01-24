import React, { useRef, useState } from "react";
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
import CategoriesItemLeft from "../../components/Categories/CategoriesItemLeft";
import CategoriesItemRight from "../../components/Categories/CategoriesItemRight";
import CategoryListItem from "../../components/Categories/CategoryListItem";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useUserStore from "../../store/features/user";
import { createCategory } from "../../api";
import useCategoryStore from "../../store/features/category";
import { createCategoryObject } from "../../utils";
import {
  NavigationContainerRef,
  useNavigation,
} from "@react-navigation/native";
import { RootStackParamList } from "../types";

export default function EditCategory() {
  const theme = useAppTheme();
  const containerRef = useRef(null);
  const navigation =
    useNavigation<NavigationContainerRef<RootStackParamList>>();
  const [categoryName, setCategoryName] = useState<string>("");
  const [subcategoryName, setSubcategoryName] = useState<string>("");
  const [hasSubcategory, setHasSubcategory] = useState<boolean>(false);
  const [showSubcategoryInput, setShowSubcategoryInput] =
    useState<boolean>(false);
  const [subcategories, setSubcategories] = useState<string[]>([]);

  const userStore = useUserStore();
  const categoryStore = useCategoryStore();
  const queryClient = useQueryClient();

  const saveCategoryMutation = useMutation({
    mutationFn: () =>
      createCategory(userStore.accessToken, userStore.refreshToken, {
        name: categoryName,
        transactions: [],
        subCategories: subcategories,
        uid: userStore.uid,
      }),
    onSuccess: (data) => {
      const formattedData = data.data;
      // Sanitize the data obtained
      // TODO: Try to sanitize data on the backend
      delete formattedData.__v;
      delete formattedData._id;

      if (formattedData.subCategories.length !== 0) {
        const subCategories = formattedData.subCategories.map((name: string) =>
          createCategoryObject(name, userStore.uid)
        );
        categoryStore.addCategories(subCategories);
      }

      categoryStore.addCategories([formattedData]);
      queryClient.invalidateQueries({ queryKey: ["categories"] });
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

  // Add an input field for a new subcategory
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

    if (!editSubcategoryInput) {
      value &&
        value.trim().length !== 0 &&
        setSubcategories((prev) => [...prev, value]);
    } else {
      const updatedSubcategories = subcategories;
      updatedSubcategories[editSubcategoryInput - 1] = value;

      value &&
        value.trim().length !== 0 &&
        setSubcategories(updatedSubcategories);

      setEditSubcategoryInput(null);
    }
    setShowSubcategoryInput(false);
    setSubcategoryName("");
  };

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
    subcategoryToggleContainer: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    subcategoriesContainer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    accordionItem: {
      padding: theme.spacing(1),
    },
    subcategoryInputContainer: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginHorizontal: 8,
    },
    subcategoryInput: {
      width: "90%",
      height: 16,
      fontSize: 14,
      paddingVertical: theme.spacing(1),
    },
    subcategoryRemoveContainer: {
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
    subcategoriesList: {
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
        <View style={styles.subcategoryToggleContainer}>
          <Text variant="labelSmall">Has sub-category</Text>
          <Switch
            disabled={categoryName.trim().length === 0}
            value={hasSubcategory}
            toggleSwitch={handleSubcategoryToggle}
          />
        </View>
        <View style={styles.subcategoriesContainer}>
          <FlatList
            data={subcategories}
            style={styles.subcategoriesList}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item: subcategory, index }) => {
              return editSubcategoryInput &&
                editSubcategoryInput - 1 === index ? (
                <CategoryListItem
                  key={index}
                  name={subcategoryName}
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
                  title={subcategory}
                  left={() => <CategoriesItemLeft disabled={!hasSubcategory} />}
                  right={() => (
                    <CategoriesItemRight
                      disabled={!hasSubcategory}
                      handleEditItem={() => {
                        setEditSubcategoryInput(index + 1);
                        setSubcategoryName(subcategory);
                      }}
                    />
                  )}
                />
              );
            }}
          />
          {showSubcategoryInput && (
            <CategoryListItem
              name={subcategoryName}
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
          saveCategoryMutation.mutate();
          navigation.goBack();
        }}
      >
        Save
      </Button>
    </View>
  );
}
