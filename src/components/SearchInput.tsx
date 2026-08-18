export default function SearchInput({search, onSearchChange}:{search:string, onSearchChange: (value: string) => void}) {
    return (
        <input
            value={search}
            placeholder="Search..."
            style={{padding: '8px 10px', borderRadius: 8, border: '1px solid #dcdcdc' }}
            onChange={(event) => onSearchChange(event.target.value)}
        />
    )
}