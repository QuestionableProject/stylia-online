import styles from './ofer-form.module.css'

export default function OferFormCard({ data, Array }) {

    async function oferActive(e) {
        await fetch(`${process.env.REACT_APP_SERVER}/api/ofer/updateOfer`, {
            method: "POST",
            headers: { 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                oferId: data.id,
                active: e
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
        <div className={styles.OferCard}>
            <div className={styles.text}>
                <p>id: {data.id}</p>
                <p>Имя: {data.name}</p>
                <p>Адрес: {data.address}</p>
                <p>Телефон: {data.phone}</p>
                <p>Почта: {data.email}</p>
            </div>
            <div className={styles.product}>
                {data.oferproducts.map(e =>
                    <div key={e.product.id} className={styles.product__card}>
                        <img src={e.product.image} alt={e.product.name} />
                        <p>id: {e.product.id}</p>
                        <p>Имя: {e.product.name}</p>
                    </div>
                )}
            </div>
            {data.active ? (
                <button onClick={() => oferActive(false)} style={{ background: "#53bc6b", color: "black" }}>Заказ выполнен</button>
            ) : (
                <button onClick={() => oferActive(true)} style={{ background: "#b1a656", color: "white" }}>Заказ выполняется</button>
            )}
        </div>
    )
}