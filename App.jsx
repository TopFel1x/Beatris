import React from "react"
import { StyleSheet, Platform } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Ionicons } from "@expo/vector-icons"

// Import our Screens
import HomeScreen from "./screens/HomeScreen"
import CatalogScren from "./screens/CatalogScreen"
import FavoritesScreen from "./screens/FavoritesScreen"
import CartScreen from "./screens/CartScreen"
import AccountScreen from "./screens/AccountScreen"

const Tab = createBottomTabNavigator()

const tabScreenOptions = ({ route }) => ({
  headerShown: false,
  tabBarIcon: ({ focused, color, size }) => {
    let iconName

    switch (route.name) {
      case "Главная":
        iconName = focused ? "home" : "home-outline"
        break
      case "Каталог":
        iconName = focused ? "grid" : "grid-outline"
        break
      case "Избранное":
        iconName = focused ? "heart" : "heart-outline"
        break
      case "Корзина":
        iconName = focused ? "cart" : "cart-outline"
        break
      case "Аккаунт":
        iconName = focused ? "person" : "person-outline"
        break
      default:
        iconName = "ellipse"
    }

    return <Ionicons name={iconName} size={size} color={color} />
  },
  tabBarStyle: styles.tabBar,
  tabBarLabelStyle: styles.tabBarLabel,
  tabBarActiveTintColor: "#1f1e1e",
  tabBarInactiveTintColor: "gray",
})

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={tabScreenOptions}>
        <Tab.Screen name="Главная" component={HomeScreen} />
        <Tab.Screen name="Каталог" component={CatalogScren} />
        <Tab.Screen name="Избранное" component={FavoritesScreen} />
        <Tab.Screen name="Корзина" component={CartScreen} />
        <Tab.Screen name="Аккаунт" component={AccountScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#fafafa",
    borderTopWidth: 1,
    borderTopColor: "#c6c6c6",
    paddingBottom: 10,
  },
  tabBarLabel: {
    fontSize: 12,
  },
})
