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
    amount: 250.00,
    status: "rejected",
    date: "2025-11-05",
  },
  {
    id: "4",
    title: "Software Subscription",
    amount: 99.99,
    status: "pending",
    date: "2025-11-01",
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
      <Text style={styles.title}>{item.title}</Text>
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
