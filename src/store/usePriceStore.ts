import { create } from 'zustand/react'

interface PriceState {
    prices: Record<string, number>
    setPrice: (price: Record<string, number>) => void
}

export const usePriceStore = create<PriceState>((set) => ({
    prices: {},
    setPrice: (updates) => set((s) => ({ prices: { ...s.prices, ...updates } })),
}))
