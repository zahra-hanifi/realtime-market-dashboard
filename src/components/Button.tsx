import * as React from 'react'

type Variant = 'primary' | 'ghost' | 'danger'
type Size = 'sm' | 'md'

type ButtonProps = {
    variant?: Variant
    size?: Size
    loading?: boolean
} & React.ButtonHTMLAttributes<HTMLButtonElement>

const variantClass: Record<Variant, string> = {
    primary: 'bg-pos text-bg-0 hover:brightness-110',
    ghost: 'bg-transparent text-text-2 hover:bg-bg-hover',
    danger: 'bg-neg text-bg-0 hover:brightness-110',
}

const sizeClass: Record<Size, string> = {
    sm: 'px-2.5 py-1 text-xs',
    md: 'px-3 py-2 text-sm',
}

const base =
    'rounded-lg font-medium transition-colors ' +
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ' +
    'disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer'

export default function Button({
    variant = 'primary',
    size = 'md',
    loading = false,
    disabled,
    className = '',
    children,
    ...rest
}: ButtonProps) {
    return (
        <button
            disabled={disabled || loading}
            className={`${base} ${variantClass[variant]} ${sizeClass[size]} ${className}`}
            {...rest}
        >
            {loading ? 'Loading...' : children}
        </button>
    )
}
