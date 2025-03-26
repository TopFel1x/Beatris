import React from "react"
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native"

// Context
import { useCart } from "../context/CartContext"

export default function CartItem({ item, index }) {
  const { removeFromCart } = useCart()

  return (
    <View style={styles.container}>
      <View style={styles.imageBox}>
        <Image source={{ uri: item.image_link }} style={styles.image} />
      </View>
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>{item.price * 500}₸</Text>
      </View>

      <TouchableOpacity onPress={() => removeFromCart(index)}>
        <Text style={styles.remove}>Удалить</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  imageBox: {
    width: 60,
    height: 60,
    marginRight: 12,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#f5f5f5",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 4,
  },
  price: {
    fontSize: 13,
    color: "#888",
  },

  remove: {
    marginTop: 8,
    color: "#d32f2f",
    fontSize: 14,
    fontWeight: "500",
  },
})
