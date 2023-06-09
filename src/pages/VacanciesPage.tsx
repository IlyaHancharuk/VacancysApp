import React, { FC } from 'react'
import { SearchInput } from '../components/SearchInput/SearchInput'
import { useAppDispatch, useAppSelector } from '../App/store'
import { VacanciesItem } from '../components/VacanciesItem/VacanciesItem'
import { LoadingOverlay, Pagination, SelectItem } from '@mantine/core'
import { getVacancies, updateVacansiecPageAC } from '../App/reducers/vacanciesReducer'
import { FiltersFormValuesType } from '../types'
import { FiltersContainer } from '../components/FiltersContainer/FiltersContainer'

type VacansiesPagePropsType = {}

const MAX_LENGTH_SELECT_ITEM_LEBEL = 30

export const VacanciesPage: FC<VacansiesPagePropsType> = (props) => {
    const dispatch = useAppDispatch()
    const { vacancies, total, MAX_VACANCIES_IN_PAGE, currentPage } = useAppSelector(state => state.vacancies)
    const categories = useAppSelector(state => state.categories)
    const favorite = useAppSelector(state => state.favorite.allFavorite)
    const filterParams = useAppSelector(state => state.filterParams)
    const status = useAppSelector(state => state.app.status)

    const disabled = status === 'loading' ? true : false
    const pageCount = Math.ceil(total / MAX_VACANCIES_IN_PAGE)

    const selectItems: SelectItem[] = categories.map(c => ({
        value: c.key.toString(),
        label: c.title_rus.length < MAX_LENGTH_SELECT_ITEM_LEBEL
            ? c.title_rus
            : c.title_trimmed 
    }))

    const vacansiesList = vacancies.map(v => (
        <VacanciesItem key={v.id} vacancy={v} withLink/>
    ))

    const onSearchSubmitCallback = () => {
        dispatch(getVacancies(favorite, filterParams))
        dispatch(updateVacansiecPageAC(1))
    }
    const onSubmitFiltersCallback = (filterValues: FiltersFormValuesType) => {
        dispatch(getVacancies(favorite, { ...filterValues, keyword: filterParams.keyword}))
        dispatch(updateVacansiecPageAC(1))
    }
    const onPaginateCallback = (page: number) => {
        dispatch(getVacancies(favorite, filterParams, page))
        dispatch(updateVacansiecPageAC(page))
    }

    return (
        <div className='vacancies-container'>

            <FiltersContainer disabled={disabled}
                              onFiltersSubmitCallback={onSubmitFiltersCallback}
                              onSearchSubmitCallback={onSearchSubmitCallback}
                              selectItems={selectItems} />

            <div className='vacancies'>
                <div className='vacancies__search-input'>
                    <SearchInput disabled={disabled} onSubmitCallback={onSearchSubmitCallback} />
                </div>

                <div className='vacancies__list'>
                    <LoadingOverlay visible={status === 'loading'} overlayBlur={2}
                                    loaderProps={{ size: 'lg', color: '#5E96FC' }}
                    />
                    {vacansiesList}
                </div>

                {
                    pageCount > 1 &&
                    <div className='pagination'>
                        <Pagination onChange={onPaginateCallback}
                                    total={pageCount}
                                    defaultValue={currentPage}
                                    value={currentPage}
                                    disabled={disabled}
                                    radius={4}
                                    spacing={8}
                                    styles={{
                                        control: {
                                            border: `1px solid #D5D6DC`,
                                            '&[data-active]': { backgroundColor: '#5E96FC', border: 'none' },
                                            ':disabled': {color: '#D5D6DC'}
                                        },
                                    }}
                        />
                    </div>
                }
            </div>
        </div>
    )
}
