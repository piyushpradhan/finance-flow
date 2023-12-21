import { NativeSyntheticEvent, StyleSheet } from "react-native";

import { Text, View } from "../../components/Themed";
import { Button, TextInput } from "react-native-paper";

import { Mutation, useMutation } from "@tanstack/react-query";
import { login, loginWithGoogle } from "../../api";
import { useState } from "react";
import Colors from "../../constants/Colors";
import { TextInputChangeEventData } from "react-native";
import { useRouter } from "expo-router";

export default function LoginScreen() {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const router = useRouter();

  const loginMutation = useMutation({
    mutationFn: () => login(emailInput, passwordInput),
    onSuccess: (data) => {
      // TODO: Update the user data in global store
      router.replace("/(tabs)/");
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const loginWithGoogleMutation = useMutation({
    mutationFn: loginWithGoogle,
    onSuccess: (data) => {
      // TODO: Update the user data in global store
      router.replace("/(tabs)/");
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
          style={styles.inputField}
          value={emailInput}
          onChangeText={(value) => setEmailInput(value)}
        />
        <TextInput
          mode="outlined"
          label="Password"
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
