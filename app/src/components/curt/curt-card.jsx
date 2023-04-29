import React from "react"
import styles from './curt-card.module.css'
import Trash from "../svg/trash"
import { useNavigate } from "react-router-dom"


export const CurtCard = ({ data,userId }) => {
    const navigate = useNavigate()
    return (
        <div className={styles.curt__card}>
            <div onClick={() => navigate(`/product/${data.id}`)} className={styles.curt__info}>
                <img src={data.image} alt={data.name} />
                <div className={styles.text}>
                    <p>{data.name}</p>
                    <p>{data.prise} ₽</p>
                </div>
            </div>
            <Trash data={data.id} userId={userId} />
        </div>
    )
}

export default CurtCard