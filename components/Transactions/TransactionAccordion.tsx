import { StyleSheet } from "react-native";

import { Text, View } from "../../components/Themed";
import { Divider, List } from "react-native-paper";

export default function TransactionAccordion() {
  const firstAmount = 14000;
  const amount: number = -12000;
  return (
    <List.AccordionGroup>
      <List.Accordion
        style={styles.accordionParent}
        title="13th"
        titleStyle={styles.accordionTitle}
        right={() => (
          <View style={styles.accordionEnding}>
            <Text
              style={
                firstAmount > 0 ? styles.amountReceived : styles.amountSent
              }
            >{`${firstAmount < 0 ? "-" : ""}$${Math.abs(firstAmount)}`}</Text>
            <Text
              style={amount > 0 ? styles.amountReceived : styles.amountSent}
            >{`${amount < 0 && "-"}$${Math.abs(amount)}`}</Text>
          </View>
        )}
        id="3"
      >
        <List.Item
          style={styles.transactionItem}
          title="Bills > Rent"
          description="Ghar ka kharcha"
          left={() => <Text>HDFC</Text>}
          right={() => (
            <Text
              style={
                firstAmount > 0 ? styles.amountReceived : styles.amountSent
              }
            >{`${firstAmount < 0 ? "-" : ""}$${Math.abs(firstAmount)}`}</Text>
          )}
        />
        <Divider />
        <List.Item
          style={styles.transactionItem}
          title="Bills > Rent"
          description="Ghar ka kharcha"
          left={() => <Text>HDFC</Text>}
          right={() => (
            <Text
              style={amount > 0 ? styles.amountReceived : styles.amountSent}
            >{`${amount < 0 && "-"}$${Math.abs(amount)}`}</Text>
          )}
        />
      </List.Accordion>
    </List.AccordionGroup>
  );
}

const styles = StyleSheet.create({
  accordionParent: {
    minWidth: "100%",
    borderRadius: 4,
  },
  accordionEnding: {
    display: "flex",
    flexDirection: "row",
    gap: 16,
  },
  accordionTitle: {
    fontWeight: "bold",
  },
  amountSent: {
    color: "red",
  },
  amountReceived: {
    color: "green",
  },
  transactionItem: {
    padding: 8,
  },
});
