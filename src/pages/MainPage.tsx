import React, { FC } from 'react'
import Button from '../components/Buttons/Button/Button'
import TextButton from '../components/Buttons/TextButton/TextButton'
import { FavoriteButton } from '../components/Buttons/FavoriteButton/FavoriteButton'

type MainPagePropsType = {}

export const MainPAge: FC<MainPagePropsType> = (props) => {
    const searchHandler = () => {
        console.log('search')
    }
    const applyHandler = () => {
        console.log('apply')
    }
    const resetHandler = () => {
        console.log('reset')
    }


    return (
        <div>Main Page
            <Button onClick={searchHandler} size='s'>Поиск</Button>
            <Button onClick={applyHandler} size='m'>Применить</Button>

            <br />
            <br />
            <FavoriteButton />
            <br />
            <br />

            <TextButton onClick={resetHandler} innerText='Сбросить все' ></TextButton>


        </div>
    )
}
