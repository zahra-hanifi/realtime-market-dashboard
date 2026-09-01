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
    primary: { background: '#6CB084', color: '#061009' },
    ghost: { background: 'transparent', color: '#A9ADB1' },
    danger: { background: '#C6706A', color: '#061009' },
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
                fontWeight: '500',
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