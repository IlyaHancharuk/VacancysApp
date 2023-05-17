import React, { useEffect } from 'react';
import './App.scss';
import { MainPage } from '../pages/MainPage';
import Header from '../components/Header/Header';
import { Routes, Route } from "react-router-dom";
import { FavoritesPage } from '../pages/FavoritesPage';
import { VacancyPage } from '../pages/VacancyPage';
import { favoriteVacanciesAPI, vacancyAPI } from '../APITools/APITools';
import { useAppDispatch, useAppSelector } from './store';
import { setVacansiesAC } from './reducers/vacanciesReducer';
import { getFavoriteVacancies } from './reducers/favoritesReducer';

const App = () => {
    const dispatch = useAppDispatch()
    const vacancies = useAppSelector(state => state.vacancies)

    useEffect(() => {
        let favoriteVacanciesResp = favoriteVacanciesAPI.getFavoriteVacancies()
        const favoriteVacancies = favoriteVacanciesResp || []
        vacancyAPI.getVacancies().then(res => {
            dispatch(setVacansiesAC(res.data.objects, favoriteVacancies))
        })
        dispatch(getFavoriteVacancies())
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
                    <Route path="/" element={<MainPage />} />
                    <Route path="/vacancies" element={<MainPage />} />
                    <Route path="/favorites" element={<FavoritesPage />} />
                    <Route path="/vacancies/:vacancyId" element={<VacancyPage />} />
                </Routes>
            </main>
        </div>
    );
}

export default App;
