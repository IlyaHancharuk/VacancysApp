import React, { useEffect } from 'react';
import './App.scss';
import { MainPage } from '../pages/MainPage';
import Header from '../components/Header/Header';
import { Routes, Route } from "react-router-dom";
import { FavoritesPage } from '../pages/FavoritesPage';
import { VacancyPage } from '../pages/VacancyPage';
import { vacancyAPI } from '../APITools/APITools';
import { useAppDispatch, useAppSelector } from './store';
import { setVacansies } from './reducers/vacanciesReducer';

const App = () => {
    const dispatch = useAppDispatch()
    const vacancies = useAppSelector(state => state.vacancies)

    useEffect(() => {
        vacancyAPI.getVacancies().then(res => {
            dispatch(setVacansies(res.data.objects))
        })
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
