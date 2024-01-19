import { create } from "zustand";
import { persist, devtools, createJSONStorage } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { User } from "../../models/user";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface IUserState extends User {
  setUser: (uid: string, username: string, accessToken: string) => void;
  loginWithPassword: (user: User) => void;
  updateProfile: (username: string) => void;
  logout: () => void;
}

const useUserStore = create<IUserState>()(
  devtools(
    immer(
      persist(
        (set) => ({
          isLoggedIn: false,
          uid: "",
          username: "",
          email: "",
          accessToken: "",
          refreshToken: "",
          currency: "INR",
          accounts: [],

          setUser: (uid, username, accessToken) => {
            set({ isLoggedIn: true, uid, username, accessToken });
          },

          loginWithPassword: (user: User) => {
            set({
              username: user.username,
              isLoggedIn: true,
              uid: user.uid,
              email: user.email,
              accessToken: user.accessToken,
              currency: "USD",
              accounts: user.accounts,
            });
          },

          updateProfile: (username) => {
            set({ username });
          },

          logout: () => {
            // Clear local storage
            AsyncStorage.removeItem("user-storage");
            set({
              isLoggedIn: false,
              uid: "",
              username: "",
              email: "",
              accessToken: "",
              refreshToken: "",
              currency: "INR",
              accounts: [],
            });
          },
        }),
        {
          name: "user-storage",
          storage: createJSONStorage(() => AsyncStorage),
        }
      )
    )
  )
);

export default useUserStore;
