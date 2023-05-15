import React from 'react';
import './App.css';
import { MainPAge } from '../pages/MainPage';
import Header from '../components/Header';
import { Routes, Route } from "react-router-dom";
import { FavoritesPAge } from '../pages/FavoritesPage';
import { VacancyPAge } from '../pages/Vacancy';

const App = () => {
    return (
        <div className="App">
            <Header />
            <main>
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
