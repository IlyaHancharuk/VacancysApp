import React, { FC, useRef, useState } from 'react'
import { NumberInput, NumberInputHandlers } from '@mantine/core'
import { InputControlButtons } from './InputControlButtons/InputControlButtons'

type SalaryInputPropsType = {
    placeholder: string
}

export const SalaryInput: FC<SalaryInputPropsType> = ({ placeholder }) => {
    const [value, setValue] = useState<number | ''>('');
    const handlers = useRef<NumberInputHandlers>();

    return (
        <div>
            <NumberInput value={value} onChange={setValue}
                         type='number'
                         hideControls
                         handlersRef={handlers}
                         placeholder={placeholder}
                         min={0}
                         step={500}
                         stepHoldDelay={500}
                         stepHoldInterval={(t) => Math.max(1000 / t ** 2, 25)}
                         rightSection={ 
                            <InputControlButtons increment={() => handlers.current?.increment()}
                                                 decrement={() => handlers.current?.decrement()}
                            />
                        }
                         rightSectionWidth={10}
                         radius={8}
                         styles={{
                            rightSection: {
                                marginRight: '12px',
                            },
                            input: {
                                height: '42px', padding: '11px 12px 11px 12px',
                                fontFamily: 'Inter-Regular', borderWidth: '1px',
                                fontSize: '14px', lineHeight: '20px'
                            }
                        }}
            />
        </div>
    )
}
