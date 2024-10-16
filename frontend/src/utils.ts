export const formatCurrency = (
  amount:number, 
  options?: { showDecimals: boolean },
) => {
  const showDecimals = options?.showDecimals ?? true
  const maximumFractionDigits = showDecimals ? 2 : 0
  return new Intl.NumberFormat(
    'en-US', 
    {
      style: "currency", 
      currency: "USD",
      maximumFractionDigits,
    }
  ).format(amount)
}