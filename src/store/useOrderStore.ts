import { create } from "zustand/react";

type Side =  'buy' | 'sell'

interface OrderState {
    selectedCoinId: string | null;
    side: Side;
    amount: string;
    selectCoin: (id:string) => void;
    setSide: (side: Side) => void;
    setAmount: (amount: string) => void;
    reset: () => void;
}

export const useOrderStore = create<OrderState>((set) => ({
    selectedCoinId: null,
    side: 'buy',
    amount: ' ',
    selectCoin: (selectedCoinId) => set({selectedCoinId}),
    setSide: (side) => set({side}),
    setAmount: (amount) => set({amount}),
    reset: () => set({selectedCoinId: null, side: 'buy', amount: ''}),
}))