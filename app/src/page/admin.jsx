import React, { useState } from "react"

import styles from './admin.module.css'
import ProductForm from "../components/form-admin/product-form"
import UserForm from "../components/form-admin/user-form"
import { useNavigate } from "react-router-dom"
import OferForm from "../components/form-admin/ofer-form"
import { useAuth } from "../hooks/use-auth"
import Error from "./error"

export const Admin = () => {
    const {isAuth, role} = useAuth()
    const navigate = useNavigate()
    const [product, setProduct] = useState(false)
    const [userRole, setUserRole] = useState(false)
    const [oferForm, setOferForm] = useState(false)

    return (isAuth && role === "admin")?(
        <div className={styles.admin}>
            <div className={styles.admin__menu}>
                <p>AdminPanel 1.0</p>
                <ul>
                    <li data-productfrom onClick={() => setProduct(true)}>Товар</li>
                    <li data-userrole onClick={() => setUserRole(true)}>Управление пользователями</li>
                    <li data-oderform onClick={() => setOferForm(true)}>Заказы</li>
                </ul>
                <p style={{ cursor: "pointer" }} onClick={() => navigate("/profile")}>Покинуть панель</p>
            </div>
            <div className={styles.section__create}>
                {product && (
                    <ProductForm open={product} onToggle={setProduct} />
                )}
                {userRole && (
                    <UserForm open={userRole} onToggle={setUserRole} />
                )}
                {oferForm && (
                    <OferForm open={oferForm} onToggle={setOferForm} />
                )}
            </div>
        </div>

    ):<Error/>
}

export default Admin