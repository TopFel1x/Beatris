import React from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

export default function AccountScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Аккаунт</Text>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Имя:</Text>
        <Text style={styles.value}>Анастасия</Text>

        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>anastasia@example.com</Text>
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Редактировать профиль</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.logoutButton]}>
        <Text style={styles.buttonText}>Выйти</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
  },
  infoContainer: {
    marginBottom: 40,
  },
  label: {
    fontSize: 16,
    color: "#777",
  },
  value: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#000",
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 16,
  },
  logoutButton: {
    backgroundColor: "#444",
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
})
