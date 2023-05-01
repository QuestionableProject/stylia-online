import React, { useState } from "react"
import styles from './header.module.css'
import { useNavigate } from "react-router-dom"
import Logo from "../svg/logo"
import Portal from "../../hooks/portal"
import Login from "../login/login"
import Background from "../modal-background"
import Curt from "../curt/curt"
import HamburgerIcon from "../svg/hamburger"
import { useAuth } from "../../hooks/use-auth"
import { useDispatch } from "react-redux"
import { removeUser } from "../../store/slices/userSlice"
import Cookies from "js-cookie"
import Hamburger from "../hamburger/hamburger"

export const Header = ({ classStyle, user }) => {
    const navigate = useNavigate();

    const [modalOpenLogin, setModalOpenLogin] = useState(false)
    const [modalOpenCurt, setModalOpenCurt] = useState(false)
    const [hamburger, setHamburger] = useState(false)

    const { isAuth } = useAuth()

    const dispatch = useDispatch()

    return (
        <header className={classStyle ? classStyle : styles.header}>
            {modalOpenLogin && (
                <Portal selector="#modal">
                    <Login open={modalOpenLogin} onToggle={setModalOpenLogin} />
                </Portal>
            )}
            {(modalOpenLogin || modalOpenCurt || hamburger) && (
                <Portal selector="#modal">
                    <Background />
                </Portal>
            )}
            {modalOpenCurt && (
                <Portal selector="#modal">
                    <Curt open={modalOpenCurt} onToggle={setModalOpenCurt} />
                </Portal>
            )}
            {hamburger && (
                <Portal selector="#modal">
                    <Hamburger
                        open={hamburger}
                        onToggle={setHamburger}
                        user={user}
                        onToggleLogin={setModalOpenLogin}
                        onToggleCurt={setModalOpenCurt}
                    />
                </Portal>
            )}
            <div className={styles.logo}>
                <Logo color={classStyle ? null : "--back-color"} />
                <p>Stylia Online</p>
            </div>
            <ul>
                <li onClick={() => navigate("/")}>Главная</li>
                <li onClick={() => navigate("/aboutme")}>О нас</li>
                <li onClick={() => navigate("/product")}>Товары</li>
                <li onClick={() => navigate("/contact")}>Контакты</li>
            </ul>
            <ul style={{ marginLeft: "auto" }}>
                {isAuth
                    ? user ? <li
                        onClick={
                            () => {
                                dispatch(removeUser());
                                Cookies.set("token", "");
                            }
                        }>Выйти</li> : <li onClick={() => navigate("/profile")} data-login>Профиль</li>
                    : <li onClick={() => setModalOpenLogin(true)} data-login>Войти</li>
                }
                <li onClick={() => setModalOpenCurt(true)} data-curt>Корзина</li>
            </ul>
            <HamburgerIcon
                open={hamburger}
                onToggle={setHamburger}
                color={classStyle ? null : "--back-color"} style={styles.hamburgericon} />
        </header>
    )
}

export default Header