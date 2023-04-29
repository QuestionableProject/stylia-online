import React, { useRef, useEffect, useState } from "react"
import styles from './curt.module.css'
import CurtCard from "./curt-card"
import Loader from "../loader"
import { useAuth } from "../../hooks/use-auth"
import { useDispatch } from "react-redux"
import { setCurt } from "../../store/slices/curtSlice"
import { useCurt } from "../../hooks/use-curt"
import InputMask from 'react-input-mask';

export const Curt = ({ open, onToggle }) => {
    const curtBlock = useRef()
    const curtDiv = useRef()

    const nameInput = useRef()
    const addressInput = useRef()
    const phoneInput = useRef()
    const emailInput = useRef()

    const { isAuth, id } = useAuth()
    const { curt } = useCurt()
    const dispatch = useDispatch()

    const [loader, setLoader] = useState(true)
    const [ofer, setOfer] = useState(false)

    useEffect(() => {
        if (isAuth) {
            const productCart = async () => {
                return await fetch(`${process.env.REACT_APP_SERVER}/api/curt/getcurt`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        userId: id
                    })
                })
                    .then(response => {
                        return response.json()
                    }).then((data) => {
                        setLoader(false)
                        if (data) {
                            dispatch(setCurt({
                                curt: data.curtProducts
                            }))
                        }
                    }).catch((e) => {
                        console.log(e);
                    });
            }

            productCart()
        }
    }, [])

    useEffect(() => {
        const onClick = (e) => {
            if (!curtBlock.current?.contains(e.target) && !e.target?.getAttribute("data-curt")) {
                return onToggle(false)
            }
        }

        document.addEventListener('click', onClick)

        return () => {
            document.removeEventListener('click', onClick)
        }
    }, [open, curtBlock])

    async function oferCheck(e) {
        e.preventDefault()
        console.log(curt);
        await fetch(`${process.env.REACT_APP_SERVER}/api/ofer`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        userId: id,
                        product: curt,
                        name: nameInput.current.value,
                        address: addressInput.current.value,
                        email: emailInput.current.value,
                        phone: phoneInput.current.value
                    })
                })
                    .then(response => {
                        return response.json()
                    }).then((data) => {
                        if (data.message) {
                            alert(data.message);
                        }
                    }).catch((e) => {
                        console.log(e);
                    });
    }

    return (
        <div ref={curtBlock} className={styles.curt}>
            {isAuth ? (
                !ofer ? (
                    <div ref={curtDiv} className={styles.curt__block}>
                        <div className={styles.curt__section}>
                            <h3>Ваша корзина</h3>
                            {!loader && (
                                curt ? (
                                    curt?.map((e, i) =>
                                        <CurtCard key={i} data={e.product} userId={id} />
                                    )
                                ) : <p style={{ margin: "50px 0", textAlign: "center" }}>Корзина пуста</p>
                            )
                            }
                        </div>
                        {loader && <Loader />}
                        <button  data-curt onClick={() => setOfer(true)}>Перейти к оформлению</button>
                    </div>
                ) : (
                    <div className={styles.ofer__block}>
                        <h3>Оформаление заказа</h3>
                        <p data-curt onClick={() => setOfer(false)}>⬅️Вернуться к корзине</p>
                        <form onSubmit={oferCheck}>
                            <input ref={nameInput} type="text" placeholder="Имя" required/>
                            <input ref={addressInput} type="text" placeholder="Адрес" required/>
                            <InputMask ref={phoneInput} mask="+7\ 999  999  99  99" placeholder="Телефон" required/>
                            <input ref={emailInput} type="email" placeholder="Почта" required/>
                            <p>Оплата</p>
                            <div className={styles.checkbox}>
                                <input id="receiving" name="checkbox" type="radio" />
                                <label htmlFor="receiving">При получении</label>

                                <input id="pickup" name="checkbox" type="radio" />
                                <label htmlFor="pickup">Самовывоз</label>

                                <input id="online" name="checkbox" type="radio" />
                                <label htmlFor="online">Онлайн</label>
                            </div>
                            <button data-curt >Оформить заказ</button>
                        </form>
                    </div>
                )
            ) : (
                <div>Войдите, чтобы пользоваться карзиной</div>
            )}
        </div>
    )
}

export default Curt