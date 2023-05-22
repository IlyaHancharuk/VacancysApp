import React, { FC } from "react";
import { NavLink } from "react-router-dom";
import './header.scss'
import { Burger, Menu, createStyles } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

type HeaderPropsType = {}

const useStyles = createStyles((theme) => ({
    toggler: {
        [theme.fn.largerThan('767')]: {
            display: 'none',
        },
    },

    dropdown: {
        [theme.fn.largerThan('767')]: {
            display: 'none',
        },
    },

    dropdownItem: {
        display: 'flex'
    },
}));

const Header: FC<HeaderPropsType> = (props) => {

    const navLinks = [
        ['vacancies', 'Поиск Вакансий'],
        ['favorites', 'Избранное']
    ]

    const [opened, { toggle, close }] = useDisclosure(false);
    const { classes } = useStyles();

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

                <Menu shadow="md" width={200} opened={opened} onClose={close} onChange={toggle} >
                    <Menu.Target>
                        <Burger className={classes.toggler}
                                color="#232134"
                                opened={opened} onClick={toggle}
                        />
                    </Menu.Target>
                    <Menu.Dropdown className={classes.dropdown} >
                        <nav className="menu-dropdown" onClick={toggle}>
                            <ul className="menu__list" >
                                {linksList}
                            </ul>
                        </nav>
                    </Menu.Dropdown>
                </Menu>

            </header>
        </div>
    )
}

export default Header;
