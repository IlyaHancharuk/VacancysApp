import React, { useEffect } from 'react';
import './App.scss';
import { VacansiesPage } from '../pages/VacansiesPage';
import Header from '../components/Header/Header';
import { Routes, Route } from "react-router-dom";
import { FavoritesPage } from '../pages/FavoritesPage';
import { VacancyPage } from '../pages/VacancyPage';
import { favoriteVacanciesAPI } from '../APITools/APITools';
import { useAppDispatch, useAppSelector } from './store';
import { getVacancies } from './reducers/vacanciesReducer';
import { getFavoriteVacancies } from './reducers/favoritesReducer';
import { getCaregories } from './reducers/categoriesReducer';

const App = () => {
    const dispatch = useAppDispatch()
    const vacancies = useAppSelector(state => state.vacancies.vacancies)

    useEffect(() => {
        let favoriteVacanciesResp = favoriteVacanciesAPI.getFavoriteVacancies()
        const favoriteVacancies = favoriteVacanciesResp || []
        dispatch(getVacancies(favoriteVacancies))
        dispatch(getFavoriteVacancies())
        dispatch(getCaregories())
    }, [dispatch])

    if (vacancies.length === 0) {
        return (
            <h1>Loading...</h1>
        )
    }

    return (
        <div className="App">
            <Header />
            <main className='content-wrapper'>
                <Routes>
                    <Route path="/" element={<VacansiesPage />} />
                    <Route path="/vacancies" element={<VacansiesPage />} />
                    <Route path="/favorites" element={<FavoritesPage />} />
                    <Route path="/vacancies/:vacancyId" element={<VacancyPage />} />
                </Routes>
            </main>
        </div>
    );
}

export default App;
