// Утилита для подсчёта скидки на товар
export const getDiscountedPrice = (price, discountPercent) => {
  if (discountPercent < 0 || discountPercent > 100) return price
  const discount = price * (discountPercent / 100)

  return Math.round(price - discount)
}
