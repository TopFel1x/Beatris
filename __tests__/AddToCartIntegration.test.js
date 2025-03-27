import React from "react"
import { Text } from "react-native"
import { render, fireEvent } from "@testing-library/react-native"
import ProductDetailsScreen from "../screens/ProductDetailsScreen"
import { CartProvider, useCart } from "../context/CartContext"

// Мок-товар
const mockProduct = {
  id: 1,
  name: "Губная помада",
  brand: "Luxe",
  price: 10,
  image_link: "https://example.com/image.jpg",
  description: "Стойкая, насыщенная губная помада",
}

// Тестовый компонент для отслеживания корзины
const CartConsumer = () => {
  const { cartItems } = useCart()
  return <Text testID="cart-count">В корзине: {cartItems.length}</Text>
}

test("добавляет товар в корзину при нажатии на кнопку", () => {
  const { getByText, getByTestId } = render(
    <CartProvider>
      <>
        <ProductDetailsScreen route={{ params: { product: mockProduct } }} />
        <CartConsumer />
      </>
    </CartProvider>
  )

  // Нажимаем на кнопку
  const addButton = getByText("Добавить в корзину")
  fireEvent.press(addButton)

  // Проверяем, что в корзине появился товар
  expect(getByTestId("cart-count").props.children).toContain(1)
})
