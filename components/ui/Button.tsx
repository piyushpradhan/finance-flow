import React from "react";
import { StyleSheet } from "react-native";
import { Button as PaperButton } from "react-native-paper";
import { useAppTheme } from "../../provider/ThemeProvider";
import type { IconSource } from "react-native-paper/lib/typescript/components/Icon";

type Props = {
  children: React.ReactNode;
  handleClick: () => void;
  icon?: IconSource;
  mode?: "text" | "outlined" | "contained" | "elevated" | "contained-tonal";
};

const Button = ({ children, mode, icon, handleClick }: Props) => {
  const theme = useAppTheme();

  console.log({ theme });

  return (
    <PaperButton
      icon={icon}
      mode={mode}
      onPress={handleClick}
      style={[
        styles.button,
        {
          backgroundColor: theme.colors.error,
        },
      ]}
    >
      {children}
    </PaperButton>
  );
};

const styles = StyleSheet.create({
  button: {},
});

export default Button;
