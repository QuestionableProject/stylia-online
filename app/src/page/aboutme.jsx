import React from "react"
import Layout from "../layout"
import Header from "../components/header/header"
import Footer from "../components/footer/footer"
import styles from './aboutme.module.css'
import { reviews } from "../components/constant"
import ReviewsCard from "../components/reviews-card/reviews-card"
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
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium est provident, id, iste enim ad illo iure, suscipit a fuga rem cupiditate amet qui! Provident ipsa vero a nostrum libero. Lorem ipsum dolor sit amet consectetur adipisicing elit. In, deleniti cumque ea dolores quia laborum soluta perspiciatis debitis aspernatur, natus iste assumenda obcaecati minus recusandae. Modi sapiente laudantium autem ex.</p>
                        </div>
                        <img src="https://davitamebel.ru/upload/resize_cache/product/841_631_1/b098839d-ed41-11ec-83b1-00155db6cc01_im-00001651_alyaska%205/photo_00_im-00001651_alyaska%205nabor%20mebeli%20dlya%20detskoy.jpg?1668661055" alt="" />
                    </section>
                    <section className={styles.purpose}>
                        <img src={aboutme} alt="" />
                        <div className={styles.text}>
                            <h3>Наша цель:</h3>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium est provident, id, iste enim ad illo iure, suscipit a fuga rem cupiditate amet qui! Provident ipsa vero a nostrum libero. Lorem ipsum dolor sit amet consectetur adipisicing elit. In, deleniti cumque ea dolores quia laborum soluta perspiciatis debitis aspernatur, natus iste assumenda obcaecati minus recusandae. Modi sapiente laudantium autem ex.</p>
                        </div>
                    </section>
                    <div className={styles.reviews}>
                        <h3>Нас ценят и это легко понять</h3>
                        <div className={styles.reviews__block}>
                            {reviews.map(e =>
                                <ReviewsCard key={e.id} data={e} />
                            )}
                        </div>
                    </div>
                </div>
            </Main>
            <Footer />
        </Layout>
    )
}

export default Aboutme