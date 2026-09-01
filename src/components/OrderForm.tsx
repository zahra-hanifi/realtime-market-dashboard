import { useOrderStore } from "../store/useOrderStore.ts";
import Button from "./Button.tsx";

const sidebarStyle = "md:w-1/3 p-4 bg-bg-2 hidden md:block md:overflow-y-auto text-text-2"

export default function OrderForm({className = sidebarStyle}: {className?: string}) {
    const store = useOrderStore()

    return(
        <div className={className}>
            {store.selectedCoin ?
                <div className="flex flex-col gap-y-4">
                    <div className="flex items-center gap-x-4">
                        <span className="text-text-1 font-semibold text-base sm:text-xl">
                            {store.selectedCoin.name}
                        </span>

                        <span className="text-[13px] text-text-3">
                            {store.selectedCoin.symbol.toUpperCase()} / USD
                        </span>
                    </div>

                    <div className="flex items-center gap-x-4">
                        <span className="text-text-1 font-medium text-2xl sm:text-4xl">
                            {store.selectedCoin.current_price}
                        </span>

                            {store.selectedCoin.price_change_percentage_24h ?
                                <span
                                    className=
                                        {
                                            +store.selectedCoin.price_change_percentage_24h.toFixed(2) > 0 ? 'text-pos'
                                                : +store.selectedCoin.price_change_percentage_24h.toFixed(2) < 0 ? 'text-neg'
                                                    : 'text-text-3'
                                        }
                                >
                            {store.selectedCoin.price_change_percentage_24h.toFixed(2)}%
                        </span> : <span className="text-text-3">—</span>
                            }
                    </div>

                    <div className="mt-3 flex flex-col gap-y-2">
                        <span className="uppercase text-text-3">side</span>

                        <div className="p-1 border border-border rounded-lg flex">
                            <Button
                                style={{width: '50%'}}
                                variant={store.side === 'buy' ? 'primary' : 'ghost'}
                                onClick={() => store.setSide('buy')}
                            >
                                Buy
                            </Button>

                            <Button
                                style={{width: '50%'}}
                                variant={store.side === 'sell' ? 'danger' : 'ghost'}
                                onClick={() => store.setSide('sell')}
                            >
                                sell
                            </Button>
                        </div>
                    </div>

                    <div className="mt-3 flex flex-col gap-y-2">
                        <span className="uppercase text-text-3">amount</span>

                        <div className="flex mt-1">
                            <div className="bg-bg-1 p-3 border border-border border-e-0 rounded-s-lg grow">
                                <input className="focus:outline-0 w-full" dir="rtl" />
                            </div>

                            <div className="p-3 rounded-e-lg bg-bg-2 flex items-center justify-center border border-border">
                                {store.selectedCoin.symbol.toUpperCase()}
                            </div>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                            <span className="text-text-3">Est. total</span>

                            <span className="text-text-2">$19,695</span>
                        </div>
                    </div>

                    <button
                        className={`${store.side === 'buy' ? 'bg-[#1E402B] border-[#326445]' : 'bg-[#472421] border-[#7A403A]'} mt-4  p-3 rounded-lg border-2  text-text-1 text-sm cursor-pointer uppercase`}
                    >
                        {store.side} {store.selectedCoin.symbol}
                    </button>

                    <div className="pt-3 flex flex-col gap-y-2 border-t border-border mt-2 text-sm">
                        <div className="flex items-center justify-between">
                            <span className="text-text-3">Order type</span>

                            <span className="text-text-2">Market</span>
                        </div>

                        <div className="flex items-center justify-between">
                            <span className="text-text-3">Fee (0.10%)</span>

                            <span className="text-text-2">$19.70</span>
                        </div>
                    </div>
                </div>
                : <div className="m-auto flex justify-center items-center h-full text-text-2 flex-col gap-y-3">
                    <div className="w-9 h-9 border border-text-2 rounded-lg"></div>

                    <span className="text-base font-medium text-text-1">
                        No Market Selected
                    </span>

                    <p className="text-sm text-text-2 text-center mt-1">
                        Choose a market from the list to place an
                        order.
                    </p>
                </div>}
        </div>
    )
}