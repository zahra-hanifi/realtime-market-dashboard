export interface Coin {
    symbol: string
    name: string
    id: string
    current_price: number
    price_change_percentage_24h: number
    image: string
}

const URL = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=20&page=1'

export async function fetchCoins(signal?: AbortSignal): Promise<Coin[]> {
    const response = await fetch(URL, { signal })

    if (!response.ok) throw new Error(`Server Error ${response.status}`)
    return await response.json()
}
