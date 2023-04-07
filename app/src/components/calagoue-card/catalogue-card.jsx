import React from "react"
import styles from "./catalogue-card.module.css"

export const CatalogueCard = ({ data }) => {
    return (
        <div className={styles.card}>
            <div className={styles.img}>
                <img src={data.photo} alt={data.name} />
            </div>
            <div className={styles.text}>
                <p>{data.name}</p>
                <p>{data.prise} ₽</p>
            </div>
            <div className={styles.btn}>
                <button>Быстрая покупка</button>
                <button>В корзину</button>
            </div>
        </div>
    )
}

export default CatalogueCard