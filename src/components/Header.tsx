import React, { FC } from "react";

type HeaderPropsType = {
    
}

const Header: FC<HeaderPropsType> = (props) => {
    
    return (
        <header className="header">
            <div className="logo">
                <div className="logo__icon">
                    <div className="ellipse ellipse-1"></div>
                    <div className="ellipse ellipse-2"></div>
                </div>
                <div className="logo__title">Jobored</div>
            </div>
            <nav className="menu">
                <ul>
                    <li>Поиск Вакансий</li>
                    <li>Избранное</li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;
