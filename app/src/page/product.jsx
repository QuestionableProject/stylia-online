import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import Footer from "../components/footer/footer";
import Layout from "../layout";
import Header from "../components/header/header";
import Main from "../components/main/main";
import Loader from "../components/loader";
import styles from './product.module.css'
import { useAuth } from "../hooks/use-auth";

export const Product = () => {
    const [productGet, setProductGet] = useState()
    const [loader, setLoader] = useState(true)
    const [errorProduct, setErrorProduct] = useState(false)
    const { productId } = useParams()
    const {isAuth, id} = useAuth()

    const buy = async () => {
        if (!isAuth) return alert("Войдите в аккаунт") 
        
        await fetch(`${process.env.REACT_APP_SERVER}/api/curt`, {
            method: "POST",
            headers: { 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                productId: productGet.id,
                userId: id
            })
        }).then(response => {
            return response.json()
        }).then((data) => {
            if (data.message) {
                alert(data.message)
            }

        }).catch((e) => {
            alert(e)
        });
    }


    useEffect(() => {
        const getProductOne = async()=> { fetch(`${process.env.REACT_APP_SERVER}/api/products/${productId}`)
            .then(response => {
                return response.json()
            }).then((data) => {
                if (data) {
                    setProductGet(data)
                    setLoader(false)
                }
                if (!data) {
                    setErrorProduct(true)
                }

            }).catch((e) => {
                console.log(e);
            });
        }
        getProductOne()
    }, [])

    return (
        <Layout>
            <Header />
            <Main>
                <section className={styles.product}>
                    {errorProduct ?
                        <div className={styles.errorProduct}>Такого товара больше нет или его никогда не было </div>
                        :
                        (
                            loader ?
                                <Loader />
                                :
                                <div className={styles.product__card}>
                                    <div className={styles.img}>
                                        <img src={productGet.image} alt={productGet.name} />
                                    </div>
                                    <div className={styles.information}>
                                        <header>
                                            <p>{productGet.name}</p>
                                            <p>{productGet.prise} ₽</p>
                                        </header>
                                        <main>
                                            {productGet.productsDescription?.productsDescriptionCharacters.map((e, i) =>
                                                <div key={i} className={styles.description}>
                                                    <p>{e.name}</p>
                                                    <p>{e.character}</p>
                                                </div>
                                            )}
                                        </main>
                                        <div className={styles.btn}>
                                            <button onClick={buy}>Добавить в корзину</button>
                                        </div>
                                    </div>
                                </div>
                        )
                    }
                </section>
            </Main>
            <Footer />
        </Layout>
    )
}

export default Product