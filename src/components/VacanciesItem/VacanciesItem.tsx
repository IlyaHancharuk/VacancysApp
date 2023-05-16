import React, { FC } from 'react'
import './vacanciesItem.scss'
import { FavoriteButton } from '../Buttons/FavoriteButton/FavoriteButton'
import icon from './../../assets/svg/icon.svg'
import { Vacancy } from '../../types'

type VacanciesItemPropsType = {
    vacancy: Vacancy
}

export const VacanciesItem: FC<VacanciesItemPropsType> = ({
    vacancy
}) => {
    const salary = (function () {
        const {payment_from, payment_to, currency } = vacancy
        if (payment_from !== 0 && payment_to !== 0) return `з/п ${payment_from} - ${payment_to} ${currency}`
        if (payment_from === 0 && payment_to === 0) return 'з/п договорная'
        if (payment_from === 0 ) return `з/п до ${payment_to} ${currency}`
        if (payment_to === 0) return `з/п от ${payment_from} ${currency}`
        return ''
    })()

    return (
        <div className='vacancies__item'>
            <div className='item__title'>{vacancy.profession}</div>
            <div className='item__description'>
                <span className='salary'>{salary}</span>
                <span className='dot'> • </span>
                <span className='employment-type'>{vacancy.type_of_work.title}</span>
            </div>
            <div className='item__location'>
                <img src={icon} alt="location-icon" />
                <span>{vacancy.town.title}</span>
            </div>
            <div className='item__favorite-button'>
                <FavoriteButton />
            </div>
        </div>
    )
}
