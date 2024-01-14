import FontAwesome from "@expo/vector-icons/FontAwesome";
import { PaperProvider } from "react-native-paper";
import Icon from "../components/Icon";
import { useFonts } from "expo-font";
import { SplashScreen } from "expo-router";
import { useEffect } from "react";
// import { useColorScheme } from "react-native";
import useUserStore from "../store/features/user";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabLayout from "./(tabs)/_layout";
import ModalScreen from "./modal";
import AuthenticationLayout from "./(auth)/_layout";
import ThemeProvider from "../provider/ThemeProvider";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

const Stack = createNativeStackNavigator();

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(auth)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const userStore = useUserStore();
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  const isLoggedIn =
    userStore.isLoggedIn && userStore.accessToken.trim().length !== 0;

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav isLoggedIn={isLoggedIn} />;
}

function RootLayoutNav({ isLoggedIn }: { isLoggedIn: boolean }) {
  // const colorScheme = useColorScheme();
  const queryClient = new QueryClient();

  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <Stack.Navigator>
          {isLoggedIn ? (
            <>
              <Stack.Screen
                name="(tabs)"
                component={TabLayout}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="modal"
                component={ModalScreen}
                options={{ presentation: "modal" }}
              />
            </>
          ) : (
            <>
              <Stack.Screen
                name="(auth)"
                component={AuthenticationLayout}
                options={{ headerShown: false }}
              />
            </>
          )}
        </Stack.Navigator>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
