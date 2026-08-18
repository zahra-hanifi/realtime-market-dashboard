import * as React from "react";

type Variant = 'primary' | 'ghost' | 'danger'

type Size = 'sm' | 'md'

type ButtonProps = {
    variant?: Variant
    size?: Size
    loading?: boolean
    disabled?: boolean
    children?: React.ReactNode
    onClick?: () => void
} & React.ButtonHTMLAttributes<HTMLButtonElement>

const variantStyle:Record<Variant, React.CSSProperties> = {
    primary: { background: '#02c06e', color: '#fff', border: 'none' },
    ghost: { background: '#757980', color: '#2B2D31', border: '1px solid #2B2D31' },
    danger: { background: '#F1415E', color: '#fff', border: 'none' },
}

const sizeStyle:Record<Size, React.CSSProperties> = {
    sm: { padding: '4px 10px', fontSize: 12 },
    md: { padding: '8px 12px', fontSize: 14 },
}

export default function Button({variant = 'primary', size = 'md', loading=false, disabled, children, onClick, style, ...rest}: ButtonProps) {
    return (
        <button
            disabled={disabled || loading}
            style={{
                borderRadius: 8,
                cursor: disabled || loading ? 'not-allowed' : 'pointer',
                opacity: disabled || loading ? 0.6 : 1,
                ...variantStyle[variant],
                ...sizeStyle[size],
                ...style
            }}
            {...rest}
            onClick={onClick}
        >
            {loading ? 'Loading...': children}
        </button>
    )
}