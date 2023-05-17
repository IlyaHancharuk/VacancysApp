import React, { FC } from 'react'
import { useParams } from 'react-router-dom'
import { VacanciesItem } from '../components/VacanciesItem/VacanciesItem'
import { useAppSelector } from '../App/store'

type VacancyPagePropsType = {
    
}

export const VacancyPage: FC<VacancyPagePropsType> = (props) => {
    const vacancies = useAppSelector(state => state.vacancies)
    const { vacancyId } = useParams()
    const id = vacancyId ? Number(vacancyId) : null
    const vacancy = vacancies.filter(v => v.id === id)
    const description = vacancy[0].vacancyRichText

    return (
        vacancy
        ? <div className='vacancy'>
            <VacanciesItem vacancy={vacancy[0]} withLink={false}/>
            <div className='vacancy__description _card' dangerouslySetInnerHTML={{__html: description}}></div>
        </div>
        : <div>Oops!</div>
    )
}
