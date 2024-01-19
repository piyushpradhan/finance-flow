import React from "react";
import { StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";

type Props = {
  mode?: React.ComponentProps<typeof TextInput>["mode"];
  style?: React.ComponentProps<typeof TextInput>["style"];
  label: string;
  onSubmit?: React.ComponentProps<typeof TextInput>["onSubmitEditing"];
  value: React.ComponentProps<typeof TextInput>["value"];
  onChangeText: React.ComponentProps<typeof TextInput>["onChangeText"];
  props?: Omit<
    React.ComponentProps<typeof TextInput>,
    "mode" | "style" | "onSubmitEditing" | "value" | "onChangeText"
  >;
  shouldShowError?: boolean;
};

const Input = ({
  mode = "flat",
  style: customStyles,
  label,
  onSubmit = () => {},
  props,
  value,
  onChangeText,
  shouldShowError = false,
}: Props) => {
  const styles = StyleSheet.create({
    input: {},
  });

  return (
    <TextInput
      error={shouldShowError}
      value={value}
      onChangeText={onChangeText}
      style={[styles.input, customStyles]}
      mode={mode}
      onSubmitEditing={onSubmit}
      label={label}
      {...props}
    />
  );
};

export default Input;
