import React, { useEffect } from 'react';
import './App.scss';
import { VacanciesPage } from '../pages/VacanciesPage';
import Header from '../components/Header/Header';
import { Routes, Route, Navigate } from "react-router-dom";
import { FavoritesPage } from '../pages/FavoritesPage';
import { VacancyPage } from '../pages/VacancyPage';
import { favoriteVacanciesAPI } from '../APITools/APITools';
import { useAppDispatch, useAppSelector } from './store';
import { getVacancies } from './reducers/vacanciesReducer';
import { getFavoriteVacancies } from './reducers/favoritesReducer';
import { getCaregories } from './reducers/categoriesReducer';
import { LoadingOverlay } from '@mantine/core';
import { getAuth } from './reducers/appReducer';

const App = () => {
    const dispatch = useAppDispatch()
    const vacancies = useAppSelector(state => state.vacancies.vacancies)

    useEffect(() => {
        dispatch(getAuth())
        let favoriteVacanciesResp = favoriteVacanciesAPI.getFavoriteVacancies()
        const favoriteVacancies = favoriteVacanciesResp || []
        dispatch(getVacancies(favoriteVacancies))
        dispatch(getFavoriteVacancies())
        dispatch(getCaregories())
    }, [dispatch])

    if (vacancies.length === 0) {
        return (
            <LoadingOverlay visible={true} overlayBlur={2}
                            loaderProps={{ size: 'lg', color: '#5E96FC' }}
            />
        )
    }

    return (
        <div className="App">
            <Header />
            <main className='content-wrapper'>
                <Routes>
                    <Route path="/" element={<Navigate to={"/vacancies"} />} />
                    <Route path="/vacancies" element={<VacanciesPage />} />
                    <Route path="/favorites" element={<FavoritesPage />} />
                    <Route path="/vacancies/:vacancyId" element={<VacancyPage />} />
                </Routes>
            </main>
        </div>
    );
}

export default App;
