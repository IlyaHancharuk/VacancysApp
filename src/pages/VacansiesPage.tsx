import React, { FC } from 'react'
import { SearchInput } from '../components/SearchInput/SearchInput'
import Filters from '../components/Filters/Filters'
import { useAppDispatch, useAppSelector } from '../App/store'
import { VacanciesItem } from '../components/VacanciesItem/VacanciesItem'
import { SelectItem } from '@mantine/core'
import { getVacancies } from '../App/reducers/vacanciesReducer'
import { FiltersFormValuesType } from '../types'

type VacansiesPagePropsType = {}

const MAX_LENGTH_SELECT_ITEM_LEBEL = 30

export const VacansiesPage: FC<VacansiesPagePropsType> = (props) => {
    const dispatch = useAppDispatch()
    const vacansies = useAppSelector(state => state.vacancies)
    const categories = useAppSelector(state => state.categories)
    const favorites = useAppSelector(state => state.favorite)
    const filterParams = useAppSelector(state => state.filterParams)

    const selectItems: SelectItem[] = categories.map(c => ({
        value: c.key.toString(),
        label: c.title_rus.length < MAX_LENGTH_SELECT_ITEM_LEBEL
            ? c.title_rus
            : c.title_trimmed 
    }))

    const vacansiesList = vacansies.map(v => (
        <VacanciesItem key={v.id} vacancy={v} withLink/>
    ))

    const onSubmitCallback = () => {
        dispatch(getVacancies(favorites, filterParams))
    }

    const onSubmitFiltersCallback = (filterValues: FiltersFormValuesType) => {
        dispatch(getVacancies(favorites, { ...filterValues, keyword: filterParams.keyword}))
    }

    return (
        <div className='vacansies-container'>
            <Filters onSubmitCallback={onSubmitFiltersCallback} selectItems={selectItems} />
            <div className='vacancies'>
                <div className='vacansies__search-input'>
                    <SearchInput onSubmitCallback={onSubmitCallback} />
                </div>
                <div className='vacancies__list'>
                    {vacansiesList}
                </div>
            </div>
        </div>
    )
}
