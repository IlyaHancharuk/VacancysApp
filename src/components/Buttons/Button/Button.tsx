import React, {ButtonHTMLAttributes, DetailedHTMLProps} from 'react'
import s from './Button.module.css'

type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

type ButtonPropsType = DefaultButtonPropsType & {
    size?: 's' | 'm';
}

const Button: React.FC<ButtonPropsType> = (
    {
        size,
        className,
        ...restProps
    }
) => {
    const finalClassName = `${size === 's' ? s.sizeS : s.sizeM} ${s.default} ${className}`

    return (
        <button
            className={finalClassName}
            {...restProps}
        />
    )
}

export default Button;
