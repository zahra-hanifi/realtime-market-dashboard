import type {Coin} from "../api/coins.ts";
import { useOrderStore } from "../store/useOrderStore.ts";
import { formatPrice } from "../utils/format.ts";

export default function CoinsTable({ coins }: {coins: Coin[]}) {
    const selectCoin = useOrderStore((s) => s.selectCoin)

    return <table className="w-full mb-4">
        <thead className="sticky top-30.25 sm:top-2 bg-bg-0 z-40">
            <tr>
                <th className="text-start py-1.5 ps-4 text-sm text-text-3">Market</th>
                <th className="text-start py-1.5 text-sm text-text-3">Price USD</th>
                <th className="text-end py-1.5 pe-4 text-sm text-text-3">24H</th>
            </tr>
        </thead>

        <tbody>
        {
            coins.map((coin:Coin) => (
                <tr key={coin.id} className="cursor-pointer" onClick={() => selectCoin(coin)}>
                    <td className="flex items-center gap-x-2.5 ps-4 py-2">
                        <img src={coin.image} alt={coin.name} className="w-6 h-6 sm:w-8 sm:h-8" />

                        <span className="text-text-1 text-sm sm:text-base font-medium truncate">{coin.name}</span>

                        <span className="text-text-3 text-xs sm:text-sm truncate">{coin.symbol.toUpperCase()}</span>
                    </td>

                    <td className="py-2 text-text-2 text-sm sm:text-base tabular-nums">
                        {formatPrice(coin.current_price)}
                    </td>

                    <td className="text-text-1 text-sm sm:text-base text-end pe-4">
                        {coin.price_change_percentage_24h !== null ?
                        <span
                            className=
                            {
                                +coin.price_change_percentage_24h.toFixed(2) > 0 ? 'text-pos'
                                : +coin.price_change_percentage_24h.toFixed(2) < 0 ? 'text-neg'
                                : 'text-text-3'
                            }
                        >
                            {+coin.price_change_percentage_24h.toFixed(2) > 0 && '+'}{coin.price_change_percentage_24h.toFixed(2)}%
                        </span> : <span className="text-text-3">—</span>
                        }
                    </td>
                </tr>
            ))
        }
        </tbody>
    </table>
}