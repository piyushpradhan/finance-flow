import React from "react";
import { View, StyleSheet } from "react-native";
import { IconButton } from "../../components/ui";
import { useAppTheme } from "../../provider/ThemeProvider";

type Props = {
  disabled?: boolean;
};

const CategoriesItemLeft = ({ disabled = false }: Props) => {
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
      <IconButton name="trash-2" disabled={disabled} />
    </View>
  );
};

export default CategoriesItemLeft;
