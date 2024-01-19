import React from "react";
import { StyleSheet } from "react-native";
import { Text as PaperText } from "react-native-paper";

type Props = {
  style?: React.ComponentProps<typeof PaperText>["style"];
  variant?: React.ComponentProps<typeof PaperText>["variant"];
  children: React.ReactNode;
  props?: Omit<React.ComponentProps<typeof PaperText>, "style" | "variant">;
};

const Text = ({ style, children, variant = "bodyLarge", props }: Props) => {
  const styles = StyleSheet.create({
    text: {},
  });

  return (
    <PaperText variant={variant} style={[styles.text, style]} {...props}>
      {children}
    </PaperText>
  );
};

export default Text;
