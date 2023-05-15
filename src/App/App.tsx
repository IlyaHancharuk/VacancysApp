import React from 'react';
import './App.css';
import { MainPAge } from '../pages/MainPage';
import Header from '../components/Header';

function App() {
    return (
        <div className="App">
            <Header />
            <main>
              
                <MainPAge />
            </main>
        </div>
    );
}

export default App;
