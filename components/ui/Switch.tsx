import React from "react";
import { StyleSheet } from "react-native";
import { Switch as PaperSwitch } from "react-native-paper";
import { useAppTheme } from "../../provider/ThemeProvider";

type Props = {
  disabled?: boolean;
  value: boolean;
  color?: string;
  style?: React.ComponentProps<typeof PaperSwitch>["style"];
  toggleSwitch?: React.ComponentProps<typeof PaperSwitch>["onChange"];
};

const Switch = ({
  disabled = false,
  value,
  color,
  style: customStyle = {},
  toggleSwitch = () => {},
}: Props) => {
  const theme = useAppTheme();

  const styles = StyleSheet.create({
    switch: {
      transform: "scale(0.8)",
    },
  });

  return (
    <PaperSwitch
      onChange={toggleSwitch}
      disabled={disabled}
      value={value}
      color={color ?? theme.colors.primary}
      style={[styles.switch, customStyle]}
      theme={theme}
    />
  );
};

export default Switch;
