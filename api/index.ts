export * from "./auth";
export * from "./category";

// TODO: Implement request interceptor for adding tokens

// axios.interceptors.request.use(async (config) => {
//   try {
//     const token: string = (await secureStore.getItemAsync("accessToken")) ?? "";
//     config.headers["Authorization"] = "Bearer " + token;
//   } catch (error) {
//     console.error("Error retrieving accessToken from device: ", error);
//     Promise.reject(error);
//   }
//   return config;
// });
