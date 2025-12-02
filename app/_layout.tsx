import { Tabs } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import AntDesign from "@expo/vector-icons/AntDesign";
import { theme } from "../theme";

export default function Layout() {
  return (
    <Tabs screenOptions={{
        tabBarActiveTintColor: theme.colorCerulean,
        tabBarStyle: {
          height: 90,
          paddingBottom: 10,
          backgroundColor: "#fff",
          borderTopWidth: 0,
          shadowOpacity: 0.1,
        },
        tabBarItemStyle: {
          paddingVertical: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginTop: 12,
          fontWeight: "500",
        },
        tabBarIconStyle: {
          marginBottom: -8,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Your Expenses",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="chart-bar" size={20} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="newExpense"
        options={{
          title: "New Expense",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="add" size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="gear" size={20} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
