import React from "react"
import styles from './footer.module.css'
import { useNavigate } from "react-router-dom"
import VkontakteSVG from "../svg/vkontakte"
import YoutubeSVG from "../svg/youtube"
import TelegramSVG from "../svg/telegram"
import InstagramSVG from "../svg/instagram"

export const Footer = () => {
    const navigate = useNavigate()
    return (
        <footer className={styles.footer}>
            <h1>Stylia Online</h1>
            <div className={styles.footer__block}>
                <ul>
                    <li>Главная</li>
                    <li onClick={() => navigate("/aboutme")}>О нас</li>
                    <li onClick={() => navigate("/product")}>Товары</li>
                    <li onClick={() => navigate("/contact")}>Контакты</li>
                </ul>
                <div className={styles.subscribe}>
                    <input type="email" placeholder="E-mail" />
                    <button>Подписаться на новости</button>
                </div>
                <div className={styles.social}>
                    <p>Мы в соц. сетях</p>
                    <VkontakteSVG />
                    <YoutubeSVG />
                    <TelegramSVG />
                    <InstagramSVG />
                </div>
            </div>
            <p style={{ textAlign: "center" }}>2020-2023©️Все права защищены.</p>
        </footer>
    )
}

export default Footer