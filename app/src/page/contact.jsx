import React, { useEffect, useState } from "react"
import Layout from "../layout"
import Header from "../components/header/header"
import Footer from "../components/footer/footer"
import Main from "../components/main/main"
import { YMaps, Map, Placemark, ZoomControl } from "react-yandex-maps";
import styles from './contact.module.css'


export const Contact = () => {
    const [addressState, setAddressState] = useState()
    useEffect(() => {
            const addressGet = async () => {
                await fetch(`${process.env.REACT_APP_SERVER}/api/address/`)
                    .then(response => {
                        return response.json()
                    }).then((data) => {
                        if (data) {
                            setAddressState(data)
                        }
                    }).catch((e) => {
                        console.log(e);
                    });
            }
            addressGet()
    }, [])

    const enable = (e) => {
        document.querySelectorAll(`[data-address]`).forEach(e => {
            e.style.opacity = ".5"
        })

        document.querySelector(`[data-address=${e}]`).style.opacity = "1"
    }

    return (
        <Layout>
            <Header />
            <Main>
                <h3>Нас легко найти</h3>
                <div className={styles.conteiner__map}>
                    <div className={styles.address}>
                        {addressState?.map((e, i) => 
                            <div key={i} data-address={`address${i}`} className={styles.address__card}>
                                <p>Время работы: {e.time}</p>
                                <p>Адрес: {e.address}</p>
                                <a href={`tel:${e.phone}`}>Телефон: {e.phone}</a>
                            </div>    
                        )}
                    </div>
                    <YMaps>
                        <Map defaultState={{ center: [55.75, 37.57], zoom: 9 }} className={styles.map__block}>
                            <ZoomControl />
                            {addressState?.map((e ,i)=> 
                                <Placemark key={i} onClick={() => enable(`address${i}`)} geometry={e.map}/>
                            )}
                        </Map>
                    </YMaps>
                </div>
            </Main>
            <Footer />
        </Layout>
    )
}

export default Contact