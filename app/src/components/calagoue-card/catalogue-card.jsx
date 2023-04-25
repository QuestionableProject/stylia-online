import React from "react"
import styles from "./catalogue-card.module.css"
import { useNavigate } from "react-router-dom"

export const CatalogueCard = ({ data }) => {
    const navigate = useNavigate()
    return (
        <div onClick={() => navigate(`/product/${data.id}`)} className={styles.card}>
            <div className={styles.img}>
                <img src={data.image} alt={data.name} />
            </div>
            <div className={styles.text}>
                <p>{data.name}</p>
                <p>{data.prise} ₽</p>
            </div>
            <button>Купить</button> 
        </div>
    )
}

export default CatalogueCard