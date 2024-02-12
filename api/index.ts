import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export * from "./auth";
export * from "./category";

// TODO: Implement request interceptor for adding tokens

/**
 * Returns the accessToken, refreshToken of logged in user from
 * device storage
 * @returns {Promise<{accessToken: string, refreshToken: string}>}
 */
const getTokensFromStorage = async () => {
  try {
    const accessToken = await AsyncStorage.getItem("accessToken");
    const refreshToken = await AsyncStorage.getItem("refreshToken");
    return { accessToken, refreshToken };
  } catch (error) {
    console.error("Error retrieving tokens from device: ", error);
    return { accessToken: "", refreshToken: "" };
  }
};

/**
 * Attaches tokens to request headers before making a request
 */
const attachInterceptor = () => {
  axios.interceptors.request.use(async (config) => {
    try {
      // Retrieve tokens from device storage
      const { accessToken, refreshToken } = await getTokensFromStorage();

      // Attach tokens to request headers
      config.headers["Authorization"] = `Bearer ${accessToken}`;
      config.headers[
        "Cookie"
      ] = `access_token=${accessToken}; refresh_token=${refreshToken}`;
    } catch (error) {
      console.error("Error attaching tokens to request: ", error);
    }

    return config;
  });
};

attachInterceptor();

export default axios;
