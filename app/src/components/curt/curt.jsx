import React, { useRef, useEffect, useState } from "react"
import styles from './curt.module.css'
import { curt } from "../constant"
import CurtCard from "./curt-card"
import Loader from "../loader"
import { useAuth } from "../../hooks/use-auth"

export const Curt = ({ open, onToggle }) => {
    const curtBlock = useRef()
    const { isAuth } = useAuth()

    const [loader, setLoader] = useState(true)

    useEffect(() => {
        const onClick = (e) => {
            if (!curtBlock.current?.contains(e.target) && !e.target?.getAttribute("data-curt")) {
                onToggle(false)
            }
        }

        document.addEventListener('click', onClick)

        return () => {
            document.removeEventListener('click', onClick)
        }
    }, [open, curtBlock])

    return (
        <div ref={curtBlock} className={styles.curt}>
            {isAuth?(
                <div className={styles.curt__block}>
                <h3>Ваша корзина</h3>
                <div className="curt__section">
                    {loader ?
                        <Loader />
                        :
                        curt.map(e =>
                            <CurtCard key={e.userId} data={e.product} />
                        )}
                </div>
                <button>Перейти к оформлению</button>
            </div>
            ):(
                <div>Войдите, чтобы пользоваться карзиной</div>
            )}
        </div>
    )
}

export default Curt