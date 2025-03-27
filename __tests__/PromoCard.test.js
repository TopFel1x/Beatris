import React from "react"
import { render } from "@testing-library/react-native"

// Components
import PromoCard from "../components/PromoCard"

// Мок изображения
const mockImage = {}

describe("PromoCard", () => {
  test("renders title and prices correctly", () => {
    const { getByText } = render(
      <PromoCard
        image={mockImage}
        title="Крем для лица"
        oldPrice={1000}
        discount={20}
      />
    )

    // Проверка текста
    expect(getByText("Крем для лица")).toBeTruthy()
    expect(getByText("1000₸")).toBeTruthy() // старая цена
    expect(getByText("800₸")).toBeTruthy() // новая цена (1000 - 20%)
    expect(getByText("-20%")).toBeTruthy() // скидка
  })
})
