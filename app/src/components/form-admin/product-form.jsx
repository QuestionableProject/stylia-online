import React, { useRef, useEffect, useState } from "react"
import styles from './product-form.module.css'
import ProductFormCard from "./product-form-card"

export const ProductForm = ({ open, onToggle }) => {
    const productForm = useRef()
    const formState = useRef()
    const descriptionInput = useRef()
    const nameInput = useRef()
    const photo = useRef()
    const inputRef = useRef()

    const [form, setForm] = useState(false)
    const [category, setCategory] = useState(false)
    const [categoryState, setCategoryState] = useState()
    const [categoryText, setCategoryText] = useState("Категория")

    const [productState, setProductState] = useState()
    const [prise, setPrise] = useState("")
    const [file, setFile] = useState()

    useEffect(() => {
        const productGet = async () => {
            await fetch(`${process.env.REACT_APP_SERVER}/api/products`)
                .then(response => {
                    return response.json()
                }).then((data) => {
                    setProductState(data)
                }).catch((e) => {
                    console.log(e);
                });
        }
        const categotyGet = async () => {
            await fetch(`${process.env.REACT_APP_SERVER}/api/category`)
                .then(response => {
                    return response.json()
                }).then((data) => {
                    setCategoryState(data)
                }).catch((e) => {
                    console.log(e);
                });
        }
        productGet()
        categotyGet()
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

    useEffect(() => {
        const onClick = (e) => {
            if (!formState.current?.contains(e.target) && !e.target?.getAttribute("data-from")) {
                setForm(false)
            }
        }

        document.addEventListener('click', onClick)

        return () => {
            document.removeEventListener('click', onClick)
        }
    }, [form, formState])

    async function createProduct(e) {
        e.preventDefault();

        if (!file) return alert("Вы не выбрали изображение")
        if (categoryText ===  "Категория") return  alert("Вы не выбрали категорию")
        if (nameInput.current.value === "" || descriptionInput.current.value === "" || prise === "") return alert("Введите все данные о товаре")
        const formData = new FormData()
        formData.append('name', nameInput.current.value);
        formData.append('description', descriptionInput.current.value);
        formData.append('category', categoryText);
        formData.append('prise', prise);
        formData.append('image', file);

        await fetch(`${process.env.REACT_APP_SERVER}/api/products`, {
            method: "POST",
            body: formData
        }).then(response => {
            return response.json()
        }).then((data) => {
            setProductState(data)
            setForm(false)
        }).catch((e) => {
            alert(e)
        });


    }

    const selectFiles = e => {
        setFile(e.target.files[0]);
        if (inputRef.current.value) photo.current.classList.toggle(styles.photo__active);
    }
    return (
        <div ref={productForm} className={styles.productform}>
            <p className={styles.headtext}>Редактирование товаров</p>
            <div className={styles.productform__block}>
                <button className={styles.addproduct} data-from onClick={() => setForm(true)}>+</button>
                {productState?.map((e) =>
                    <ProductFormCard key={e.id} data={e} Array={setProductState}/>
                )}
            </div>
            {form && (
                <form ref={formState} onSubmit={createProduct}>
                    <p>Создание товара</p>
                    <input ref={nameInput} type="text" placeholder="Название товара"/>
                    <input ref={descriptionInput} type="text" placeholder="Описание товара"/>
                    <div className={styles.category}>
                        <button type="button" onClick={() => category ? setCategory(false) : setCategory(true)}>{categoryText}</button>
                        {category && (
                            <ul className={styles.category__list}>
                                {categoryState?.map(e =>
                                    <li key={e.id} onClick={() => setCategoryText(e.name)}>{e.name}</li>
                                )}
                            </ul>
                        )}
                    </div>
                    <input  type="text" placeholder="Цена" value={prise} onChange={e => setPrise(e.target.value.replace(/\D/g, ""))} />

                    <input ref={inputRef} onChange={selectFiles} className={styles.file} id="file" type="file"  placeholder="Выбрать фото" />
                    <label className={styles.photo} ref={photo} htmlFor="file">Выбрать фото</label>

                    <button>Создать товар</button>
                </form>
            )}
        </div>
    )
}

export default ProductForm