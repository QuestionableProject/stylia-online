import React from "react"
import styles from './error.module.css'
import { useNavigate } from "react-router-dom";

export const Error = () => { 
    const navigate = useNavigate();

    return (
        <div className={styles.error}>
            <h1>Странно, такой странице нет</h1>
            <p onClick={() => {navigate("/");}}>Вернуться назад</p>
        </div>
    )
}

export default Error