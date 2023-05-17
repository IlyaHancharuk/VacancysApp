import React, { FC } from 'react'
import { EmptyStateBanner } from '../components/EmptyStateBanner/EmptyStateBanner'

type FavoritesPagePropsType = {}

export const FavoritesPage: FC<FavoritesPagePropsType> = (props) => {

    const empty = true

    return (
        !empty
        ? <div>
            Favorites Page
        </div>
        : <EmptyStateBanner />
    )
}
