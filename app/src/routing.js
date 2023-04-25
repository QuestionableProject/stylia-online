import React, { useEffect } from "react"
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Page from './page/page';
import Error from './page/error';
import Catalogue from './page/catalogue'
import Product from './page/product';
import Contact from './page/contact';
import Aboutme from './page/aboutme';
import Profile from './page/user';
import Cookies from "js-cookie"
import { useDispatch } from "react-redux"
import { setUser } from "./store/slices/userSlice";
import { userCheck } from "./api/userApi";
import Admin from "./page/admin";
import { useAuth } from "./hooks/use-auth";




export const App = () => {
    const dispatch = useDispatch()
    const {isAuth} = useAuth()

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Page />,
            errorElement: <Error />,
        },
        {
            path: "/aboutme",
            element: <Aboutme />,
        },
        {
            path: "/product",
            element: <Catalogue />,
        },
        {
            path: "/product/:productId",
            element: <Product />,
        },
        {
            path: "/contact",
            element: <Contact />,
        },
        {
            path: "/profile",
            element: <Profile />,
        },
        {
            path: "/admin",
            element: isAuth?<Admin />: <Error/>,
        },
    ]);

    useEffect(() => {
        userCheck(Cookies.get('token'))
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (data.token) {
                    dispatch(setUser({
                        token: data.token,
                        image: data.image,
                        nickname: data.nickname,
                        id: data.id
                    }))
                    Cookies.set('token', data.token, { expires: 365 })
                }
            })
    }, [])

    return (
        <RouterProvider router={router} />
    )
}

export default App