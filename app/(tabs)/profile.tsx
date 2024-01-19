import { StyleSheet } from "react-native";

import { View } from "react-native";
import Button from "../../components/ui/Button";
import { useMutation } from "@tanstack/react-query";
import { logout } from "../../api";
import {
  NavigationContainerRef,
  useNavigation,
} from "@react-navigation/native";
import useUserStore from "../../store/features/user";
import { useAppTheme } from "../../provider/ThemeProvider";
import { List } from "react-native-paper";
import { RootStackParamList } from "../types";

export default function Profile() {
  const navigation =
    useNavigation<NavigationContainerRef<RootStackParamList>>();

  const theme = useAppTheme();
  const { logout: logoutUser } = useUserStore();
  const logoutMutation = useMutation({
    mutationFn: logout,
    onError: (err) => {
      console.error(err);
    },
    onSuccess: () => {
      logoutUser();
      navigation.navigate("(auth)");
    },
  });

  const handleNavigation = () => {
    navigation.navigate("(category)");
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "flex-start",
      justifyContent: "flex-start",
      padding: theme.spacing(2),
      gap: theme.spacing(1),
    },
  });

  return (
    <View style={styles.container}>
      <List.Item
        theme={theme}
        title="Categories"
        onPress={() => {
          handleNavigation();
        }}
      />
      <Button
        mode="contained"
        handleClick={() => {
          logoutMutation.mutate();
        }}
      >
        Logout
      </Button>
    </View>
  );
}
