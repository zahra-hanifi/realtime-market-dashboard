import { useEffect, useMemo, useState } from "react";
import { fetchCoins, type Coin } from "../api/coins.ts";
import { useDebounce } from "../hooks/useDebounce.ts";
import Button from "./Button.tsx";
import SearchInput from "./SearchInput.tsx";
import CoinsTable from "./CoinsTable.tsx";

export default function CoinsList() {
    const [coins, setCoins] = useState<Coin[]>([]);
    const [fetchState, setFetchState] = useState<string>('pending');
    const [reloadKey, setReloadKey] = useState<number>(0);
    const [search, setSearch] = useState('');
    const debouncedSearch = useDebounce(search, 300)

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

    return <div className="w-full md:w-2/3 sm:flex sm:flex-col sm:min-h-0">
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
            <div className="flex justify-center items-center h-full font-bold text-2xl text-text-2">
                Nothing found :(
            </div>
        }
        {
            fetchState === 'success' && coins.length &&
            <>
                <SearchInput search={search} onSearchChange={setSearch} />

                {filteredCoins.length ?
                    <div className="sm:flex-1 sm:min-h-0 sm:overflow-y-auto">
                        <CoinsTable coins={filteredCoins} />
                    </div>
                    : <div className="flex justify-center items-center h-full font-bold text-2xl text-text-2">
                        No Result :(
                    </div>
                }
            </>
        }
    </div>
}