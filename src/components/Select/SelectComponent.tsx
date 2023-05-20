import React, { FC, useState } from 'react'
import './selectComponent.scss'
import { Select, SelectItem } from '@mantine/core'
import { SelectIcon } from './SelectIcon/SelectIcon'
import { UseFormReturnType } from '@mantine/form'
import { FiltersFormValuesType } from '../../types'

type SelectComponentPropsType = {
    items: SelectItem[]
    form: UseFormReturnType<FiltersFormValuesType>
    formValue: string
    disabled: boolean
}

export const SelectComponent: FC<SelectComponentPropsType> = ({
    items, form, formValue,
    disabled
}) => {
    const [open, setOpen] = useState(false)
    const onClickHandler = () => {
        setOpen(!open)
    }

    const { onChange } = {...form.getInputProps(formValue)}

    const onChangeHandler = (value: string | null) => {
        setOpen(!open)
        onChange(value)
    }

    const onBlurHandler = () => {
        setOpen(false)
    }
    return (
        <div className='select-component'>
            <Select data-elem="industry-select"
                    data={items}
                    {...form.getInputProps(formValue)}
                    disabled={disabled}
                    placeholder='Выберите отрасль'
                    rightSection={<SelectIcon open={open} />}
                    rightSectionWidth={16}
                    styles={{
                            rightSection: {
                                pointerEvents: 'none', marginRight: '17px',
                                
                            },
                            input: {
                                height: '42px', padding: '8px 12px 8px 12px',
                                fontFamily: 'Inter-Regular', borderWidth: '1px'
                            },
                            item: {
                                fontFamily: 'Inter-Regular',
                                '&:hover': { backgroundColor: '#DEECFF' },
                                '&[data-selected]': { backgroundColor: '#5E96FC' }
                            },
                        }}
                    maxDropdownHeight={188}
                    radius={8}
                    onClick={onClickHandler}
                    onBlur={onBlurHandler}
                    onChange={onChangeHandler}
            />
        </div>
    )
}
