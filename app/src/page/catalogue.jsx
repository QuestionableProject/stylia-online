import React, { useEffect,  useState } from "react"
import Header from "../components/header/header"
import Layout from "../layout"
import Footer from "../components/footer/footer"
import Main from "../components/main/main"
import { category } from "../components/constant"
import CatalogueCard from "../components/calagoue-card/catalogue-card"
import styles from './catalogue.module.css'
import Loader from "../components/loader"


export const Catalogue = () => {
    const [productArray, setProductArray] = useState()
    const [loader, setLoader] = useState(true)

    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER}/api/products`)
            .then(response => {
                return response.json()
            }).then((data) => {
                setLoader(false)
                setProductArray(data)
            }).catch((e) => {
                console.log(e);
            });
    }, [])


    const openList = (e) => {
        const filter = e.target.dataset['category'];
        console.log(filter);
        // filter.forEach(e => {
        //     if(!e.classList.contains(filter)) {

        //     }
        // })
    }

    return (
        <Layout>
            <Header />

            <Main>
                <div className={styles.catalogue}>
                    <div className={styles.category}>
                        {category.map((e) =>
                            <dl key={e.id}>
                                <dt onClick={openList} data-category={e.name} className={styles.category__name}>{e.name}</dt>
                                {e.material.map(a =>
                                    <dd data-category={e.name} key={a.id} className={styles.category__material}>{a.name}</dd>
                                )}
                            </dl>
                        )}
                    </div>
                    <div className={styles.catalogue__block}>
                        <ul className={styles.catalogue__filter}>
                            <li>По популярности</li>
                            <li>Сначала дешевое</li>
                            <li>Сначала дорогое</li>
                        </ul>
                        {loader ?
                            <Loader />
                            :
                            <div className={styles.catalogue__cardlist}>
                                {
                                    productArray.map((e) =>
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