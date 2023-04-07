import React from "react"
import styles from './header.module.css'
import { useNavigate } from "react-router-dom"
import Logo from "../svg/logo"

export const Header = () => {
    const navigate = useNavigate();

    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <Logo color={"--back-color"} />
                <p>Stylia Online</p>
            </div>
            <ul>
                <li onClick={() => navigate("/")}>Главная</li>
                <li onClick={() => navigate("/aboutme")}>О нас</li>
                <li onClick={() => navigate("/product")}>Товары</li>
                <li onClick={() => navigate("/contact")}>Контакты</li>
            </ul>
            <ul style={{ marginLeft: "auto" }}>
                <li>Войти</li>
                <li>Корзина</li>
            </ul>
        </header>
    )
}

export default Header