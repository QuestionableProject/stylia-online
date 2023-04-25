import React from 'react';
import ReactDOM from 'react-dom/client';

import "./global.css"

import { Provider } from 'react-redux';
import { store } from './store';
import App from './routing';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
   <App/>
  </Provider>
  // <React.StrictMode>
  //   <Provider store={store}>
  //     <App/>
  //   </Provider>
  // </React.StrictMode>
);
