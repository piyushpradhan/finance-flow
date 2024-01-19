import { DefaultTheme } from "react-native-paper";
import { DefaultTheme as NavigationDefaultTheme } from "@react-navigation/native";
import Spacing from "../../../constants/spacing";
import BorderRadius from "../../../constants/borderRadius";

export const lightTheme = {
  ...DefaultTheme,
  ...NavigationDefaultTheme,
  roundness: 1,
  borderRadius: BorderRadius,
  spacing: (spacing: number) => spacing * Spacing.lg,
  colors: {
    ...DefaultTheme.colors,
    ...NavigationDefaultTheme.colors,
    secondaryFixedDim: "#BFC6DC",
  },
  //   fonts: configureFonts(fontConfig),
};
