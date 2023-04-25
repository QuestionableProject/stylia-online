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

export const Profile = () => {
    const { isAuth, nickname, image, id } = useAuth()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [rename, setRename] = useState(false)
    const [nicknameState, setNicknameState] = useState("")
    const inputRef = useRef()

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
                        console.log(data);
                        dispatch(setUser({
                            token: Cookies.get('token'),
                            image: image,
                            nickname: data.nickname,
                            id: id
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

    return (
        <Layout>
            <Header user={true} />
            <Main>
                {isAuth ? (
                    <div className={styles.profile}>
                        <div className={styles.user}>
                            <div className={styles.backgroud}></div>
                            <div className={styles.user__img}>
                                <img src={image} alt="Юзер никнейм" />
                            </div>
                            <div className={styles.profile__text}>
                                <div className={styles.user__information}>
                                    <p style={{cursor: "pointer"}} onClick={() => navigate("/admin")}>adminpanel</p>
                                    {!rename ? (
                                        <p data-input onClick={() => { setRename(true); setNicknameState(nickname); }} className={styles.nickname}>{nickname}</p>
                                    ) : (
                                        <div className={styles.nickname__input}>
                                            <input data-input ref={inputRef} type="text" onChange={e => setNicknameState(e.target.value)} value={nicknameState} />
                                        </div>
                                    )}
                                </div>
                                <ul className={styles.user__menu}>
                                    <li>История заказов</li>
                                    <li>Активные заказы</li>
                                    <li>Избранное</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className={styles.profile}>
                        <div className={styles.login}>
                            <p className="">Войдите в аккаунт, чтобы совершать покупки</p>
                        </div>
                    </div>
                )}

            </Main>
            <Footer />
        </Layout>
    )
}

export default Profile