import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import App from './App';
import ErrorPage from './ErrorPage';
import ParkingLotDetail from './components/ParkingLotDetail';
import reportWebVitals from './reportWebVitals';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      errorElement: <ErrorPage />,
    },
    {
      path: 'parking-lot/:id',
      element: <ParkingLotDetail />,
    },
  ],
  {
    basename: '/parkingkit',
  },
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} className="container-fluid" />
  </React.StrictMode>,
);

reportWebVitals();
