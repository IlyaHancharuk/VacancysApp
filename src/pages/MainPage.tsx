import React, { FC } from 'react'
import { SearchInput } from '../components/SearchInput/SearchInput'
import { VacanciesItem } from '../components/VacanciesItem/VacanciesItem'
import { useAppSelector } from '../App/store'
import { Vacancy } from '../types'

type MainPagePropsType = {}

export const MainPAge: FC<MainPagePropsType> = (props) => {
    const vacansies = useAppSelector<Vacancy[]>(state => state.vacancies)

    const vacansiesList = vacansies.map(v => (
        <VacanciesItem key={v.id} vacancy={v} />
    ))

    return (
        <div className='vacansies-container'>
            <div className='filter-block'>FilterBlock</div>
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
