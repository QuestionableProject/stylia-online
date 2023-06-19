import React, { useRef, useState, useEffect } from "react"

import styles from './user.module.css'
import Layout from "../layout"
import { useDispatch } from "react-redux"
import { useAuth } from "../hooks/use-auth"
import Header from "../components/header/header"
import Footer from "../components/footer/footer"
import Main from "../components/main/main"
import { setUser } from "../store/slices/userSlice"
import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom"
import defaultImage from "../defaultUser.jpg"

export const Profile = () => {
    const { isAuth, nickname, image, id, role } = useAuth()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [rename, setRename] = useState(false)
    const [oferHistory, setOferHistory] = useState(false)
    const [oferState, setOferState] = useState()
    const [userImage, setUserImage] = useState()
    const [nicknameState, setNicknameState] = useState("")

    const [color1, setColor1] = useState("black")
    const [color2, setColor2] = useState("black")

    const inputRef = useRef()
    const photo = useRef()


    useEffect(() => {
        setColor1('#' + Math.floor(Math.random() * 16777215).toString(16))
        setColor2('#' + Math.floor(Math.random() * 16777215).toString(16))
    }, [])

    useEffect(() => {
        if (rename) {
            const onClick = async (e) => {
                if (!e.target.getAttribute("data-input")) {
                    setRename(false)
                    if (inputRef.current.value === nickname) return false
                    if (inputRef.current.value === "") return false

                    await fetch(`${process.env.REACT_APP_SERVER}/api/user/rename`, {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            userId: id,
                            newName: inputRef.current.value
                        })
                    }).then(response => {
                        return response.json()
                    }).then((data) => {
                        dispatch(setUser({
                            token: Cookies.get('token'),
                            image: image,
                            nickname: data.nickname,
                            id: id,
                            role: role
                        }))
                    }).catch((e) => {
                        alert(e)
                    });
                }
            }
            document.addEventListener('click', onClick)

            return () => {
                document.removeEventListener('click', onClick)
            }
        }
    }, [inputRef, rename])

    async function HistoryCheck() {
        if (oferHistory) return setOferHistory(false)

        setOferHistory(true)

        await fetch(`${process.env.REACT_APP_SERVER}/api/ofer/getofer`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: id,
            })
        })
            .then(response => {
                return response.json()
            }).then((data) => {
                setOferState(data)
            }).catch((e) => {
                console.log(e);
            });
    }

    const selectFiles = async e => {
        const newFile = e.target.files[0]; 
        if (newFile) {     
            const formData = new FormData()
            formData.append('userId', id);
            formData.append('userImage', image);
            formData.append('image', newFile);

            await fetch(`${process.env.REACT_APP_SERVER}/api/user/reimage`, {
                method: "POST",
                body: formData
            }).then(response => {
                return response.json()
            }).then((data) => {
                if (data) {
                    dispatch(setUser({
                        token: Cookies.get('token'),
                        image: data.image,
                        nickname,
                        id,
                        role
                    }))
                }
            }).catch((e) => {
                alert(e)
            });
        }
    }

    return (
        <Layout>
            <Header user={true} />
            <Main>
                {isAuth ? (
                    <div className={styles.profile}>
                        <div className={styles.user}>
                            <div className={styles.backgroud} style={{ background: `linear-gradient(172deg, ${color1} 0%, ${color2} 100%)` }}></div>
                            <div className={styles.user__img} style={role === "admin" ? { border: `10px ${color1} solid` } : { border: "10px white solid" }}>
                                <input onChange={selectFiles} type="file" id="imageUSer" />
                                <label htmlFor="imageUSer">
                                    <img src={image?image:defaultImage} alt="Юзер никнейм" />
                                </label>
                            </div>
                            <div className={styles.profile__text}>
                                <div className={styles.user__information}>
                                    {role === "admin" && (
                                        <p style={{ cursor: "pointer" }} onClick={() => navigate("/admin")}>adminpanel</p>
                                    )}
                                    {!rename ? (
                                        <p data-input onClick={() => { setRename(true); setNicknameState(nickname); }} className={styles.nickname}>{nickname}</p>
                                    ) : (
                                        <div className={styles.nickname__input}>
                                            <input data-input ref={inputRef} type="text" onChange={e => setNicknameState(e.target.value)} value={nicknameState} />
                                        </div>
                                    )}
                                </div>
                                <ul className={styles.user__menu}>
                                    <li onClick={HistoryCheck}>История заказов</li>
                                </ul>
                            </div>
                        </div>
                        {oferHistory && (
                            <div className={styles.ofer}>
                                <h2>История заказов</h2>
                                <div className={styles.ofer__block}>
                                    {oferState?.map((e, i) =>
                                        <div key={i} className={styles.ofer__card} style={e.active ? { opacity: ".6" } : null}>
                                            <div className={styles.card__block}>
                                                <div className={styles.ofer__info}>
                                                    <p>Дата оформления: {e.createdAt.slice(0, 16).replace(['T'], " Время: ")}</p>
                                                    <p>Имя: {e.name}</p>
                                                    <p>Адресс доставки: {e.address}</p>
                                                </div>
                                                {!e.active ? (
                                                    <p>Заказ активен</p>
                                                ) : (
                                                    <p>Заказ Выполнен</p>
                                                )}
                                            </div>
                                            <div className={styles.ofer__product}>
                                                {e.oferproducts.map((e, i) =>
                                                    <img key={i} onClick={() => navigate(`/product/${e.product.id}`)} src={e.product?.image} alt={e.product?.name} />
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                                {!oferState && (
                                    <p style={{ textAlign: "center" }}>Заказов нет</p>
                                )}
                            </div>
                        )}
                    </div>

                ) : (
                    <div className={styles.profile}>
                        <div className={styles.login}>
                            <p>Войдите в аккаунт, чтобы совершать покупки</p>
                        </div>
                    </div>
                )}

            </Main>
            <Footer />
        </Layout>
    )
}

export default Profile