import { StyleSheet, View, Text, Image } from "react-native"

export default function PromoCard({
  image,
  title,
  oldPrice,
  newPrice,
  discount,
}) {
  return (
    <View style={styles.card}>
      <Image style={styles.cardImage} source={image} />
      <Text style={styles.cardTitle}>{title}</Text>
      <View style={styles.cardPriceRow}>
        <Text style={styles.oldPrice}>{oldPrice}₸</Text>
        <Text style={styles.newPrice}>{newPrice}₸</Text>
        <View style={styles.discountTag}>
          <Text style={styles.discountText}>-{discount}%</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  // Card
  card: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  cardImage: {
    height: 150,
    borderRadius: 8,
    marginBottom: 10,
    width: "100%",
    resizeMode: "contain",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
  },
  cardPriceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  oldPrice: {
    fontSize: 14,
    color: "#888",
    textDecorationLine: "line-through",
  },
  newPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  discountTag: {
    backgroundColor: "#000",
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: "auto",
  },
  discountText: {
    color: "#fff",
    fontSize: 12,
  },
})
