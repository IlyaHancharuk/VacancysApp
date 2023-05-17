import React from 'react'
import './emptyStateBanner.scss'
import frame from './../../assets/svg/frame.svg'
import { NavLink } from 'react-router-dom'
import { Button } from '@mantine/core'

export const EmptyStateBanner = () => {
    return (
        <div className='empty-state-banner'>
            <div className='empty-state-banner__icon'>
                <img src={frame} alt="empty-state-icon" />
            </div>
            <b className='empty-state-banner__title'>Упс, здесь еще ничего нет!</b>
            <NavLink to={'/vacancies'}>
                <Button className='empty-state-banner__button' variant='light' >Поиск вакансий</Button>
            </NavLink>
        </div>
    )
}
