import React, { ChangeEvent, FC } from 'react'
import { TextInput } from '@mantine/core';
import search from './../../assets/svg/search.svg'
import Button from '../Buttons/Button/Button';
import { useAppDispatch, useAppSelector } from '../../App/store';
import { setSearchParamsAC } from '../../App/reducers/filterParamsReducer';

type SearchInputPropsType = {
    disabled: boolean
    onSubmitCallback(): void
    onDrawerClose?(): void
}

export const SearchInput: FC<SearchInputPropsType> = ({
    disabled,
    onSubmitCallback,
    onDrawerClose,
}) => {
    const dispatch = useAppDispatch()
    const filterParams = useAppSelector(state => state.filterParams)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearchParamsAC(e.currentTarget.value))
    }

    const onClickCallback = () => {
        onSubmitCallback()
        onDrawerClose && onDrawerClose()
    }

    const icon = <img src={search} alt="search-icon" />
    return (
        <TextInput
            data-elem="search-input"
            value={filterParams.keyword}
            onChange={onChangeHandler}
            disabled={disabled}
            icon={icon}
            placeholder="Введите название вакансии"
            radius={'8px'}
            rightSection={
                <Button data-elem="search-button"
                        disabled={disabled}
                        size='s' children={'Поиск'}
                        onClick={onClickCallback}
                />
            }
            rightSectionWidth={83}
            styles={{
                rightSection: { marginRight: '12px' },
                input: {
                    height: '48px',
                    border: '1px solid #EAEBED',
                }
            }}
        />
    )
}
