import { DefaultTheme } from "react-native-paper";
import { DefaultTheme as NavigationDefaultTheme } from "@react-navigation/native";

const DEFAULT_SPACING = 8;

export const lightTheme = {
  ...DefaultTheme,
  ...NavigationDefaultTheme,
  roundness: 1,
  spacing: (spacing: number) => spacing * DEFAULT_SPACING,
  colors: {
    ...DefaultTheme.colors,
    ...NavigationDefaultTheme.colors,
  },
  //   fonts: configureFonts(fontConfig),
};
