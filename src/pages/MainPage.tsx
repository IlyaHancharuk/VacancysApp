import React, { FC } from 'react'
import { SearchInput } from '../components/SearchInput/SearchInput'
import { VacanciesItem } from '../components/VacanciesItem/VacanciesItem'

type MainPagePropsType = {}

export const MainPAge: FC<MainPagePropsType> = (props) => {

    return (
        <div className='vacansies-container'>
            <div className='filter-block'>FilterBlock</div>
            <div className='vacancies'>
                <div className='vacansies__search-input'>
                    <SearchInput />
                </div>
                <div className='vacancies__list'>
                    <VacanciesItem employmentType='Full day'
                                   location='Minsk'
                                   salary='2000$'
                                   title='Best Work'
                    />
                </div>
            </div>
        </div>
    )
}
