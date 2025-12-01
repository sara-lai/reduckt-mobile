import { Tabs } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import AntDesign from "@expo/vector-icons/AntDesign";
import { theme } from "../theme";

export default function Layout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: theme.colorCerulean }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Your Expenses",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="chart-bar" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="newExpense"
        options={{
          title: "New Expense",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="add" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="wrench" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
