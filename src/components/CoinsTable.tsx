import type { Coin } from '../api/coins.ts'
import CoinRow from './CoinRow.tsx'

export default function CoinsTable({
    coins,
    livePrices,
}: {
    coins: Coin[]
    livePrices?: string | number | undefined
}) {
    return (
        <table className="w-full mb-4">
            <thead className="sticky top-30.25 sm:top-2 bg-bg-0 z-40">
                <tr>
                    <th className="text-start py-1.5 ps-4 text-sm text-text-3">Market</th>
                    <th className="text-start py-1.5 text-sm text-text-3">Price USD</th>
                    <th className="text-end py-1.5 pe-4 text-sm text-text-3">24H</th>
                </tr>
            </thead>

            <tbody>
                {coins.map((coin: Coin) => (
                    <CoinRow key={coin.id} coin={coin} livePrice={livePrices[coin.id]} />
                ))}
            </tbody>
        </table>
    )
}
