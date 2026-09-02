import type { Coin } from '../api/coins.ts'
import { useOrderStore } from '../store/useOrderStore.ts'
import { formatPrice } from '../utils/format.ts'

export default function CoinRow({ coin, livePrice }: { coin: Coin; livePrice: number }) {
    const selectCoin = useOrderStore((s) => s.selectCoin)
    const raw = coin.price_change_percentage_24h
    const change = raw != null ? +raw.toFixed(2) : null

    console.log('render row:', coin.symbol)
    return (
        <tr className="cursor-pointer" onClick={() => selectCoin(coin)}>
            <td className="flex items-center gap-x-2.5 ps-4 py-2">
                <img src={coin.image} alt={coin.name} className="w-6 h-6 sm:w-8 sm:h-8" />

                <span className="text-text-1 text-sm sm:text-base font-medium truncate">
                    {coin.name}
                </span>

                <span className="text-text-3 text-xs sm:text-sm truncate">
                    {coin.symbol.toUpperCase()}
                </span>
            </td>

            <td className="py-2 text-text-2 text-sm sm:text-base tabular-nums">
                {formatPrice(livePrice ?? coin.current_price)}
            </td>

            <td className="text-text-1 text-sm sm:text-base text-end pe-4 tabular-nums">
                {change !== null ? (
                    <span
                        className={
                            change > 0 ? 'text-pos' : change < 0 ? 'text-neg' : 'text-text-3'
                        }
                    >
                        {change > 0 && '+'}
                        {change}%
                    </span>
                ) : (
                    <span className="text-text-3">—</span>
                )}
            </td>
        </tr>
    )
}
