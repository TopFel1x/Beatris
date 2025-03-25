import React from "react"
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

// Компонент карточки товара
import ProductCard from "../components/ProductCard"

// Data
import { cartItems } from "../data/cartItems"

// Временно захардкоженные товары в корзине

export default function CartScreen() {
  // Вычисление общей суммы
  const total = cartItems.reduce((sum, item) => sum + item.price, 0)

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Корзина</Text>

      {cartItems.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Ваша корзина пуста</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <ProductCard {...item} />
              </View>
            )}
            contentContainerStyle={styles.list}
          />

          <View style={styles.footer}>
            <Text style={styles.total}>Итого: {total}₸</Text>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Оформить заказ</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#888",
  },
  list: {
    paddingBottom: 20,
  },
  item: {
    marginBottom: 10,
  },
  footer: {
    paddingVertical: 16,
    borderTopWidth: 1,
    borderColor: "#ddd",
  },
  total: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "right",
  },
  button: {
    backgroundColor: "#000",
    paddingVertical: 12,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
})
