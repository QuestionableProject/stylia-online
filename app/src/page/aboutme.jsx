import React from "react"
import Layout from "../layout"
import Header from "../components/header/header"
import Footer from "../components/footer/footer"
import styles from './aboutme.module.css'
import Main from "../components/main/main"
import aboutme from "../aboutme.jpg"

export const Aboutme = () => {
    return (
        <Layout>
            <Header />
            <Main>
                <div className={styles.aboutme}>
                    <section className={styles.history}>
                        <div className={styles.text}>
                            <h3>Наша история:</h3>
                            <p> Мы также придаем большое значение стремительности нашей работы. Наш сайт обеспечивает быстрый и удобный доступ к нашим товарам, а наша команда профессионалов готова оперативно реагировать на запросы и вопросы клиентов. Мы стремимся к тому, чтобы каждый клиент получил свой заказ в кратчайшие сроки и в полной сохранности.</p>
                        </div>
                        <img src="https://doka-master.ru/wp-content/uploads/2018/09/image7-36.jpeg" alt="" />
                    </section>
                    <section className={styles.purpose}>
                        <img src={aboutme} alt="" />
                        <div className={styles.text}>
                            <h3>Наша цель:</h3>
                            <p>Наша компания является надежным партнером для всех, кто ценит качество и стремится получить лучшие условия при покупке товаров в интернет-магазинах. Мы гарантируем, что каждый клиент получит качественный товар по выгодной цене, а наша надежность и профессионализм обеспечат полную удовлетворенность от сотрудничества с нами.<br/>Компания "Stylia Online" - это надежный и качественный выбор для всех, кто стремится получить лучшее качество товаров и услуг в мире интернет-магазинов. Мы готовы предоставить нашим клиентам все необходимое для удовлетворения их потребностей, обеспечивая быструю и надежную доставку, высокое качество и профессионализм наших услуг.</p>
                        </div>
                    </section>
                </div>
            </Main>
            <Footer />
        </Layout>
    )
}

export default Aboutme