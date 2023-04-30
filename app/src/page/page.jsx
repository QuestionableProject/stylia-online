import Layout from "../layout";
import Main from "../components/main/main";
import Footer from "../components/footer/footer";
import styles from './page.module.css'
import { ScrollTrigger, Tween } from "react-gsap"
import { useEffect, useState } from "react";
import ProductCardFavorite from "../components/favorite-product/favorite-product";
import { useNavigate } from "react-router-dom"
import bgNew from "../bg-new.png"
import bgPreview from "../bg-preview.jpg"
import Header from "../components/header/header";
import Loader from "../components/loader";

export const Page = () => {

  const [favoriteProduct, setfavoriteProduct] = useState()
  const [newProduct, setNewProduct] = useState()
  const [loader, setLoader] = useState(true)

  useEffect(() => {
    const productGet = async () => {
      await fetch(`${process.env.REACT_APP_SERVER}/api/products`)
        .then(response => {
          return response.json()
        }).then((data) => {
          if (data) {
            setLoader(false)
            const productFilter = [...data]
            productFilter.sort(function (a, b) {
              return b.buyCount - a.buyCount;
            });
            setNewProduct(data.splice(0, 2))
            setfavoriteProduct(productFilter.splice(0, 4))
          }
        }).catch((e) => {
          console.log(e);
        });
    }
    productGet()
  }, [])

  const navigate = useNavigate()

  return (
    <Layout>

      <div className={styles.preview} style={{ background: `url('${bgPreview}') bottom `, backgroundSize: "cover" }}>
        <div className={styles.blur}>
          <Header classStyle={styles.header} />
          <div className={styles.main}>
            <p className={styles.link__catalog} onClick={() => navigate("/product")}>Посмотреть весь каталог</p>
            <div className={styles.preview__text}>
              <p>Комфорт - превыше всего</p>
              <p>Мы создаем то, что не подсилам другим</p>
            </div>
          </div>
        </div>
      </div>

      <Main>
        {/* Блок о нас */}
        <section className={styles.aboutme}>
          <div className={styles.aboutme__text}>
            <ScrollTrigger start="-300px center" end="100px center" scrub={2}>
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
                }}
              >
                <div className={styles.aboutme__description}>
                  <p>Компания "Stylia Online" - это надежный партнер в мире интернет-магазинов, который предлагает своим клиентам только самые качественные товары и услуги. Мы стремимся удовлетворить потребности наших клиентов в максимально короткие сроки, обеспечивая быструю и безопасную доставку товаров по всей стране. <br />
                    Наша компания заботится о качестве предоставляемых услуг, поэтому мы работаем только с проверенными поставщиками и производителями. Мы гарантируем, что каждый товар, который вы приобретаете в нашем интернет-магазине, соответствует высоким стандартам качества.
                  </p>
                  <p onClick={() => navigate("/aboutme")}>Узнай больше о нас...</p>
                </div>
              </Tween>
            </ScrollTrigger>
          </div>
        </section>

        {/* Блок с новыми товарами */}
        <section className={styles.newproduct} style={{ backgroundImage: `url('${bgNew}')`, backgroundSize: "cover", backgroundPosition: "center" }}>
          <ScrollTrigger start="-200px center" end="450px center" scrub={2}>
            {newProduct?.map((e, i) =>
              i !== 1 ? (
                <Tween
                  from={{
                    x: '-1200',
                    rotation: 0
                  }}
                  to={{
                    x: '0',
                    rotation: 360
                  }}
                >
                  <div onClick={() => navigate(`/product/${e.id}`)} className={styles.newproduct__img} style={{ top: 50, left: 1200, borderRadius: "50% 30px 50% 30px" }}>
                    <img style={{ borderRadius: "50% 30px 50% 30px" }} width={300} src={e.image} alt={e.name} />
                  </div>
                </Tween>
              ) : (
                <Tween
                  from={{
                    x: '1200',
                    rotation: 0
                  }}
                  to={{
                    x: '0',
                    rotation: 360
                  }}
                >
                  <div onClick={() => navigate(`/product/${e.id}`)} className={styles.newproduct__img} style={{ top: 50, right: 1200, borderRadius: "30px 50% 30px 50%" }}>
                    <img style={{ borderRadius: "30px 50% 30px 50%" }} width={300} src={e.image} alt={e.name} />
                  </div>
                </Tween>
              )
            )}
          </ScrollTrigger>
        </section>

        {/* Блок популярных продуктов */}
        <section className={styles.product}>
          <h3>Мы рекомендуем</h3>
          <div className={styles.product__block}>
            <div className={styles.card__list}>
              {loader ?
                <Loader />
                :
                favoriteProduct.map((e) =>
                  <ProductCardFavorite key={e.id} data={e} />
                )
              }
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
    </Layout >
  );
}

export default Page;
