import React from "react"
import Header from "../components/header/header"
import Layout from "../layout"
import Footer from "../components/footer/footer"
import Main from "../components/main/main"
import { product } from "../components/constant"
import CatalogueCard from "../components/calagoue-card/catalogue-card"
import styles from './catalogue.module.css'


export const Catalogue = () => {
    return (
        <Layout>
            <Header />
            <Main>
                <div className={styles.catalogue}>
                    <ul className={styles.category}>
                        <li>Стулья</li>
                        <li>Табуретки</li>
                        <li>Диваны</li>
                        <li>Кресла</li>
                        <li>Кровати</li>
                        <li>Игровые кресла</li>
                        <li>Игровые столы</li>
                    </ul>
                    <div className={styles.catalogue__block}>
                        {product.map((e) => 
                            <CatalogueCard data={e}/>
                        )}
                    </div>
                </div>
            </Main>
            <Footer/>
        </Layout>
    )
}

export default Catalogue