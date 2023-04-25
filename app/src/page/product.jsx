import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import Footer from "../components/footer/footer";
import Layout from "../layout";
import Header from "../components/header/header";
import Main from "../components/main/main";
import Loader from "../components/loader";
import styles from './product.module.css'
import Hurt from "../components/svg/hurt";
import { useAuth } from "../hooks/use-auth";

export const Product = () => {
    const [productGet, setProductGet] = useState()
    const [loader, setLoader] = useState(true)
    const [errorProduct, setErrorProduct] = useState(false)
    const { productId } = useParams()
    const {isAuth} = useAuth()

    const favorite = async () => {
        if (!isAuth) return alert("Войдите в аккаунт") 
        alert("Добавил");
    }
    const buy = async () => {
        if (!isAuth) return alert("Войдите в аккаунт") 
        alert("Купил");
    }


    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER}/api/products/${productId}`)
            .then(response => {
                return response.json()
            }).then((data) => {
                if (data) {
                    console.log(data);
                    setProductGet(data)
                    setLoader(false)
                }
                if (!data) {
                    setErrorProduct(true)
                }

            }).catch((e) => {
                console.log(e);
            });
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
                                            <p>{productGet.description}</p>
                                        </main>
                                        <div className={styles.btn}>
                                            <button onClick={buy}>Добавить в корзину</button>
                                            <button onClick={favorite}>
                                                <Hurt/>
                                            </button>
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