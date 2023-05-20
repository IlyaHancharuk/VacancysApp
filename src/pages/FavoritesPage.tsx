import React, { FC } from 'react'
import { EmptyStateBanner } from '../components/EmptyStateBanner/EmptyStateBanner'
import { useAppDispatch, useAppSelector } from '../App/store'
import { VacanciesItem } from '../components/VacanciesItem/VacanciesItem'
import { LoadingOverlay, Pagination } from '@mantine/core'
import { changeFavoritePageAC } from '../App/reducers/favoritesReducer'

type FavoritesPagePropsType = {}

export const FavoritesPage: FC<FavoritesPagePropsType> = (props) => {
    const dispatch = useAppDispatch()
    const currentPage = useAppSelector(state => state.favorite.currentPage)
    const totalPage = useAppSelector(state => state.favorite.totalPage())
    const favoriteToView = useAppSelector(state => state.favorite.favoriteToView())
    const status = useAppSelector(state => state.app.status)

    const disabled = status === 'loading' ? true : false
    const favotiteList = favoriteToView.map(fv => (
        <VacanciesItem withLink vacancy={fv} key={fv.id} />
    ))

    const onPaginateCallback = (value: number) => {
        dispatch(changeFavoritePageAC(value))
    }

    return (
        favotiteList.length !== 0
            ? <div className='favorite'>
                <div className='favorite__list'>
                    <LoadingOverlay visible={status === 'loading'} overlayBlur={2}
                                    loaderProps={{ size: 'lg', color: '#5E96FC' }}
                    />
                    {favotiteList}
                </div>

                {
                    totalPage > 1 &&
                    <div className='pagination'>
                        <Pagination onChange={onPaginateCallback}
                                    total={totalPage}
                                    defaultValue={currentPage}
                                    disabled={disabled}
                                    radius={4}
                                    spacing={8}
                                    styles={{
                                        control: {
                                            border: `1px solid #D5D6DC`,
                                            '&[data-active]': { backgroundColor: '#5E96FC', border: 'none' },
                                            ':disabled': { color: '#D5D6DC' }
                                        },
                                    }}
                        />
                    </div>
                }

            </div>
            : <EmptyStateBanner />
    )
}
