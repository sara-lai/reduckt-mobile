import React, { useState } from "react";
import { View, Button, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { createNewExpense } from "../services/create_expense";

import { Audio } from "expo-av";

export default function NewExpense() {
  const [imageUri, setImageUri] = useState(null)
  const [audioUri, setAudioUri] = useState(null)
  const [recording, setRecording] = useState(null)
  const [status, setStatus] = useState("")

  const handleSubmit = async () => {
    if (!(imageUri || audioUri)) return;
    try {
      await createNewExpense(imageUri, audioUri),

      setStatus("Expense submitted successfully!")
      setImageUri(null)
    } catch {
      setStatus("Submit failed")
    }
  }

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()

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

  const startRecording = async () => {
    const { status } = await Audio.requestPermissionsAsync();
    if (status !== "granted") {
      console.log("Audio permission denied")
      return
    }

    await Audio.setAudioModeAsync({ allowsRecordingIOS: true, playsInSilentModeIOS: true, })
    const { recording } = await Audio.Recording.createAsync( Audio.RecordingOptionsPresets.HIGH_QUALITY )
    setRecording(recording);
  }

  const stopRecording = async () => {
    if (!recording) return;
    setRecording(null)
    await recording.stopAndUnloadAsync()
    const uri = recording.getURI()
    setAudioUri(uri)
  }

  return (
    <View style={styles.container}>
      {imageUri && (
        <Image source={{ uri: imageUri }} style={styles.previewImage} />
      )}

      {audioUri && (
        <Text style={styles.previewAudio}> Audio File: {audioUri.split('/').pop()} </Text>
      )}

      <View style={styles.imageContainer}>
        <Text style={styles.sectionTitle}>Image</Text>
        <View style={styles.imageButtons}>
          <TouchableOpacity onPress={pickImage} style={styles.button}>
            <Ionicons name="images-outline" size={32} color="black" />
            <Text style={styles.buttonText}>Library</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={takePhoto} style={styles.button}>
            <Ionicons name="camera-outline" size={32} color="black" />
            <Text style={styles.buttonText}>Camera</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.voiceContainer}>
        <Text style={styles.sectionTitle}>Voice Note</Text>
        <TouchableOpacity onPress={recording ? stopRecording : startRecording} style={styles.voiceButton} >
          <Ionicons name={recording ? "stop-circle-outline" : "mic-outline"} size={32} color="black" />
          <Text style={styles.buttonText}>
            {recording ? "Stop Recording" : "Record Voice"}
          </Text>
        </TouchableOpacity>
      </View>

      <Button title="Submit" onPress={handleSubmit} disabled={!(imageUri || audioUri)} />
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
  previewAudio: {
    width: 300,
    marginBottom: 20,
  },
  imageButtons: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 40,
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
  voiceContainer: {
    alignItems: "center",
    marginBottom: 20,
    width: "100%",
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 20,
    width: "100%",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  voiceButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  voiceStatus: {
    marginTop: 10,
  },
});
