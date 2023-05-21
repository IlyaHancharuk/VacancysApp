import React, { FC } from 'react'
import { InputIcon } from './InputIcon/InputIcon'
import './inputControlButtons.scss'

type InputControlButtonsPropsType = {
    increment(): void
    decrement(): void
}

export const InputControlButtons: FC<InputControlButtonsPropsType> = ({ increment, decrement }) => {
    return (
        <div className='input-control-buttons'>
            <InputIcon callback={increment} mode='increase'/>
            <InputIcon callback={decrement} mode='decrease'/>
        </div>
    )
}
