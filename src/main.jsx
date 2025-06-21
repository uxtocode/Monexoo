import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Layout from './components/Layout/Layout.jsx'
import Home from './pages/Home.jsx'
import AddTransaction from './pages/AddTransaction.jsx'
import Transactions from './pages/Transactions.jsx'
import Settings from './pages/Settings.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/add',
        element: <AddTransaction />,
      },
      {
        path: '/transactions',
        element: <Transactions />,
      },
      {
        path: '/settings',
        element: <Settings />
      }
    ]
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </StrictMode >,
)
