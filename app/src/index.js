import React from 'react';
import ReactDOM from 'react-dom/client';
import Page from './routing/page';
import "./global.css"
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Error from './routing/error';
import Catalogue from './routing/catalogue'
import Product from './routing/product';
import Contact from './routing/contact';
import Aboutme from './routing/aboutme';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Page/> ,
    errorElement: <Error/>,
  },
  {
    path: "/aboutme",
    element: <Aboutme/>,
  },
  {
    path: "/product",
    element: <Catalogue/>,
  },
  {
    path: "/product/:productId",
    element: <Product/>,
  },
  {
    path: "/contact",
    element: <Contact/>,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
