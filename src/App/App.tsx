import React, { useEffect } from 'react';
import './App.scss';
import { MainPAge } from '../pages/MainPage';
import Header from '../components/Header/Header';
import { Routes, Route } from "react-router-dom";
import { FavoritesPAge } from '../pages/FavoritesPage';
import { VacancyPAge } from '../pages/Vacancy';
import { vacancyAPI } from '../APITools/APITools';
import { useAppDispatch } from './store';
import { setVacansies } from './reducers/vacanciesReducer';

const App = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        vacancyAPI.getVacancies().then(res => {
            dispatch(setVacansies(res.data.objects))
        })
    }, [dispatch])

    return (
        <div className="App">
            <Header />
            <main className='content-wrapper'>
                <Routes>
                    <Route path="/" element={<MainPAge />} />
                    <Route path="/vacancies" element={<MainPAge />} />
                    <Route path="/favorites" element={<FavoritesPAge />} />
                    <Route path="/vacancy" element={<VacancyPAge />} />
                </Routes>
            </main>
        </div>
    );
}

export default App;
