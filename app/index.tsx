import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, FlatList } from "react-native";

// fetch all expenses for the employee, mock for now...

const mockExpenses = [
  {
    id: "1",
    title: "Office Supplies",
    amount: 45.99,
    status: "pending",
    date: "2025-11-15",
  },
  {
    id: "2",
    title: "Team Lunch",
    amount: 120.50,
    status: "approved",
    date: "2025-11-10",
  },
  {
    id: "3",
    title: "Travel Fare",
    amount: 250.30,
    status: "approved",
    date: "2025-11-05",
  },
  {
    id: "4",
    title: "Software Subscription",
    amount: 99.99,
    status: "pending",
    date: "2025-11-01",
  },
  {
    id: "5",
    title: "Cloud Hosting (AWS)",
    amount: 320.00,
    status: "approved",
    date: "2025-11-18",
  },
  {
    id: "6",
    title: "Developer Conference Ticket",
    amount: 599.00,
    status: "pending",
    date: "2025-11-20",
  },
  {
    id: "7",
    title: "New MacBook Charger",
    amount: 89.00,
    status: "approved",
    date: "2025-11-22",
  },
  {
    id: "8",
    title: "Figma Team Plan",
    amount: 180.00,
    status: "approved",
    date: "2025-12-01",
  },
  {
    id: "9",
    title: "Grab Rides for Client Visit",
    amount: 42.70,
    status: "approved",
    date: "2025-12-02",
  },
  {
    id: "10",
    title: "Monitor Stand",
    amount: 129.90,
    status: "pending",
    date: "2025-11-28",
  },
  {
    id: "11",
    title: "Random Gaming Mouse",
    amount: 259.00,
    status: "rejected", // questionable
    date: "2025-11-27",
  },
  {
    id: "12",
    title: "Team Building Event (Mini Golf)",
    amount: 340.00,
    status: "approved",
    date: "2025-11-30",
  },
  {
    id: "13",
    title: "VPN Subscription",
    amount: 79.99,
    status: "approved",
    date: "2025-11-12",
  },
  {
    id: "14",
    title: "UX Testing Gift Cards",
    amount: 150.00,
    status: "pending",
    date: "2025-12-03",
  },
  {
    id: "15",
    title: "iPad Pro Stylus",
    amount: 149.99,
    status: "pending",
    date: "2025-11-29",
  },
  {
    id: "16",
    title: "Premium Coffee Beans",
    amount: 68.50,
    status: "approved",
    date: "2025-11-26",
  },
  {
    id: "17",
    title: "After-Work Drinks",
    amount: 210.00,
    status: "pending", // acceptable-ish
    date: "2025-11-24",
  },
  {
    id: "18",
    title: "Noise Cancelling Headphones",
    amount: 399.00,
    status: "approved",
    date: "2025-11-21",
  },
  {
    id: "19",
    title: "Random Lazada Gadget",
    amount: 89.00,
    status: "pending", // maybe questionable but not outright rejected
    date: "2025-11-23",
  },
  {
    id: "20",
    title: "Taxi to Office (Late Night)",
    amount: 34.20,
    status: "approved",
    date: "2025-12-01",
  },
];

export default function App() {

  const getBackgroundColor = (status) => {
    switch (status) {
      case "pending": return "white"
      case "approved": return "rgba(255, 217, 95, 0.3)"
      case "rejected": return "rgba(241, 65, 65, 0.1)"
    }
  }

  const renderItem = ({ item }) => (
  <View style={[styles.item, { backgroundColor: getBackgroundColor(item.status) }]}>
    <View style={styles.rowContainer}>
      <Text style={styles.title}>
        {item.title.length > 20 ? item.title.substring(0, 20) + "..." : item.title}
      </Text>
      <Text style={styles.amount}>${item.amount.toFixed(2)}</Text>
      <Text style={styles.status}> {item.status.toUpperCase()} </Text>
    </View>
  </View>
  );

  // FlatList is RN concept not regular React
  return (
    <View style={styles.container}>
      <FlatList
        data={mockExpenses}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.expenseList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20
  },
  expenseList: {
    width: "100%",
  },
  welcome: {
    fontSize: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  expensesContainer: {

  },
  item: {
    backgroundColor: "white",
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    width: "100%",
    fontSize: 14,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontWeight: "500",
  },
  status: {
    fontSize: 11,
  },
})
