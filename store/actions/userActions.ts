import { login } from "../../api";
import { User } from "../../models/user";

export const loginUserWithPassword = async (
  username: string,
  password: string
): Promise<User> => {
  try {
    const loggedInUser: User = await login(username, password);
    return loggedInUser;
  } catch (err) {
    console.error(err);
    throw new Error(`Something went wrong, please try again later: ${err}`);
  }
};

export const updateUserData = (user: User) => {
  try {
    return user;
  } catch (err) {
    console.error(err);
    throw new Error(`Could not update data in store: ${err}`);
  }
};
