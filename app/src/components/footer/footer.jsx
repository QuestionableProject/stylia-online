import React, { useRef } from "react"
import styles from './footer.module.css'
import { useNavigate } from "react-router-dom"
import VkontakteSVG from "../svg/vkontakte"
import YoutubeSVG from "../svg/youtube"
import TelegramSVG from "../svg/telegram"
import InstagramSVG from "../svg/instagram"


export const Footer = () => {
    const email = useRef()
    const navigate = useNavigate()

    async function Subscribe(e) {
        e.preventDefault()

        if (email.current.value === "") return false

        await fetch(`${process.env.REACT_APP_SERVER}/api/subscribe/`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email.current.value,
            })
        }).then(response => {
            return response.json()
        }).then((data) => {
                if (data.message) {
                    alert(data.message)
                    email.current.value = ""
                }
        }).catch((e) => {
            alert(e)
        });
    }

    return (
        <footer className={styles.footer}>
            <h1>Stylia Online</h1>
            <div className={styles.footer__block}>
                <ul>
                    <li onClick={() => navigate("/")}>Главная</li>
                    <li onClick={() => navigate("/aboutme")}>О нас</li>
                    <li onClick={() => navigate("/product")}>Товары</li>
                    <li onClick={() => navigate("/contact")}>Контакты</li>
                </ul>
                <form className={styles.subscribe} onSubmit={Subscribe}>
                    <input ref={email} type="email" placeholder="E-mail" />
                    <button>Подписаться на новости</button>
                </form>
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