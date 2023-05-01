import { useNavigate } from 'react-router-dom'
import styles from './hamburger.module.css'
import { useAuth } from '../../hooks/use-auth'
import { useDispatch } from 'react-redux'
import Cookies from 'js-cookie'
import { removeUser } from "../../store/slices/userSlice"
import { useRef, useEffect } from 'react'

export default function Hamburger({user, open, onToggle, onToggleCurt, onToggleLogin}) {

    const hamburgerBlock = useRef()
    const { isAuth } = useAuth()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        const onClick = (e) => {
            if (!hamburgerBlock.current?.contains(e.target) && !e.target?.getAttribute("data-hamburger")) {
                return onToggle(false)
            }
        }

        document.addEventListener('click', onClick)

        return () => {
            document.removeEventListener('click', onClick)
        }
    }, [open, hamburgerBlock])

    return (
        <div className={styles.hamburger}>
            <p onClick={() => onToggle(false)} className={styles.close}>X</p>
            <ul>
                <li onClick={() => navigate("/")}>Главная</li>
                <li onClick={() => navigate("/aboutme")}>О нас</li>
                <li onClick={() => navigate("/product")}>Товары</li>
                <li onClick={() => navigate("/contact")}>Контакты</li>
                {isAuth
                    ? 
                    user ? <li
                        onClick={
                            () => {
                                dispatch(removeUser());
                                Cookies.set("token", "");
                            }
                        }>Выйти</li> : <li onClick={() => navigate("/profile")} data-login>Профиль</li>
                        
                    : <li onClick={() => onToggleLogin(true)} data-login>Войти</li>
                }
                <li onClick={() => onToggleCurt(true)} data-curt>Корзина</li>
            </ul>
        </div>
    )
}