import React, { useRef, useState, useEffect } from "react"
import styles from './login.module.css'
import Cookies from "js-cookie"
import { useDispatch } from "react-redux"
import { setUser } from "../../store/slices/userSlice"
import { useNavigate } from "react-router-dom"


export const Login = ({ open, onToggle }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const loginBlock = useRef()
    const outPasswordRef = useRef()
    const outPassword2Ref = useRef()

    const [inLogin, setInLogin] = useState("")
    const [outLogin, setOutLogin] = useState("")
    const [inPassword, setInPassword] = useState("")
    const [outPassword, setOutPassword] = useState("")
    const [outPassword2, setOutPassword2] = useState("")
    const [enable, setEnable] = useState(false)

    useEffect(() => {
        const onClick = (e) => {
            if (!loginBlock.current.contains(e.target) && !e.target.getAttribute("data-login")) {
                onToggle(false)
            }
        }

        document.addEventListener('click', onClick)

        return () => {
            document.removeEventListener('click', onClick)
        }
    }, [open, loginBlock])

    const loginCheck = async (e) => {
        e.preventDefault();

        await fetch(`${process.env.REACT_APP_SERVER}/api/user/login`, {
            method: "POST",
            headers: { 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                login: inLogin,
                password: inPassword
            })
        }).then(response => {
            return response.json()
        }).then((data) => {
            if (data.token) {
                dispatch(setUser({
                    token: data.token,
                    image: data.image,
                    nickname: data.nickname,
                    id: data.id
                }))
                Cookies.set('token', data.token, { expires: 365 })
                
                setInLogin("")
                setInPassword("")
                navigate("/profile")
            }
            if (data.message) {
                alert(data.message)
            }

        }).catch((e) => {
            alert(e)
        });
    }
    const registreationCheck = async(e) => {
        e.preventDefault();

        if (outLogin.length <= 0) {

        }

        if (outPassword !== outPassword2) {
            if (outPasswordRef.current.classList.contains(styles.errorPassword)) return false
            outPasswordRef.current.classList.toggle(styles.errorPassword)
            outPassword2Ref.current.classList.toggle(styles.errorPassword)
            setTimeout(() => {
                outPasswordRef.current.classList.remove(styles.errorPassword)
                outPassword2Ref.current.classList.remove(styles.errorPassword)
            }, 3000)
            return false
        }

        await fetch(`${process.env.REACT_APP_SERVER}/api/user/registration`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                login: outLogin,
                password: outPassword
            })
        }).then(response => {
            return response.json()
        }).then((data) => {
            if (data.register) {
                console.log(data)
                setEnable(false)
                setOutLogin("")
                setOutPassword("")
                setOutPassword2("")
            }
            if (data.message) {
                console.log(data.message)
            }
        }).catch((e) => {
            alert(e)
        });
    }

    return (
        <div ref={loginBlock} className={styles.login__block}>
            {!enable && (
                <form className={styles.login} onSubmit={loginCheck}>
                    <h3 >Войти в аккаунт</h3>
                    <input
                        value={inLogin}
                        onChange={e => setInLogin(e.target.value.replace(/[^a-zA-Z0-9а-яА-Я]/g, ""))}
                        className={styles.login__blockInput}
                        type="text" placeholder="Логин" />
                    <input value={inPassword}
                        onChange={e => setInPassword(e.target.value.replace(/[^a-zA-Z0-9а-яА-Я, &,(,),#,*,%]/g, ""))}
                        className={styles.login__blockInput}
                        type="password" placeholder="Пароль" />
                    <button>Войти</button>
                </form>
            )}
            {enable && (
                <form className={styles.password} onSubmit={registreationCheck}>
                    <h3  >Создать аккаунт</h3>
                    <input
                        value={outLogin}
                        onChange={e => setOutLogin(e.target.value.replace(/[^a-zA-Z0-9а-яА-Я]/g, ""))}
                        className={styles.login__blockInput}
                        type="text" placeholder="Логин" />
                    <input
                        ref={outPasswordRef}
                        value={outPassword}
                        onChange={e => setOutPassword(e.target.value.replace(/[^a-zA-Z0-9а-яА-Я, &,(,),#,*,%]/g, ""))}
                        className={styles.login__blockInput} type="password" placeholder="Пароль" />
                    <input
                        ref={outPassword2Ref}
                        value={outPassword2}
                        onChange={e => setOutPassword2(e.target.value.replace(/[^a-zA-Z0-9а-яА-Я, &,(,),#,*,%]/g, ""))}
                        className={styles.login__blockInput} type="password" placeholder="Повторите пароль" />
                    <button>Зарегистрироваться</button>
                </form>
            )}
            {enable ? <p onClick={() => setEnable(false)}>Уже есть аккаунт?</p> : <p onClick={() => setEnable(true)}>Еще нет аккаунта?</p>}
        </div>
    )
}

export default Login