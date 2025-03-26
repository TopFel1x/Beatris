import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
  StatusBar,
  Platform,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

// Components
import PromoCard from "../components/PromoCard"
import SearchBar from "../components/SearchBar"

// Data
import { promoData } from "../data/promos"

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View
        style={[styles.header, { paddingTop: Platform.OS === "ios" ? 10 : 0 }]}
      >
        <StatusBar
          barStyle={Platform.OS === "ios" ? "dark-content" : "light-content"}
          backgroundColor={Platform.OS === "android" ? "#000" : "transparent"}
        />
        <Text style={styles.logo}>Beatris</Text>
      </View>

      {/* Search product */}
      <SearchBar />

      {/* Unique offer */}
      <View style={styles.promo}>
        <Text style={styles.promoTitle}>Весенние скидки до 20%</Text>
        <Text style={styles.promoSubtitle}>
          Скидка применяется автоматически
        </Text>
      </View>

      {/* Cards */}
      <View style={styles.cards}>
        <Text style={styles.discountMonth}>Акции месяца</Text>
        {promoData.map((card) => (
          <PromoCard key={card.id} {...card} />
        ))}
        <TouchableOpacity
          style={styles.shopButton}
          onPress={() => Alert.alert("Переход на страницу с акциями!")}
        >
          <Text style={styles.shopButton.text}>Перейти ко всем акция</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    // paddingBottom: 80, // чтобы контент не прятался за табами
    paddingHorizontal: 16,
    backgroundColor: "#fafafa",
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    fontSize: 24,
    fontWeight: "bold",
  },
  promo: {
    marginBottom: 10,
  },
  promoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  promoSubtitle: {
    fontSize: 14,
    color: "#666",
  },

  discountMonth: {
    fontSize: 24,
    fontWeight: "bold",
  },
  shopButton: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
  },
  shopButtonText: {
    fontSize: 16,
    fontWeight: "500",
  },
})
