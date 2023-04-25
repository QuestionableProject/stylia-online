import React, { useRef, useEffect, useState } from "react"
import styles from './product-form.module.css'
import ProductFormCard from "./product-form-card"

export const ProductForm = ({ open, onToggle }) => {
    const productForm = useRef()
    const inputFilter = useRef()
    const formState = useRef()
    const [form, setForm] = useState(false)
    const [productState, setProductState] = useState()

    console.log("dfdsf");
    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER}/api/products`)
            .then(response => {
                return response.json()
            }).then((data) => {
                setProductState(data)
            }).catch((e) => {
                console.log(e);
            });
    }, [])

    useEffect(() => {
        const onClick = (e) => {
            if (!productForm.current?.contains(e.target) && !e.target?.getAttribute("data-productfrom")) {
                onToggle(false)
            }
        }

        document.addEventListener('click', onClick)

        return () => {
            document.removeEventListener('click', onClick)
        }
    }, [open, productForm])

    // useEffect(() => {
    //     const onClick = (e) => {
    //         if (!formState.current?.contains(e.target) && !e.target?.getAttribute("data-from")) {
    //             setForm(false)
    //         }
    //     }

    //     document.addEventListener('click', onClick)

    //     return () => {
    //         document.removeEventListener('click', onClick)
    //     }
    // }, [form, formState])

    return (
        <div ref={productForm} className={styles.productform}>
            <p className={styles.headtext}>Редактирование товаров</p>
            <div className={styles.productform__block}>
                <button className={styles.addproduct} data-from onClick={() => setForm(true)}>+</button>
                {productState?.map((e) => 
                    <ProductFormCard key={e.id} data={e}/>
                )}
            </div>
            {/* {form && (
                <form ref={formState}>
                    <p>Создание товара</p>
                    <input type="text" placeholder="Название товара" />
                    <input type="text" placeholder="Описание товара" />
                    <input type="text" placeholder="Категория" />
                    <input type="text" placeholder="Цена" />
                    <label htmlFor="file">Выбрать фото</label>
                    <input className={styles.file} id="file" type="file" placeholder="Выбрать фото" />
                    <button>Создать товар</button>
                </form>
            )} */}
        </div>
    )
}

export default ProductForm