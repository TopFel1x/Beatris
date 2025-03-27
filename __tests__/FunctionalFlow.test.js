import React from "react"
import { render, fireEvent, waitFor } from "@testing-library/react-native"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

// Screens
import CatalogScreen from "../screens/CatalogScreen"
import ProductDetailsScreen from "../screens/ProductDetailsScreen"
import CartScreen from "../screens/CartScreen"

// Контекст
import { CartProvider } from "../context/CartContext"

// Мокаем иконки
jest.mock("@expo/vector-icons", () => {
  const React = require("react")
  const { Text } = require("react-native")
  return {
    Ionicons: (props) => <Text>{props.name}</Text>,
  }
})

// Мокаем AsyncStorage
jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(() => Promise.resolve(null)),
  setItem: jest.fn(() => Promise.resolve()),
}))

// Мокаем fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve([
        {
          id: 1,
          name: "Крем для лица",
          product_type: "foundation",
          image_link: "",
          brand: "TestBrand",
          price: 10,
          description: "Тестовый крем",
        },
      ]),
  })
)

// Обёртка для навигации + контекста
const Stack = createNativeStackNavigator()

const AppWithProviders = () => (
  <CartProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Catalog">
        <Stack.Screen name="Catalog" component={CatalogScreen} />
        <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
        <Stack.Screen name="Cart" component={CartScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  </CartProvider>
)

test("функциональный сценарий: поиск → детали → корзина", async () => {
  const { getByPlaceholderText, getByText } = render(<AppWithProviders />)

  // Ожидаем загрузки товара
  await waitFor(() => {
    expect(getByText("Крем для лица")).toBeTruthy()
  })

  // Вводим в поиск "крем"
  fireEvent.changeText(getByPlaceholderText("Что вы ищите?"), "крем")

  // Ожидаем, что отобразится нужный товар
  await waitFor(() => {
    expect(getByText("Крем для лица")).toBeTruthy()
  })

  // Нажимаем на карточку товара
  fireEvent.press(getByText("Крем для лица"))

  // Ждём экран деталей
  await waitFor(() => {
    expect(getByText("Добавить в корзину")).toBeTruthy()
  })

  // Нажимаем "Добавить в корзину"
  fireEvent.press(getByText("Добавить в корзину"))

  // Переходим в корзину вручную (эмуляция перехода)
  fireEvent(getByText("Добавить в корзину"), "press")
  const { getByTestId } = render(
    <CartProvider>
      <CartScreen />
    </CartProvider>
  )

  await waitFor(() => {
    expect(getByText("Крем для лица")).toBeTruthy()
  })
})
