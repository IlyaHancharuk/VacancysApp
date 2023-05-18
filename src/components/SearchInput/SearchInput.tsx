import React, { ChangeEvent, useState } from 'react'

import { TextInput } from '@mantine/core';
import search from './../../assets/svg/search.svg'
import Button from '../Buttons/Button/Button';

export const SearchInput = () => {
    const [value, setValue] = useState('')

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }

    const startSearch = () => {
        console.log(value)
        setValue('')
    }

    const icon = <img src={search} alt="search-icon" />
    return (
        <TextInput
            value={value}
            onChange={onChangeHandler}
            icon={icon}
            placeholder="Введите название вакансии"
            radius={'8px'}
            size='lg'
            rightSection={<Button size='s' children={'Поиск'} onClick={startSearch} />}
            rightSectionWidth={83}
            styles={{
                rightSection: {
                    marginRight: '12px'
                }
            }}
        />
    )
}
