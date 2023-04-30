import { useRef, useEffect, useState } from "react"
import styles from './ofer-form.module.css'
import OferFormCard from "./ofer-form-card"

export default function OferForm({ open, onToggle }) {
    const oferForm = useRef()
    const [ofer, setOfer] = useState()

    useEffect(() => {
        const getOfer = async () => {
            await fetch(`${process.env.REACT_APP_SERVER}/api/ofer/getAllOfer`, {
                method: "POST"
            })
                .then(response => {
                    return response.json()
                }).then((data) => {
                    setOfer(data)
                }).catch((e) => {
                    console.log(e);
                });
        }
        getOfer()
    }, [])


    useEffect(() => {
        const onClick = (e) => {
            if (!oferForm.current?.contains(e.target) && !e.target?.getAttribute("data-oderform")) {
                onToggle(false)
            }
        }

        document.addEventListener('click', onClick)

        return () => {
            document.removeEventListener('click', onClick)
        }
    }, [open, oferForm])

    return (
        <div ref={oferForm} className={styles.oferForm}>
            <p className={styles.headtext}>Управление заказами</p>

            <div className={styles.oferForm__block}>
                {ofer?.map(e =>
                    <OferFormCard key={e.id} data={e} Array={setOfer}/>
                )}
            </div>
        </div>
    )
}