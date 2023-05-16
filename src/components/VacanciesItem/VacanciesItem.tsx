import React, { FC } from 'react'
import './vacanciesItem.scss'
import { FavoriteButton } from '../Buttons/FavoriteButton/FavoriteButton'
import icon from './../../assets/svg/icon.svg'

type VacanciesItemPropsType = {
    title: string
    salary: string
    employmentType: string
    location: string
}

export const VacanciesItem: FC<VacanciesItemPropsType> = ({
    employmentType,
    location,
    salary,
    title
}) => {
    return (
        <div className='vacancies__item'>
            <div className='item__title'>{title}</div>
            <div className='item__description'>
                <span className='salary'>{salary}</span>
                <span className='dot'> • </span>
                <span className='employment-type'>{employmentType}</span>
            </div>
            <div className='item__location'>
                <img src={icon} alt="location-icon" />
                <span>{location}</span>
            </div>
            <div className='item__favorite-button'>
                <FavoriteButton />
            </div>
        </div>
    )
}
