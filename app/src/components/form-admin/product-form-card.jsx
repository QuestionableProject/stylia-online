import React from "react"
import styles from './product-form.module.css'

export const ProductFormCard = ({ data, Array }) => {

    async function removeProduct() {
        await fetch(`${process.env.REACT_APP_SERVER}/api/products/removeProd`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                productId: data.id,
            })
        })
            .then(response => {
                return response.json()
            }).then((data) => {
                Array(data)
            }).catch((e) => {
                console.log(e);
            });
    }
    return (
        <div className={styles.productcard}>
            <div className={styles.product}>
                <label htmlFor="imageproduct">
                    <img src={data.image} alt={data.name} />
                </label>
                <input type="file" id="imageproduct" style={{ display: "none" }} />
                <div className={styles.productcard__text}>
                    <p>{data.name}</p>
                    <p>{data.prise}</p>
                    <p>{data.description}</p>
                    <p>{data.category}</p>
                </div>
            </div>
            <div className={styles.tools}>
                <button onClick={() => removeProduct()}>Удалить</button>
            </div>
        </div>
    )
}

export default ProductFormCard