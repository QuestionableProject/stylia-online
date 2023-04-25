import React from "react"
// import styles from './curt-card.module.css'


export const CurtCard = ({data}) => {
    return (
        <div>
            <img src={data.photo} alt={data.name} />
            <div className="text">
                <p>{data.name}</p>
                <p>{data.prise}</p>
            </div>
        </div>
    )
}

export default CurtCard