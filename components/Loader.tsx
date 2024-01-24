import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "./ui";

type Props = {
  message?: string;
};

const Loader = ({ message = "Loading..." }: Props) => {
  const styles = StyleSheet.create({
    loaderContainer: {
      width: "100%",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  });

  return (
    <View style={styles.loaderContainer}>
      <Text variant="labelSmall">{message}</Text>
    </View>
  );
};

export default Loader;
