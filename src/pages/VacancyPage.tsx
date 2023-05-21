import React, { FC } from 'react'
import { useParams } from 'react-router-dom'
import { VacanciesItem } from '../components/VacanciesItem/VacanciesItem'
import { useAppSelector } from '../App/store'

type VacancyPagePropsType = {}

export const VacancyPage: FC<VacancyPagePropsType> = (props) => {
    const vacancies = useAppSelector(state => state.vacancies.vacancies)
    const favorite = useAppSelector(state => state.favorite.allFavorite)
    const { vacancyId } = useParams()
    const id = vacancyId ? Number(vacancyId) : null
    const vacancy = vacancies.find(v => v.id === id) || favorite.find(v => v.id === id)

    return (
        vacancy
        ? <div className='vacancy'>
            <VacanciesItem vacancy={vacancy} withLink={false}/>
            <div className='vacancy__description _card'
                 dangerouslySetInnerHTML={{ __html: vacancy.vacancyRichText }}>
            </div>
        </div>
        : <h1>Oops!</h1>
    )
}
