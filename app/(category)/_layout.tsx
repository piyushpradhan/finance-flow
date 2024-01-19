import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Categories from "./categories";
import EditCategory from "./edit";

export default function CategoryLayout() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator initialRouteName="(category)/categories">
      <Stack.Screen
        name="(category)/categories"
        component={Categories}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(category)/edit"
        component={EditCategory}
        options={{
          presentation: "modal",
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
