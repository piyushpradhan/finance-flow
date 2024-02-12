import { StyleSheet } from "react-native";

import { Text, View } from "react-native";
import { Button, TextInput } from "react-native-paper";

import { useMutation } from "@tanstack/react-query";
import { login, loginWithGoogle } from "../../api";
import { useState } from "react";
import Colors from "../../constants/Colors";
import { useRouter } from "expo-router";
import useUserStore from "../../store/features/user";
import { User } from "../types";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen() {
  const router = useRouter();
  const userStore = useUserStore();
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const loginMutation = useMutation({
    mutationFn: () => login(emailInput, passwordInput),
    onSuccess: async (data) => {
      const loggedInUser: User = data.data["data"];
      // Store the logged in user data in device storage
      await AsyncStorage.setItem("accessToken", loggedInUser.accessToken);
      await AsyncStorage.setItem("refreshToken", loggedInUser.refreshToken);
      await AsyncStorage.setItem("uid", loggedInUser.uid);
      // Update the store with logged in user data
      userStore.loginWithPassword(loggedInUser);
      // Navigate to home page
      router.replace("/(tabs)/dashboard");
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const loginWithGoogleMutation = useMutation({
    mutationFn: loginWithGoogle,
    onSuccess: () => {
      // TODO: Update the user data in global store
      // TODO: Figure out how to do Google Authentication with custom backend authetication
      router.replace("/(tabs)/dashboard");
    },
    onError: (error) => {
      console.error("Login with Google failed: ", error);
    },
  });

  const handleLogin = () => {
    loginMutation.mutate();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login to Finance Flow</Text>
      <View style={styles.loginFormContainer}>
        <TextInput
          mode="outlined"
          label="Email"
          autoCapitalize="none"
          style={styles.inputField}
          value={emailInput}
          onChangeText={(value) => setEmailInput(value)}
        />
        <TextInput
          mode="outlined"
          label="Password"
          autoCapitalize="none"
          style={styles.inputField}
          value={passwordInput}
          onChangeText={(value) => setPasswordInput(value)}
        />
        <Button
          mode="contained"
          style={styles.loginButton}
          onPress={handleLogin}
        >
          LOGIN
        </Button>

        <Text style={styles.helperText}>Or continue with</Text>
        <Button
          mode="outlined"
          textColor={Colors.light.text}
          style={styles.googleSignInButton}
          icon="google"
          onPress={() => {
            loginWithGoogleMutation.mutate();
          }}
        >
          Login with Google
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
    gap: 32,
  },
  title: {
    fontSize: 20,
    color: "black",
    fontWeight: "bold",
  },
  loginFormContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    gap: 8,
  },
  inputField: {
    width: "100%",
  },
  loginButton: {
    marginTop: 16,
    borderRadius: 4,
  },
  helperText: {
    marginTop: 16,
    fontWeight: "500",
  },
  googleSignInButton: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
