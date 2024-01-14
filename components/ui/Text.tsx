import React from "react";
import { Platform, StyleSheet } from "react-native";
import { Text as DefaultText } from "react-native";

type Props = {
  style?: React.ComponentProps<typeof DefaultText>["style"];
  children: React.ReactNode;
};

export default function Text({ style, children }: Props) {
  return <DefaultText style={[styles.text, style]}>{children}</DefaultText>;
}

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
  },
});
