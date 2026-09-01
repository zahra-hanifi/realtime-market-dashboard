export function formatPrice(price: number) : string {
    if (price >= 1000) return price.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 })
    if (price >= 1) return price.toFixed(3)
    return price.toFixed(6)
}