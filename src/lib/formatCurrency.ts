export function formatFriendlyAmount(amount: number): string {
  const absAmount = Math.abs(amount)
  if (absAmount >= 1000000) {
    return `${(amount / 1000000).toFixed(1)}m`
  } else if (absAmount >= 1000) {
    return `${(amount / 1000).toFixed(1)}k`
  }
  return amount.toFixed(0)
}
