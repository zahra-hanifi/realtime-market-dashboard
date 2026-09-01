import { useOrderStore } from "../store/useOrderStore.ts";
import { useMediaQuery } from "../hooks/useMediaQuery.ts";
import Modal from "./Modal.tsx";
import OrderForm from "./OrderForm.tsx";

export default function OrderFormDialog() {
    const isOrderOpen = useOrderStore((s) => s.isOrderOpen)
    const closeOrder = useOrderStore((s) => s.closeOrder)
    const isMobile = useMediaQuery('(width < 48rem)')

    if (!isMobile) return null

    return (
        <Modal open={isOrderOpen} onClose={closeOrder} title="Place Order">
            <OrderForm className="p-4 text-text-2" />
        </Modal>
    )
}
