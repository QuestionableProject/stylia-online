import React from "react"
import { useParams } from "react-router-dom";
import Footer from "../components/footer/footer";
import Layout from "../layout";

export const Product = () => {
    const {productId} = useParams()
    return (
        <Layout>
            Товар номер {productId}
            <Footer/>
        </Layout>
    )
}

export default Product