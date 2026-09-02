import type { Coin } from '../api/coins.ts'
import { usePriceStore } from '../store/usePriceStore.ts'
import { useEffect } from 'react'

export function usePriceFeed(coins: Coin[]) {
    const setPrice = usePriceStore((s) => s.setPrice)

    useEffect(() => {
        if (coins.length === 0) return

        const intervalId = setInterval(() => {
            const coin = coins[Math.floor(Math.random() * coins.length)]

            setPrice({
                [coin.id]: coin.current_price * (1 + (Math.random() - 0.5) * 0.02),
            })
        }, 200)

        return () => clearInterval(intervalId)
    }, [coins, setPrice])
}
