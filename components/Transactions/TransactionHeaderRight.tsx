import React from "react";
import { View, Text, StyleSheet } from "react-native";

type Props = {
  firstAmount: number;
  amount: number;
};

const TransactionHeaderRight = ({ firstAmount, amount }: Props) => {
  const styles = StyleSheet.create({
    accordionEnding: {
      display: "flex",
      flexDirection: "row",
      gap: 16,
    },
    amountSent: {
      color: "red",
    },
    amountReceived: {
      color: "green",
    },
  });

  return (
    <View style={styles.accordionEnding}>
      <Text
        style={firstAmount > 0 ? styles.amountReceived : styles.amountSent}
      >{`${firstAmount < 0 ? "-" : ""}$${Math.abs(firstAmount)}`}</Text>
      <Text style={amount > 0 ? styles.amountReceived : styles.amountSent}>{`${
        amount < 0 && "-"
      }$${Math.abs(amount)}`}</Text>
    </View>
  );
};

export default TransactionHeaderRight;
