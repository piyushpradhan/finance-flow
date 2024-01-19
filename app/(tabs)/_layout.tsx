import { useColorScheme } from "react-native";
import Dashboard from "./dashboard";
import Transactions from "./transactions";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "../../components/ui";

import Colors from "../../constants/Colors";
import Profile from "./profile";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
      }}
    >
      <Tab.Screen
        name="Home"
        component={Dashboard}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Icon name="home" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Transactions"
        component={Transactions}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Icon name="dollar-sign" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Analytics"
        component={Transactions}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Icon name="pie-chart" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Icon name="user" size={size} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
}
