import {useOrderStore} from "../store/useOrderStore.ts";
import Button from "./Button.tsx";

export default function OrderForm() {
    const store = useOrderStore()

    return(
        <div style={{'margin':'auto 0'}}>
            <div style={{display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'start'}}>
                <span>Selected Coin: <span style={{fontWeight: 'bold'}}>{store.selectedCoinId ? store.selectedCoinId : ''}</span>
                </span>

                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <span>Selected Side: {store.side}</span>

                    <div style={{display: 'flex', gap: 8}}>
                        <Button onClick={() => store.setSide('buy')}>Buy</Button>
                        <Button variant="danger" onClick={() => store.setSide('sell')}>Sell</Button>
                    </div>
                </div>

                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'start'}}>
                    <label>Amount: {store.amount}</label>

                    <input
                        value={store.amount}
                        onChange={(e)=>store.setAmount(e.target.value)}
                        style={{padding: '8px 10px', borderRadius: 8, border: '1px solid #dcdcdc' }}
                    />
                </div>
            </div>
        </div>
    )
}