import React from "react"
import { View, Text, Image, StyleSheet, ScrollView } from "react-native"

export default function ProductDetailsScreen({ route }) {
  const product = route.params.product

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: product.image_link }}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.brand}>{product.brand}</Text>
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.price}>{product.price * 500}₸</Text>
      <Text style={styles.description}>
        {product.description || "Нет описания"}
      </Text>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  image: {
    width: "100%",
    height: 300,
    marginBottom: 16,
    borderRadius: 12,
    backgroundColor: "#f5f5f5",
  },
  brand: {
    fontSize: 16,
    color: "#888",
    marginBottom: 4,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  price: {
    fontSize: 18,
    color: "#333",
    marginBottom: 16,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: "#555",
  },
})
