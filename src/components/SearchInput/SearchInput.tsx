import React, { ChangeEvent, FC } from 'react'
import { TextInput } from '@mantine/core';
import search from './../../assets/svg/search.svg'
import Button from '../Buttons/Button/Button';
import { useAppDispatch, useAppSelector } from '../../App/store';
import { setSearchParamsAC } from '../../App/reducers/filterParamsReducer';

type SearchInputPropsType = {
    onSubmitCallback(): void
    disabled: boolean
}

export const SearchInput: FC<SearchInputPropsType> = ({ onSubmitCallback, disabled }) => {
    const dispatch = useAppDispatch()
    const filterParams = useAppSelector(state => state.filterParams)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearchParamsAC(e.currentTarget.value))
    }

    const icon = <img src={search} alt="search-icon" />
    return (
        <TextInput
            value={filterParams.keyword}
            onChange={onChangeHandler}
            disabled={disabled}
            icon={icon}
            placeholder="Введите название вакансии"
            radius={'8px'}
            rightSection={<Button disabled={disabled} size='s' children={'Поиск'} onClick={onSubmitCallback} />}
            rightSectionWidth={83}
            styles={{
                rightSection: { marginRight: '12px' },
                input: { height: '48px' }
            }}
        />
    )
}
