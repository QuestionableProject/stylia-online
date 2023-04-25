import React, { useState } from "react"
import Layout from "../layout"
import styles from './admin.module.css'
import ProductForm from "../components/form-admin/product-form"
import UserForm from "../components/form-admin/user-form"
import { useNavigate } from "react-router-dom"

export const Admin = () => {
    const navigate = useNavigate()
    const [product, setProduct] = useState(false)
    const [userRole, setUserRole] = useState(false)

    return (
        <Layout>
            <div className={styles.admin}>
                <div className={styles.admin__menu}>
                    <p>AdminPanel 1.0</p>
                    <ul>
                        <li data-productfrom onClick={()=> setProduct(true)}>Товар</li>
                        <li data-userrole onClick={()=> setUserRole(true)}>Управление пользователями</li>
                    </ul>
                    <p style={{cursor: "pointer"}} onClick={() => navigate("/profile")}>Покинуть панель</p>
                </div>
                <div className={styles.section__create}>
                    {product && (
                        <ProductForm open={product} onToggle={setProduct}/>
                    )}
                    {userRole && (
                        <UserForm open={userRole} onToggle={setUserRole}/>
                    )}
                </div>
            </div>
        </Layout>
    )
}

export default Admin