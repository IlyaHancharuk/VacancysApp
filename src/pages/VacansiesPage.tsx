import React, { FC } from 'react'
import { SearchInput } from '../components/SearchInput/SearchInput'
import Filters from '../components/Filters/Filters'
import { useAppSelector } from '../App/store'
import { VacanciesItem } from '../components/VacanciesItem/VacanciesItem'
import { SelectItem } from '@mantine/core'

type VacansiesPagePropsType = {}

const MAX_LENGTH_SELECT_ITEM_LEBEL = 30

export const VacansiesPage: FC<VacansiesPagePropsType> = (props) => {
    const vacansies = useAppSelector(state => state.vacancies)
    const categories = useAppSelector(state => state.categories)
    const selectItems: SelectItem[] = categories.map(c => ({
        value: c.key.toString(),
        label: c.title_rus.length < MAX_LENGTH_SELECT_ITEM_LEBEL
            ? c.title_rus
            : c.title_trimmed 
    }))

    const vacansiesList = vacansies.map(v => (
        <VacanciesItem key={v.id} vacancy={v} withLink/>
    ))

    return (
        <div className='vacansies-container'>
            <Filters selectItems={selectItems}/>
            <div className='vacancies'>
                <div className='vacansies__search-input'>
                    <SearchInput />
                </div>
                <div className='vacancies__list'>
                    {vacansiesList}
                </div>
            </div>
        </div>
    )
}
