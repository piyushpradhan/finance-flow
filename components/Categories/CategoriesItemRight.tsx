import React from "react";
import { View, StyleSheet } from "react-native";
import { IconButton } from "../../components/ui";
import { useAppTheme } from "../../provider/ThemeProvider";
import {
  NavigationContainerRef,
  useNavigation,
} from "@react-navigation/native";
import { RootStackParamList } from "../../app/types";

type Props = {
  handleEditItem?: (data?: unknown) => void;
  disabled?: boolean;
};

const CategoriesItemRight = ({ handleEditItem, disabled = false }: Props) => {
  const theme = useAppTheme();
  const navigation =
    useNavigation<NavigationContainerRef<RootStackParamList>>();

  const handleEdit = () => {
    if (handleEditItem) {
      // Shows the input instead of the subcategory
      handleEditItem();
    }
    navigation.navigate("(category)/edit");
  };

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
        name="edit"
        onPress={handleEditItem ?? handleEdit}
        disabled={disabled}
      />
      <IconButton name="menu" disabled={disabled} />
    </View>
  );
};

export default CategoriesItemRight;
