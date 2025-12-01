import React, { useState } from "react";
import { View, Button, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { createNewExpense } from "../services/create_expense";

export default function NewExpense() {
  const [imageUri, setImageUri] = useState(null)
  const [status, setStatus] = useState("")

  const handleSubmit = async () => {
    if (!imageUri) return;
    try {
      await createNewExpense(imageUri)

      setStatus("Expense submitted successfully!")
      setImageUri(null)
    } catch {
      setStatus("Submit failed")
    }
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      console.log('permission denied... do something?')
      return
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    })

    if (!result.canceled) setImageUri(result.assets[0].uri)
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync()

    if (status !== "granted") {
      console.log('permission denied... do something?')
      return
    }

    const result = await ImagePicker.launchCameraAsync({ allowsEditing: true, quality: 1, })

    if (!result.canceled) setImageUri(result.assets[0].uri)
  }

  return (
    <View style={styles.container}>
      {imageUri && (
        <Image source={{ uri: imageUri }} style={styles.previewImage} />
      )}
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={pickImage} style={styles.button}>
          <Ionicons name="images-outline" size={32} color="black" />
          <Text style={styles.buttonText}>Library</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={takePhoto} style={styles.button}>
          <Ionicons name="camera-outline" size={32} color="black" />
          <Text style={styles.buttonText}>Camera</Text>
        </TouchableOpacity>
      </View>
      <Button title="Submit" onPress={handleSubmit} disabled={!imageUri} />
      {status && <Text>{status}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  previewImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 20,
  },
  button: {
    padding: 10,
  },
  buttonText: {
    textAlign: "center",
    marginTop: 5,
  },
});
