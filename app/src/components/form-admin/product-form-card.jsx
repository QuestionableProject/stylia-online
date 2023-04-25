import React from "react"
import styles from './product-form.module.css'

export const ProductFormCard = ({ data }) => {
    return (
        <div className={styles.productcard}>
            <div className={styles.product}>
                <label htmlFor="imageproduct">
                    <img src={data.image} alt={data.name} />
                </label>
                <input type="file" id="imageproduct" style={{ display: "none" }} />
                <div className={styles.productcard__text}>
                    <input type="text" placeholder={data.name} />
                    <input type="text" placeholder={data.prise} />
                    <input type="text" placeholder={data.description} />
                    <input type="text" placeholder={data.category} />
                </div>
            </div>
            <div className={styles.tools}>
                <button>Удалить</button>
                <button>Изменить</button>
            </div>
        </div>
    )
}

export default ProductFormCard