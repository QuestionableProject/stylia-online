import React from 'react';
import ReactDOM from 'react-dom/client';
import Page from './routing/page';
import "./global.css"
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Error from './components/error';
import Catalogue from './routing/catalogue'
import Product from './routing/product';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Page/> ,
    errorElement: <Error/>,
  },
  {
    path: "/aboutme",
    element: <div>aboutme</div>,
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
    element: <div>contact</div>,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
