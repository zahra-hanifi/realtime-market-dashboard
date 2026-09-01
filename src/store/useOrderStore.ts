import { create } from 'zustand/react'
import type { Coin } from '../api/coins.ts'

type Side = 'buy' | 'sell'

interface OrderState {
    selectedCoin: Coin | null
    isOrderOpen: boolean
    side: Side
    amount: string
    selectCoin: (coin: Coin) => void
    closeOrder: () => void
    setSide: (side: Side) => void
    setAmount: (amount: string) => void
    reset: () => void
}

export const useOrderStore = create<OrderState>((set) => ({
    selectedCoin: null,
    isOrderOpen: false,
    side: 'buy',
    amount: ' ',
    selectCoin: (selectedCoin) => set({ selectedCoin, isOrderOpen: true }),
    closeOrder: () => set({ isOrderOpen: false }),
    setSide: (side) => set({ side }),
    setAmount: (amount) => set({ amount }),
    reset: () => set({ selectedCoin: null, isOrderOpen: false, side: 'buy', amount: '' }),
}))
