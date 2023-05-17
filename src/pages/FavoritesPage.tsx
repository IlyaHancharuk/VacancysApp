import React, { FC } from 'react'
import { EmptyStateBanner } from '../components/EmptyStateBanner/EmptyStateBanner'
import { useAppSelector } from '../App/store'
import { VacanciesItem } from '../components/VacanciesItem/VacanciesItem'

type FavoritesPagePropsType = {}

export const FavoritesPage: FC<FavoritesPagePropsType> = (props) => {
    const favorite = useAppSelector(state => state.favorite)
    const favotiteList = favorite.map(fv => (
        <VacanciesItem withLink vacancy={fv} key={fv.id} />
    ))

    return (
        favotiteList.length !==0
        ? <div className='favorite-list'>
            {favotiteList}
        </div>
        : <EmptyStateBanner />
    )
}
