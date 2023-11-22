import React from 'react';
import { createRoot } from 'react-dom/client';
import RoutesApp from './RoutesApp';
import { ToastContainer } from 'react-toastify';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RoutesApp />
    <ToastContainer />
  </React.StrictMode>,
);
