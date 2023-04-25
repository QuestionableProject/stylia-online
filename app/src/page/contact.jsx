import React from "react"
import Layout from "../layout"
import Header from "../components/header/header"
import Footer from "../components/footer/footer"
import Main from "../components/main/main"
import { YMaps, Map, Placemark, ZoomControl } from "react-yandex-maps";
import styles from './contact.module.css'
import { addressData } from "../components/constant"


export const Contact = () => {
    return (
        <Layout>
            <Header />
            <Main>
                <h3>Нас легко найти</h3>
                <div className={styles.conteiner__map}>
                    <div className={styles.address}>
                        {addressData.map(e => 
                            <div className={styles.address__card}>
                                <p>Время работы: {e.time}</p>
                                <p>Адрес: {e.address}</p>
                                <a href={`tel:${e.phone}`}>Телефон: {e.phone}</a>
                            </div>    
                        )}
                    </div>
                    <YMaps>
                        <Map defaultState={{ center: [55.75, 37.57], zoom: 9 }} width={"100%"} height={"100%"}>
                            <ZoomControl />
                            <Placemark geometry={[55.783553, 37.560106]}/>
                            <Placemark geometry={[55.680707, 37.715830]} />
                            <Placemark geometry={[55.679401, 37.468327]} />
                        </Map>
                    </YMaps>
                </div>
            </Main>
            <Footer />
        </Layout>
    )
}

export default Contact