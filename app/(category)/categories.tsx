import { StyleSheet, SafeAreaView } from "react-native";
import CategoriesAccordion from "../../components/Categories/CategoriesAccordion";

export default function Categories() {
  const styles = StyleSheet.create({
    container: {
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      justifyContent: "space-between",
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <CategoriesAccordion />
    </SafeAreaView>
  );
}
