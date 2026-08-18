import {useEffect, useMemo, useState} from "react";
import { fetchCoins, type Coin } from "../api/coins.ts";
import { useDebounce } from "../hooks/useDebounce.ts";
import Button from "./Button.tsx";
import SearchInput from "./SearchInput.tsx";
import {useOrderStore} from "../store/useOrderStore.ts";

export default function CoinList() {
    const [coins, setCoins] = useState<Coin[]>([]);
    const [fetchState, setFetchState] = useState<string>('pending');
    const [reloadKey, setReloadKey] = useState<number>(0);
    const [search, setSearch] = useState('');
    const debouncedSearch = useDebounce(search, 300)
    const selectCoin = useOrderStore((s) => s.selectCoin)

    useEffect( () => {
        const controller = new AbortController()
        fetchCoins(controller.signal).then((coins) => {
            setCoins(coins)
            setFetchState('success')
        }).catch(() => {
            setFetchState('error')
        })

        return () => {controller.abort()}
    }, [reloadKey])

    const filteredCoins = useMemo(() => {
        if (!debouncedSearch) return coins

        return coins.filter((coin) =>
             coin.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
             coin.symbol.toLowerCase().includes(debouncedSearch.toLowerCase())
        )
    }, [coins, debouncedSearch])

    return <>
        {fetchState === 'pending' && <div style={{margin:'auto', fontWeight: 'bold', fontSize: 20}}>Loading...</div>}
        {
            fetchState === 'error' &&
            <div style={{margin:'auto',fontWeight: 'bold', fontSize: 20}}>
                <p>Something went wrong</p>
                <Button
                    variant="danger"
                    style={{marginTop: 8}}
                    onClick={() => {setFetchState('pending');setReloadKey((key) => key + 1)}}
                >
                    Retry
                </Button>
            </div>
        }
        {
            fetchState === 'success' && !coins.length &&
            <div style={{'margin':'auto', fontWeight: 'bold', fontSize: 20}}>
                Nothing found :(
            </div>
        }
        {
            fetchState === 'success' && coins.length &&
            <div style={{'margin':'auto 0', fontWeight: 'bold', fontSize: 20, minHeight: 681}}>
                <SearchInput search={search} onSearchChange={setSearch} />

                {
                    filteredCoins.length ? <ul style={{listStyleType: 'none', textAlign: 'start'}}>
                        {
                            filteredCoins.map((coin:Coin) => (
                                <li key={coin.id} style={{padding: '4px 0', cursor: 'pointer'}} onClick={() => selectCoin(coin.id)}>
                                    {coin.name} ({coin.symbol.toUpperCase()}) - {coin.current_price}

                                    <span
                                        style={{paddingLeft: 16, color: coin.price_change_percentage_24h > 0 ? 'green' : 'red'}}
                                    >
                                    {coin.price_change_percentage_24h}%
                                </span>
                                </li>
                            ))
                        }
                    </ul> : <p style={{margin: '16px 0'}}>No Results Found</p>
                }
            </div>
        }
    </>
}