import React, { FC } from 'react'
import './vacanciesItem.scss'
import { FavoriteButton } from '../Buttons/FavoriteButton/FavoriteButton'
import locationIcon from './../../assets/svg/location.svg'
import { Vacancy } from '../../types'
import { NavLink } from 'react-router-dom'

type VacanciesItemPropsType = {
    vacancy: Vacancy
    withLink: boolean
}

export const VacanciesItem: FC<VacanciesItemPropsType> = ({
    vacancy,
    withLink
}) => {
    const salary = (function () {
        const {payment_from, payment_to, currency } = vacancy
        if (payment_from !== 0 && payment_to !== 0) return `з/п ${payment_from} - ${payment_to} ${currency}`
        if (payment_from === 0 && payment_to === 0) return 'з/п договорная'
        if (payment_from === 0 ) return `з/п до ${payment_to} ${currency}`
        if (payment_to === 0) return `з/п от ${payment_from} ${currency}`
        return ''
    })()

    const title = withLink
        ? <NavLink to={`/vacancies/${vacancy.id}`} end>
            <div className='item__title'>{vacancy.profession}</div>
        </NavLink>
        : <div className='item__title'>{vacancy.profession}</div>

    return (
        <div className='vacancies__item _card' data-elem={`vacancy-${vacancy.id}`}>
            {title}
            <div className='item__description'>
                <span className='salary'>{salary}</span>
                <span className='dot'> • </span>
                <span className='employment-type'>{vacancy.type_of_work.title}</span>
            </div>
            <div className='item__location'>
                <img src={locationIcon} alt="location-icon" />
                <span>{vacancy.town.title}</span>
            </div>
            <div className='item__favorite-button'>
                <FavoriteButton vacancy={vacancy} />
            </div>
        </div>
    )
}
