import React from "react"
import { render, fireEvent, waitFor } from "@testing-library/react-native"
import { NavigationContainer } from "@react-navigation/native"
import CatalogScreen from "../screens/CatalogScreen"

// Мокаем Ionicons
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
        },
        { id: 2, name: "Помада", product_type: "lipstick", image_link: "" },
      ]),
  })
)

test("фильтрует товары по поисковому запросу", async () => {
  const { getByPlaceholderText, getByText, queryByText } = render(
    <NavigationContainer>
      <CatalogScreen />
    </NavigationContainer>
  )

  // Ждём появления товаров
  await waitFor(() => {
    expect(getByText("Крем для лица")).toBeTruthy()
    expect(getByText("Помада")).toBeTruthy()
  })

  const searchInput = getByPlaceholderText("Что вы ищите?")

  // Вводим текст "крем"
  fireEvent.changeText(searchInput, "крем")

  // Ждём, пока отфильтруется
  await waitFor(() => {
    expect(getByText("Крем для лица")).toBeTruthy()
    expect(queryByText("Помада")).toBeNull()
  })
})
