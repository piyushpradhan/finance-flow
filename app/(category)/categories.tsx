import { View, StyleSheet } from "react-native";
import CategoriesAccordion from "../../components/Categories/CategoriesAccordion";
import { useAppTheme } from "../../provider/ThemeProvider";

export default function Categories() {
  const theme = useAppTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "flex-start",
      justifyContent: "flex-start",
      padding: theme.spacing(1),
      gap: theme.spacing(1),
    },
  });

  return (
    <View style={styles.container}>
      <CategoriesAccordion />
    </View>
  );
}
