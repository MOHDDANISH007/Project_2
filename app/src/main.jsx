import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import App from './App.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'

import './index.css'
import { DataProvider } from './context/DataContext.jsx'
import Ps4 from './components/Ps4.jsx'
import Ps5 from './components/Ps5.jsx'
import XboxOne from './components/Xbox_One.jsx'
import XboxX from './components/Xbox_X.jsx'
import GameDetailsPage from './components/GameDetailsPage.jsx'
import ProductContent from './components/ProductContent.jsx'
import AccessoriesContent from './components/AccessoriesContent.jsx'
import ProductDetailPage from './components/ProductDetailPage.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import LoginPage from './components/Login.jsx'
import { UserInformationProvider } from './context/UserInformation.jsx'
import CartPage from './components/CartPage.jsx'
import Ask_AI_Content from './components/Ask_AI_Content.jsx'
import { User } from 'lucide-react'
import UserDashBorad from './components/UserDashBorad.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AuthProvider>
        <UserInformationProvider>
          {' '}
          {/* ✅ Wrap it here */}
          <DataProvider>
            <App />
          </DataProvider>
        </UserInformationProvider>
      </AuthProvider>
    ),
    children: [
      { path: '/', element: <Home /> },
      { path: '/about', element: <About /> },
      { path: '/ps4', element: <Ps4 /> },
      { path: '/ps5', element: <Ps5 /> },
      { path: '/xboxone', element: <XboxOne /> },
      { path: '/xboxx', element: <XboxX /> },
      { path: '/products', element: <ProductContent /> },
      { path: '/accessories', element: <AccessoriesContent /> },
      { path: '/games/:platform/:id', element: <GameDetailsPage /> },
      { path: '/ProductContent', element: <ProductContent /> },
      { path: '/accessoriesContent', element: <AccessoriesContent /> },
      { path: '/dynamic_products/:id', element: <ProductDetailPage /> },
      { path: '/login', element: <LoginPage /> },
      { path: 'cart', element: <CartPage /> }, // For redirect after login
      { path: '/askAI', element: <Ask_AI_Content /> },
      { path: '/userDashboard', element: <UserDashBorad /> }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
