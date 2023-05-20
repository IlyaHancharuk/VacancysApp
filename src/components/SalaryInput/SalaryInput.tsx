import React, { FC, useRef } from 'react'
import { NumberInput, NumberInputHandlers } from '@mantine/core'
import { InputControlButtons } from './InputControlButtons/InputControlButtons'
import { UseFormReturnType } from '@mantine/form'
import { FiltersFormValuesType } from '../../types'

type SalaryInputPropsType = {
    placeholder: string
    form: UseFormReturnType<FiltersFormValuesType>
    formValue: string
    disabled: boolean
}

export const SalaryInput: FC<SalaryInputPropsType> = ({
    placeholder, disabled,
    form, formValue,
}) => {
    const handlers = useRef<NumberInputHandlers>();

    return (
        <div>
            <NumberInput {...form.getInputProps(formValue)}
                         disabled={disabled}
                         type='number'
                         hideControls
                         handlersRef={handlers}
                         placeholder={placeholder}
                         min={0}
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
