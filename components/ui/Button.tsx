import React from "react";
import { StyleSheet } from "react-native";
import { Button as PaperButton } from "react-native-paper";
import { useAppTheme } from "../../provider/ThemeProvider";
import type { IconSource } from "react-native-paper/lib/typescript/components/Icon";

type Props = {
  children: React.ReactNode;
  handleClick: () => void;
  icon?: IconSource;
  style?: React.ComponentProps<typeof PaperButton>["style"];
  mode?: React.ComponentProps<typeof PaperButton>["mode"];
};

const Button = ({
  children,
  mode = "text",
  icon,
  handleClick,
  style: customStyles,
}: Props) => {
  const theme = useAppTheme();

  const getBackgroundColor = (mode: string) => {
    switch (mode) {
      case "error":
        return theme.colors.error;
      default:
        return theme.colors.primary;
    }
  };

  const styles = StyleSheet.create({
    button: {
      padding: theme.spacing(0),
      backgroundColor: getBackgroundColor(mode),
    },
  });

  return (
    <PaperButton
      icon={icon}
      mode={mode}
      onPress={handleClick}
      style={[styles.button, customStyles]}
    >
      {children}
    </PaperButton>
  );
};

export default Button;
