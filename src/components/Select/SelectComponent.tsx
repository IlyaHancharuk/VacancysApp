import React, { FC, useState } from 'react'
import './selectComponent.scss'
import { Select } from '@mantine/core'
import { SelectIcon } from './SelectIcon/SelectIcon'

type SelectComponentPropsType = {
    items: string[]
}

export const SelectComponent: FC<SelectComponentPropsType> = ({ items }) => {
    const [open, setOpen] = useState(false)
    const onClickHandler = () => {
        setOpen(!open)
    }
    const onBlurHandler = () => {
        setOpen(false)
    }
    return (
        <div className='select-component'>
            <Select data={items}
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
                    onChange={onClickHandler}
            />
        </div>
    )
}
