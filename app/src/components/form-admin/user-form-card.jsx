import React from "react"
import styles from './user-form.module.css'

export const UserFormCard = ({data}) => {
    return (
        <div className={styles.usercard}>
            <div className={styles.username}>
                <p><b>Логин:</b> {data.login}</p>
                <p><b>Роль:</b> {data.role}</p>
            </div>
            <div className={styles.tools}>
                <button>Удалить</button>
                <button>Изменить роль</button>
            </div>
        </div>
    )
}

export default UserFormCard