import React, { useState } from "react";
import { View, Button, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import { Ionicons } from "@expo/vector-icons";
import { createNewExpense } from "../services/create_expense";

import { Audio } from "expo-av";

export default function NewExpense() {
  const [imageUri, setImageUri] = useState(null)
  const [audioUri, setAudioUri] = useState(null)
  const [pdfUri, setPdfUri] = useState(null)
  const [recording, setRecording] = useState(null)
  const [status, setStatus] = useState("")

  const handleSubmit = async () => {
    if (!(imageUri || audioUri || pdfUri)) return;
    try {
      await createNewExpense(imageUri, audioUri),

      setStatus("Expense submitted successfully!")
      setImageUri(null)
      setAudioUri(null)
      setPdfUri(null)
      setTimeout(() => setStatus(""), 3000) // like flash message
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

  const pickPdf = async () => {
    const result = await DocumentPicker.getDocumentAsync({ type: "application/pdf", copyToCacheDirectory: true, })

    if (result.assets && result.assets.length > 0) {
      setPdfUri(result.assets[0].uri);
    }
  }

  return (
    <View style={styles.container}>
      {imageUri && (
        <Image source={{ uri: imageUri }} style={styles.previewImage} />
      )}

      {audioUri && (
        <Text style={styles.previewAudio}> Audio File: {audioUri.split('/').pop()} </Text>
      )}

      {pdfUri && (
        <Text style={styles.previewPdf}>PDF File: {pdfUri.split("/").pop()}</Text>
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
          <Ionicons name={recording ? "" : "mic-outline"} size={32} color="black" />
          <Text style={styles.buttonText}>
            {recording ? "Stop Recording" : "Record Voice"}
          </Text>
          {recording && <View style={styles.recordingIndicator} />}
        </TouchableOpacity>
      </View>

      <View style={styles.pdfContainer}>
        <Text style={styles.sectionTitle}>PDF</Text>
        <TouchableOpacity onPress={pickPdf} style={styles.button}>
          <Ionicons name="document-outline" size={32} color="black" />
          <Text style={styles.buttonText}>Select PDF</Text>
        </TouchableOpacity>
      </View>

      <Button style={styles.submitButton} title="Submit" onPress={handleSubmit} disabled={!(imageUri || audioUri)} />
      {status && <Text>{status}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    padding: 40,
    backgroundColor: "#f9f9f9",
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
  previewPdf: {
    width: 300,
    marginBottom: 20,
  },
  imageButtons: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 60,
    width: "100%",
    marginBottom: 40,
  },
  button: {
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowOpacity: 0.1,
    shadowRadius: 5
  },
  buttonText: {
    textAlign: "center",
    marginTop: 10,
    fontSize: 14,
  },
  recordingIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "red",
    marginLeft: 10,
  },
  voiceContainer: {
    alignItems: "center",
    marginBottom: 40,
    width: "100%",
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 10,
    width: "100%",
  },
  pdfContainer: {
    alignItems: "center",
    marginBottom: 40,
    width: "100%",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  voiceButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
  },
  voiceStatus: {
    marginTop: 10,
  },
  submitButton: {

  }
});
