import React, {ButtonHTMLAttributes, DetailedHTMLProps} from 'react'
import s from './TextButton.module.css'

type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

type TextButtonPropsType = DefaultButtonPropsType & {
   innerText: string
}

const TextButton: React.FC<TextButtonPropsType> = (
    {
        innerText,
        className,
        ...restProps
    }
) => {
    const finalClassName = `${s.default} ${className}`

    return (
        <button
            className={finalClassName}
            {...restProps}
        >
            {innerText}
            <span className={s.line1}></span>
            <span className={s.line2}></span>

        </button>
    )
}

export default TextButton;
