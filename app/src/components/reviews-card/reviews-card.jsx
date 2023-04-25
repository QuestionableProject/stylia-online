import React from "react"
import styles from './reviews-card.module.css'

export const ReviewsCard = ({data}) => {
    return (
        <div className={styles.reviews__card}>
            <img src="" alt="" />
            <div className="text">
                <b>{data.name}</b>
                <p>{data.text}</p>
            </div>
        </div>
    )
}

export default ReviewsCard