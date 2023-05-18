import React, { FC } from 'react'
import './inputIcon.scss'

type InputIconPropsType = {
    mode: 'increase' | 'decrease'
    callback?(): void
}

export const InputIcon: FC<InputIconPropsType> = ({ mode, callback }) => {
    return (
        <div className={`input-icon ${mode}`} onClick={callback}>
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.50006 4.5L5.39054 1.83469C5.16584 1.6421 4.83428 1.6421 4.60959 1.83469L1.50006 4.5" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
        </div>
    )
}
