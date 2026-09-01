export default function Header() {
    return (
        <header className="bg-bg-2 py-3 px-4 flex items-center gap-x-3 border border-b-border sticky top-0 z-20">
            <div className="w-4 h-4 sm:w-5 sm:h-5 rounded bg-accent"></div>

            <h1 className="text-base text-text-1 font-medium">Market Terminal</h1>

            <div className="ms-auto items-center gap-x-4 hidden sm:flex text-text-2 text-sm uppercase">
                <span>spot</span>

                <span>/</span>

                <span>20 markest</span>

                <div className="flex items-center gap-x-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-pos"></div>
                    live
                </div>
            </div>
        </header>
    )
}
