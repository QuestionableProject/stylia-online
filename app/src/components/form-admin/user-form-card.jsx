import React from "react"
import styles from './user-form.module.css'

export const UserFormCard = ({ data }) => {

    async function removeUser() {
        await fetch(`${process.env.REACT_APP_SERVER}/api/user/userRemove`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: data.id,
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

    async function roleChange(e) {
        await fetch(`${process.env.REACT_APP_SERVER}/api/user/userRoleChange`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: data.id,
                role: e
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
        <div className={styles.usercard}>
            <div className={styles.username}>
                <p>{data.id}</p>
                <p><b>Логин:</b> {data.login}</p>
                <p><b>Роль:</b> {data.role}</p>
            </div>
            <div className={styles.tools}>
                <button onClick={() => removeUser()}>Удалить</button>
                {data.role === "user" && (
                    <button onClick={() => roleChange("admin")}>Сделать админом</button>
                )}
                {data.role === "admin" && (
                    <button onClick={() => roleChange("user")}>Сделать Пользователем</button>
                )}
            </div>
        </div>
    )
}

export default UserFormCard