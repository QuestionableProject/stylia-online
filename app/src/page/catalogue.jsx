import React, { useEffect, useState } from "react"
import Header from "../components/header/header"
import Layout from "../layout"
import Footer from "../components/footer/footer"
import Main from "../components/main/main"
import CatalogueCard from "../components/calagoue-card/catalogue-card"
import styles from './catalogue.module.css'
import Loader from "../components/loader"
import { useProduct } from "../hooks/use-product"
import { useDispatch } from "react-redux"
import { setProduct } from "../store/slices/productSlice"


export const Catalogue = () => {
    const dispatch = useDispatch()
    const { product } = useProduct()
    const [productState, setProductState] = useState()
    const [categoryState, setCategoryState] = useState()

    const [loader, setLoader] = useState(true)

    useEffect(() => {
        const productGet = async () => {
            fetch(`${process.env.REACT_APP_SERVER}/api/products`)
                .then(response => {
                    return response.json()
                }).then((data) => {
                    setLoader(false)
                    dispatch(setProduct({
                        product: data
                    }))
                    setProductState(data)
                }).catch((e) => {
                    console.log(e);
                });
        }
        const categoryGet = async () => {
            fetch(`${process.env.REACT_APP_SERVER}/api/category`)
                .then(response => {
                    return response.json()
                }).then((data) => {
                    setCategoryState(data)
                }).catch((e) => {
                    console.log(e);
                });
        }
        productGet()
        categoryGet()
    }, [])


    const buyCount = () => {
        const productFilter = [...product]
        productFilter.sort(function (a, b) {
            return b.buyCount - a.buyCount;
        });
        setProductState(productFilter)

    }
    const highprise = () => {
        const productFilter = [...product]
        productFilter.sort(function (a, b) {
            return b.prise - a.prise;
        });
        setProductState(productFilter)
    }
    const lowprise = () => {
        const productFilter = [...product]
        productFilter.sort(function (a, b) {
            return a.prise - b.prise;
        });
        setProductState(productFilter)
    }

    const categoryFilter = (e) => {
        if (e === "Все товары") return setProductState(product)
        const productFilter = [...product]

        const filterArray = productFilter.filter(item => item.category === e);
        setProductState(filterArray)
    }
    return (
        <Layout>
            <Header />

            <Main>
                <div className={styles.catalogue}>
                    <ul className={styles.category}>
                        <li onClick={() => categoryFilter("Все товары")} className={styles.category__name}>Все товары</li>
                        {categoryState?.map((e) =>
                            <li  key={e.id} onClick={() => categoryFilter(e.name)} className={styles.category__name}>{e.name}</li>
                        )}
                    </ul>
                    <div className={styles.catalogue__block}>
                        <ul className={styles.catalogue__filter}>
                            <li onClick={() => buyCount()}>По популярности</li>
                            <li onClick={() => lowprise()}>Сначала дешевое</li>
                            <li onClick={() => highprise()}>Сначала дорогое</li>
                        </ul>
                        {loader ?
                            <Loader />
                            :
                            <div className={styles.catalogue__cardlist}>
                                {
                                    productState?.map((e) =>
                                        <CatalogueCard key={e.id} data={e} />
                                    )
                                }
                            </div>
                        }
                    </div>
                </div>
            </Main>

            <Footer />
        </Layout>
    )
}

export default Catalogue