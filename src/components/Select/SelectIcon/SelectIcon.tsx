import React, { FC } from 'react'
import './selectIcon.scss'

type SelectIconPropsType = {
    open: boolean
}

export const SelectIcon: FC<SelectIconPropsType> = ({ open }) => {
    const mode = open ? 'active' : ''

    return (
        <div className={`select-icon ${mode}`} >
            <svg width="16" height="8" viewBox="0 0 16 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 0.999999L7.21905 6.33061C7.66844 6.7158 8.33156 6.7158 8.78095 6.33061L15 1" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
        </div>
    )
}
