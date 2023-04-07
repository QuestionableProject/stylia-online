import Layout from "../layout";
import Main from "../components/main/main";
import Footer from "../components/footer/footer";
import styles from './page.module.css'
import { ScrollTrigger, Tween } from "react-gsap"
import {product} from "../components/constant"
import { useRef } from "react";
import ProductCardFavorite from "../components/favorite-product";
import { useNavigate } from "react-router-dom"

import bgNew from "../bg-new.png"
import chairNew from "../chair-new.png"
import chairNew2 from "../chair-new2.png";
import bgPreview from "../bg-preview.jpg"
import Logo from "../components/svg/logo";

function Page() {
  const navigate = useNavigate()
  const newproductTrigger = useRef(null);
  return (
    <Layout>
      <header className={styles.preview} style={{ background: `url('${bgPreview}') bottom no-repeat`, backgroundSize: "cover" }}>
            <div className={styles.blur}>
                <div className={styles.header}>
                    <div className={styles.logo}>
                        <Logo />
                        <p>Stylia Online</p>
                    </div>
                    <ul>
                        <li className={styles.active}>Главная</li>
                        <li onClick={() => navigate("/aboutme")}>О нас</li>
                        <li onClick={() => navigate("/product")}>Товары</li>
                        <li onClick={() => navigate("/contact")}>Контакты</li>
                    </ul>
                    <ul style={{ marginLeft: "auto" }}>
                        <li>Войти</li>
                        <li>Корзина</li>
                    </ul>
                </div>
                <div className={styles.main}>
                    <button onClick={() => navigate("/product")}>Посмотреть весь каталог</button>
                    <div className={styles.preview__text}>
                        <p>Комфорт - превыше всего</p>
                        <p>Мы создаем то, что не подсилам другим</p>
                    </div>
                </div>
            </div>
        </header>
      <Main>
        {/* Блок о нас */}
        <section className={styles.aboutme}>
          <ScrollTrigger start="-300px center" end="100px center" scrub={0.5}>
            <div className={styles.aboutme__text}>
              <Tween
                from={{
                  x: '-600',
                  opacity: 0
                }}
                to={{
                  x: '0',
                  opacity: 1
                }}>
                <div className={styles.aboutme__heading}>
                  <p>Стремимся к будущему вместе</p>
                  <p>Простота и надежность</p>
                </div>
              </Tween>
              <Tween
                from={{
                  x: '600',
                  opacity: 0
                }}
                to={{
                  x: '0',
                  opacity: 1
                }}>
                <div className={styles.aboutme__description}>
                  <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quae id voluptatem, suscipit, sint eaque voluptatibus rem non quis consequuntur repellendus error perspiciatis, nihil excepturi eligendi alias magni reprehenderit veritatis facilis! Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt repudiandae, cum non vitae fugit sapiente ea sed corrupti repellat blanditiis accusantium nam, enim eaque quidem. Magnam minus fugit laboriosam itaque? Lorem ipsum dolor sit amet consectetur adipisicing elit. Non doloribus voluptatibus ratione quae tenetur nemo, inventore ipsam tempora nam, a quasi harum iste ducimus ullam velit iusto sunt. Facilis, id!</p>
                  <p>Узнай больше о нас...</p>
                </div>
              </Tween>
            </div>
          </ScrollTrigger>
        </section>

        {/* Блок с новыми товарами */}
        <section ref={newproductTrigger} className={styles.newproduct} style={{ backgroundImage: `url('${bgNew}')`, backgroundSize: "cover", backgroundPosition: "center" }}>
          <ScrollTrigger start="-200px center" end="600px center" scrub={0.5}>
            <Tween
              from={{
                x: '-1000',
                rotation: 0
              }}
              to={{
                x: '0',
                rotation: -45
              }}
            >
              <div className={styles.newproduct__img} style={{ top: 50, left: 1000, borderRadius: "50% 30px 50% 30px" }}>
                <img width={300} src={chairNew} alt="img" />
              </div>
            </Tween>
            <Tween
              from={{
                x: '1000',
                rotation: 0
              }}
              to={{
                x: '0',
                rotation: 145
              }}
            >
              <div className={styles.newproduct__img} style={{ top: 50, right: 1000, borderRadius: "30px 50% 30px 50%" }}>
                <img width={300} src={chairNew2} alt="img" />
              </div>
            </Tween>
          </ScrollTrigger>
        </section>

        {/* Блок популярных продуктов */}
        <section className={styles.product}>
          <h3>Мы рекомендуем</h3>
          <div className={styles.product__block}>
            <div className={styles.card__list}>
              {product.map((e) =>
                <ProductCardFavorite key={e.id} data={e}/>
              )}
            </div>
            <div className={styles.learnmore}>
              <p onClick={() => navigate("/product")}>Посмотреть больше...</p>
            </div>
          </div>

          <section className={styles.news}>
              
          </section>
        </section>


      </Main>
      <Footer />
    </Layout>
  );
}

export default Page;
