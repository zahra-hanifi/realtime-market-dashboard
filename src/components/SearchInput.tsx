export default function SearchInput({
    search,
    onSearchChange,
}: {
    search: string
    onSearchChange: (value: string) => void
}) {
    return (
        <div className="px-4 py-3 sticky top-12.5 sm:top-2 bg-bg-0 border-b border-border z-20">
            <input
                value={search}
                placeholder="Search name or symbol"
                className="w-full border border-border px-2 py-2.5 rounded-lg text-text-2 focus:outline-2 focus:outline-accent"
                onChange={(event) => onSearchChange(event.target.value)}
            />
        </div>
    )
}
