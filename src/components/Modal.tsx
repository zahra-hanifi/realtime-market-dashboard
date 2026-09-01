import * as React from 'react'
import { useEffect, useId, useRef } from 'react'
import Button from './Button.tsx'

type ModalProps = {
    open: boolean
    onClose: () => void
    title?: React.ReactNode
    children?: React.ReactNode
}

export default function Modal({ open, onClose, title, children }: ModalProps) {
    const dialogRef = useRef<HTMLDialogElement>(null)
    const titleId = useId()

    useEffect(() => {
        const dialog = dialogRef.current
        if (!dialog) return

        if (open && !dialog.open) dialog.showModal()
        else if (!open && dialog.open) dialog.close()
    }, [open])

    useEffect(() => {
        if (!open) return

        const previous = document.body.style.overflow
        document.body.style.overflow = 'hidden'

        return () => {
            document.body.style.overflow = previous
        }
    }, [open])

    return (
        <dialog
            ref={dialogRef}
            aria-labelledby={titleId}
            onClose={onClose}
            onClick={(e) => {
                if (e.target === dialogRef.current) onClose()
            }}
            className="modal fixed inset-0 m-0 h-full max-h-none w-full max-w-none bg-transparent p-0
                       items-end justify-center open:flex md:items-center"
        >
            <div
                className="flex max-h-[85vh] w-full flex-col overflow-hidden rounded-t-2xl
                            border border-border bg-bg-2 text-text-2 md:max-w-md md:rounded-2xl"
            >
                <div className="mx-auto mt-2 h-1 w-10 shrink-0 rounded-full bg-border-strong md:hidden"></div>

                <div className="flex shrink-0 items-center justify-between border-b border-border px-4 py-3">
                    <span id={titleId} className="text-text-1 font-medium">
                        {title}
                    </span>

                    <Button onClick={onClose} className="text-2xl! p-0!" variant="ghost">
                        &times;
                    </Button>
                </div>

                <div className="overflow-y-auto overscroll-contain">{children}</div>
            </div>
        </dialog>
    )
}
