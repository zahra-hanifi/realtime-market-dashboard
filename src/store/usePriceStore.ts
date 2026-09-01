import { create } from 'zustand/react'

interface PriceState {
    prices: Record<number, string>
    setPrice: (price: Record<number, string>) => void
}

export const usePriceStore = create<PriceState>((set) => ({
    prices: {},
    setPrice: (updates) => set((s) => ({ prices: { ...s.prices, ...updates } })),
}))
