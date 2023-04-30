import React, {useEffect, useRef, useState} from "react"
import styles from './user-form.module.css'
import UserFormCard from "./user-form-card"

export const UserForm = ({open, onToggle}) => {
    const [userState, setUserState] = useState()
    const userRole= useRef()

    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER}/api/user/userChange`, {
            method: "POST" 
        })
            .then(response => {
                return response.json()
            }).then((data) => {
                setUserState(data)
            }).catch((e) => {
                console.log(e);
            });
    }, [])

    
    useEffect(() => {
        const onClick = (e) => {
            if (!userRole.current?.contains(e.target) && !e.target?.getAttribute("data-userrole")) {
                onToggle(false)
            }
        }

        document.addEventListener('click', onClick)

        return () => {
            document.removeEventListener('click', onClick)
        }
    }, [open, userRole])

    return (
        <div ref={userRole} className={styles.userform}>
            <p className={styles.headtext}>Управление пользователями</p>
            <div className={styles.userform__block}>
                {userState?.map((e) => 
                    <UserFormCard key={e.id} data={e} Array={setUserState}/>
                )}
            </div>
        </div>
    )
}

export default UserForm