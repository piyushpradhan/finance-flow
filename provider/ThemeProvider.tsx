import { PaperProvider, useTheme } from "react-native-paper";
import { lightTheme } from "../components/styles/themes";

export type AppTheme = typeof lightTheme;

export const useAppTheme = () => useTheme<AppTheme>();

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PaperProvider theme={lightTheme}>{children}</PaperProvider>;
}
