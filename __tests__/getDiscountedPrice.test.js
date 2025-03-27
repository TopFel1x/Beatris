import { getDiscountedPrice } from "../utils/getDiscountedPrice"

test("20% скидка от 1000", () => {
  expect(getDiscountedPrice(1000, 20)).toBe(800)
})

test("0% скидка возвращает ту же цену", () => {
  expect(getDiscountedPrice(500, 0)).toBe(500)
})
