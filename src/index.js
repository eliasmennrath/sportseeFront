import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';

import Home from './Home/Home.jsx';

import './index.css';

const router = createBrowserRouter([
  {
    path: "/:id",
    element: <Home />,
  },
  {
    path: "/",
    element: <Navigate to={"/12"} replace/>,
  }
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
