import React from "react";
import Icon from "./Icon";
import { GestureResponderEvent } from "react-native";
import { TouchableRipple, TouchableRippleProps } from "react-native-paper";
import { useAppTheme } from "../../provider/ThemeProvider";
import { IconProps } from "react-native-paper/lib/typescript/components/MaterialCommunityIcon";

type Props = {
  name: string;
  disabled?: boolean;
  onPress?: (e: GestureResponderEvent) => void;
  size?: number;
  color?: string;
  style?: TouchableRippleProps["style"];
  props?: Omit<
    IconProps,
    "name" | "disabled" | "onPress" | "size" | "color" | "style"
  >;
};

const IconButton = ({
  name,
  disabled = false,
  onPress = () => {},
  size,
  color,
  props,
  style: customStyle = {},
}: Props) => {
  const theme = useAppTheme();

  return (
    <TouchableRipple style={customStyle} disabled={disabled} onPress={onPress}>
      <Icon
        name={name}
        size={size}
        color={color ?? theme.colors.secondaryFixedDim}
        {...props}
      />
    </TouchableRipple>
  );
};

export default IconButton;
