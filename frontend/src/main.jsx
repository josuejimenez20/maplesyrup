import React from 'react';
import ReactDOM from 'react-dom/client';

import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './router/AppRouter';

import { Provider } from 'react-redux';
import { store } from './redux/store/store'

import 'bootstrap/dist/css/bootstrap.css';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <div style={{
        height: 'auto',
        overflowX: 'hidden',
        backgroundColor: 'black'
      }}>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </div>
    </Provider>
  </React.StrictMode>
);