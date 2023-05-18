import React, { FC } from 'react'
import { SearchInput } from '../components/SearchInput/SearchInput'
import Filters from '../components/Filters/Filters'
import { useAppSelector } from '../App/store'
import { Vacancy } from '../types'
import { VacanciesItem } from '../components/VacanciesItem/VacanciesItem'

type MainPagePropsType = {}

export const MainPage: FC<MainPagePropsType> = (props) => {
    const vacansies = useAppSelector<Vacancy[]>(state => state.vacancies)

    const vacansiesList = vacansies.map(v => (
        <VacanciesItem key={v.id} vacancy={v} withLink/>
    ))

    return (
        <div className='vacansies-container'>
            <Filters selectItems={['React', 'Angular', 'Svelte', 'Vue']}/>
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
