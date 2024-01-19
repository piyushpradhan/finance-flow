import React from "react";
import { Text } from "react-native";

type Props = {
  label: string;
};

const TransactionItemLeft = ({ label }: Props) => {
  return <Text>{label}</Text>;
};

export default TransactionItemLeft;
