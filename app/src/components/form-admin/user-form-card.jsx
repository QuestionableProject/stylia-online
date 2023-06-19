import React from "react"
import styles from './user-form.module.css'
import { useAuth } from "../../hooks/use-auth";

export const UserFormCard = ({ data, Array }) => {
    const {id} = useAuth()

    async function removeUser() {
        if (data.id === id) return alert("Вы не можете себя удалить")

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
                Array(data)
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
                Array(data)
            }).catch((e) => {
                console.log(e);
            });
    }
    return (
        <div className={styles.usercard}>
            <div className={styles.username}>
                <p>Дата регистрации: {data.createdAt?.slice(0, 16).replace(['T'], " Время: ")}</p>
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