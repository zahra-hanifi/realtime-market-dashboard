import Header from "./components/Header.tsx";
import CoinsList from "./components/CoinsList.tsx";
import OrderForm from "./components/OrderForm.tsx";
import OrderFormDialog from "./components/OrderFormDialog.tsx";

function App() {
  return (
    <div className="">
     <Header/>

      <div className="flex min-h-[calc(100vh-50px)] sm:h-[calc(100vh-50px)] sm:overflow-hidden">
          <CoinsList/>

          <OrderForm/>

          <OrderFormDialog/>
      </div>
    </div>
  )
}

export default App
