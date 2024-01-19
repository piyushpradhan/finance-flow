import React from "react";
import { Text, StyleSheet } from "react-native";

type Props = {
  firstAmount: number;
  amount: number;
};

const TransactionItemRight = ({ firstAmount }: Props) => {
  const styles = StyleSheet.create({
    accordionTitle: {
      fontWeight: "bold",
    },
    amountSent: {
      color: "red",
    },
    amountReceived: {
      color: "green",
    },
  });

  return (
    <Text
      style={firstAmount > 0 ? styles.amountReceived : styles.amountSent}
    >{`${firstAmount < 0 ? "-" : ""}$${Math.abs(firstAmount)}`}</Text>
  );
};

export default TransactionItemRight;
