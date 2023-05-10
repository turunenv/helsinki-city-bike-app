import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

import ErrorPage from './error-page';
import Root from './routes/root';
import LandingPage from './routes/landingPage'
import Stations, { loader as stationsLoader } from './routes/stations';
import Station, {loader as stationLoader} from './routes/station';
import Journeys from './routes/journeys';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <LandingPage />
      },
      {
        path: '/stations',
        element: <Stations />,
        loader: stationsLoader,
      },
      {
        path: '/stations/:stationId',
        element: <Station />,
        loader: stationLoader,
      },
      {
        path: '/journeys',
        element: <Journeys />
      }
    ]
  },
  
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
