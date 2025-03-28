import React from "react"
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Platform,
  StatusBar,
  ActivityIndicator,
} from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useState, useEffect } from "react"
import { useNavigation } from "@react-navigation/native"

// Components
import SearchBar from "../components/SearchBar"
import ProductCard from "../components/ProductCard"

const categories = [
  { label: "Все", value: "all" },
  { label: "Тон", value: "foundation" },
  { label: "Помады", value: "lipstick" },
  { label: "Туши", value: "mascara" },
  { label: "Тени", value: "eyeshadow" },
  { label: "Подводки", value: "eyeliner" },
  { label: "Румяна", value: "blush" },
]

export default function CatalogScreen() {
  const navigation = useNavigation()

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const STORAGE_KEY = "cachedProducts"

  useEffect(() => {
    async function fetchProducts() {
      try {
        // Пробуем загрузить из локального хранилища
        const cachedData = await AsyncStorage.getItem(STORAGE_KEY)
        if (cachedData) {
          setProducts(JSON.parse(cachedData))
          setLoading(false)
        }

        // Если на локальном нет, то обращаемся к API
        const linkProducts =
          "https://makeup-api.herokuapp.com/api/v1/products.json?brand=l%27oreal"
        const response = await fetch(linkProducts)
        const data = await response.json()

        setProducts(data)
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data))
      } catch {
        console.error("Ошибка загрузки:", err)
        setError("Не удалось загрузить данные")
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  // Фильтрации поисковой строки <SearchBar>
  const [searchQuery, setSearchQuery] = useState("")

  // Фильтрации горизонтальных пропруктку (по типу)
  const [selectedCategory, setSelectedCategory] = useState("all")

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase())

    const matchesCategory =
      selectedCategory === "all" || product.product_type === selectedCategory

    return matchesSearch && matchesCategory
  })

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.pageName}>Каталог</Text>

        <SearchBar value={searchQuery} onChange={setSearchQuery} />

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
        >
          {categories.map((cat, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.categoryButton,
                selectedCategory === cat.value && styles.activeCategoryButton,
              ]}
              onPress={() => setSelectedCategory(cat.value)}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === cat.value && styles.activeCategoryText,
                ]}
              >
                {cat.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={styles.sectionTitle}>Все товары</Text>
      </View>

      {/* Список товаров */}
      {loading && (
        <ActivityIndicator
          size="large"
          color="#999"
          style={{ marginTop: 20 }}
        />
      )}
      {error && (
        <Text style={{ textAlign: "center", color: "red" }}>{error}</Text>
      )}
      {loading === false && (
        <FlatList
          data={filteredProducts}
          numColumns={2}
          keyExtractor={(product) => product.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.cardWrapper}>
              <ProductCard
                {...item}
                image={item.image_link}
                onPress={() =>
                  navigation.navigate("ProductDetails", { product: item })
                }
              />
            </View>
          )}
          contentContainerStyle={styles.productsContainer}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 10 : 16,
    paddingBottom: 8,
    backgroundColor: "#FAFAFA",
  },
  pageName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },

  categoriesContainer: {
    marginBottom: 20,
  },
  categoryButton: {
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  categoryText: {
    fontSize: 14,
    color: "#333",
  },
  activeCategoryButton: {
    backgroundColor: "rgba(231, 198, 204, 0.7)",
    borderColor: "#e7c6cc",
  },
  activeCategoryText: {
    color: "#fff",
    fontWeight: "bold",
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },

  cardWrapper: {
    flex: 1,
    maxWidth: "50%",
  },

  productsContainer: {
    paddingHorizontal: 16,
  },
})
