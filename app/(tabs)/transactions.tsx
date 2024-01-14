import { StyleSheet, View } from "react-native";
import TransactionAccordion from "../../components/Transactions/TransactionAccordion";

export default function Transactions() {
  return (
    <View style={styles.container}>
      <TransactionAccordion />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    padding: 8,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
