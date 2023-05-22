import React, { FC } from "react";
import { NavLink } from "react-router-dom";
import './header.scss'

type HeaderPropsType = {
    
}

const Header: FC<HeaderPropsType> = (props) => {

    const navLinks = [
        ['vacancies', 'Поиск Вакансий'],
        ['favorites', 'Избранное']
    ]

    const linksList = navLinks.map((link, i) => (
        <li className="menu__item" key={`navlink-${i}`}>
            <NavLink to={link[0]} end
                     className={({ isActive }) => isActive ? "active" : ""}
            >
                {link[1]}
            </NavLink>
        </li>
    ))

    return (
        <div className="header-container">
            <header className="header">
                <div className="logo">
                    <div className="logo__icon">
                        <div className="ellipse ellipse-1"></div>
                        <div className="ellipse ellipse-2"></div>
                    </div>
                    <div className="logo__title">Jobored</div>
                </div>
                <nav className="menu">
                    <ul className="menu__list">
                        {linksList}
                    </ul>
                </nav>
            </header>
        </div>
    )
}

export default Header;
