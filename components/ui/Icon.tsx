import React from "react";
import Icon from "react-native-vector-icons/Feather";
import { useAppTheme } from "../../provider/ThemeProvider";

type Props = {
  name: string;
  size?: number;
  color?: string;
};

const ThemedIcon = ({ name, size = 16, color }: Props) => {
  const theme = useAppTheme();

  return (
    <Icon
      name={name}
      size={size}
      color={color ?? theme.colors.secondaryFixedDim}
    />
  );
};

export default ThemedIcon;
