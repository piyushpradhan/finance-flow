import { StyleSheet } from "react-native";

import { View } from "react-native";
import Button from "../../components/ui/Button";
import { useMutation } from "@tanstack/react-query";
import { logout } from "../../api";
import { useRouter } from "expo-router";
import useUserStore from "../../store/features/user";

export default function Profile() {
  const router = useRouter();
  const { logout: logoutUser } = useUserStore();
  const logoutMutation = useMutation({
    mutationFn: logout,
    onError: (err) => {
      console.error(err);
    },
    onSuccess: () => {
      logoutUser();
      router.replace("/(auth)/");
    },
  });

  return (
    <View style={styles.container}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    padding: 8,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
