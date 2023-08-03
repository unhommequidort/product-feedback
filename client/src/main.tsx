import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { store } from './redux/store.tsx';
import { router } from './router/router.tsx';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <div className="w-full h-screen bg-slate-50">
        <ToastContainer />
        <RouterProvider router={router} />
      </div>
    </Provider>
  </React.StrictMode>
);
