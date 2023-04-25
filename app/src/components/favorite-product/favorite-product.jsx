import React from "react"
import styles from './favorite-product.module.css'
import { useNavigate } from "react-router-dom"

export const ProductCardFavorite = ({data}) => {
    const navigate = useNavigate()
    return (
        <div className={styles.card} onClick={() => navigate(`/product/${data.id}`)}>
            <img src={data.image} alt={data.name} />
            <div className={styles.card__text}>
                <p>{data.name}</p>
                <b>{data.prise} ₽</b>
            </div>
        </div>
    )
}

export default ProductCardFavorite