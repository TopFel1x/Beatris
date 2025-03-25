import React from "react"
import { Text, Image, StyleSheet, TouchableOpacity } from "react-native"

export default function ProductCard({ name, price, image }) {
  function renderImage() {
    if (typeof image === "string") {
      return (
        <Image
          source={{ uri: image }}
          style={styles.image}
          resizeMode="contain"
        />
      )
    } else if (typeof image === "number") {
      return <Image source={image} style={styles.image} resizeMode="contain" />
    }

    return <Text style={{ color: "red" }}>❌ Нет изображения</Text>
  }

  return (
    <TouchableOpacity style={styles.card}>
      {renderImage()}
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.price}>{price * 500}₸</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 10,
    margin: 8,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 8,
  },
  name: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 4,
  },
  price: {
    fontSize: 14,
    color: "#333",
  },
})
