import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './NavBar.module.css';

export default function NavBar() {
    return (
        <header className={s.navbar}>
            <div>
                
            </div>
            <div className={s.titleContainer}>
                <span className={s.title}>PoKéMoN</span>
            </div>
            <nav>
                <ul className={s.list}>
                    <li className={s.listitem}>
                        <NavLink className={s.navlink} exact to="/home" >Home</NavLink>
                        <NavLink className={s.navlink} to="/form" >Create Pokemon</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}