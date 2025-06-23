import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { MdDashboard } from 'react-icons/md'
import { IoIosLogOut } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'
import { useUserInformation } from '../context/UserInformation'
import userAvatar from '../../public/userinfo.jpg'

const Dashboard = () => {
  const [userCart, setUserCart] = useState([])
  const [productsData, setProductsData] = useState([])
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    id: '',
    membershipDate: '',
    cartItems: 0
  })
  const [loading, setLoading] = useState({
    cart: true,
    products: false,
    user: true
  })
  const [error, setError] = useState(null)

  const navigate = useNavigate()
  const {
    userInfo,
    loggedIn,
    loading: authLoading,
    logout
  } = useUserInformation()

  // const BASE_URL = 'http://localhost:5000'
  const BASE_URL = 'https://project-2-backend-1hun.onrender.com'

  // Redirect if not logged in
  // This effect runs once on component mount to check authentication status
  // If the user is not logged in, it redirects to the login page
  useEffect(() => {
    if (!authLoading && !loggedIn) {
      navigate('/login')
    }
  }, [loggedIn, authLoading, navigate])

  // Fetch user cart with cleanup
  useEffect(() => {
    
    let isMounted = true
    const controller = new AbortController()

    const fetchCart = async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/cart/user-cart`, {
          withCredentials: true,
          signal: controller.signal
        })
        if (isMounted) {
          setUserCart(data.cart || [])
          setLoading(prev => ({ ...prev, cart: false }))
        }
      } catch (err) {
        if (isMounted && !axios.isCancel(err)) {
          console.error('Error fetching cart:', err)
          setError('Failed to load cart data')
          setLoading(prev => ({ ...prev, cart: false }))
          if (err.response?.status === 401) {
            navigate('/login')
          }
        }
      }
    }

    if (loggedIn) {
      fetchCart()
    }

    return () => {
      isMounted = false
      controller.abort()
    }
  }, [loggedIn, navigate])

  // Fetch product details with cleanup
  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()

    const fetchAllProductDetails = async () => {
      if (!userCart.length) {
        if (isMounted) {
          setProductsData([])
          setLoading(prev => ({ ...prev, products: false }))
        }
        return
      }

      try {
        if (isMounted) {
          setLoading(prev => ({ ...prev, products: true }))
        }

        const productPromises = userCart.map(item =>
          axios.get(
            `${BASE_URL}/productsItems/${item.productType}/${item.productId}`,
            {
              signal: controller.signal
            }
          )
        )

        const responses = await Promise.allSettled(productPromises)

        if (isMounted) {
          const combinedData = responses
            .map((res, index) => {
              if (res.status === 'fulfilled') {
                return {
                  ...res.value.data.game,
                  quantity: userCart[index].quantity,
                  productType: userCart[index].productType,
                  productId: userCart[index].productId
                }
              }
              return null
            })
            .filter(Boolean)

          setProductsData(combinedData)
          setLoading(prev => ({ ...prev, products: false }))
        }
      } catch (err) {
        if (isMounted && !axios.isCancel(err)) {
          console.error('Unexpected error:', err)
          setError('Failed to load product details')
          setLoading(prev => ({ ...prev, products: false }))
        }
      }
    }

    if (userCart.length > 0) {
      fetchAllProductDetails()
    }

    return () => {
      isMounted = false
      controller.abort()
    }
  }, [userCart])

  // Set user details from context
  useEffect(() => {
    if (userInfo?.userName) {
      const newDate = new Date(userInfo.createdAt)
      const formattedDate = newDate.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      })

      setUserDetails({
        name: userInfo.userName,
        email: userInfo.userEmail,
        id: userInfo._id,
        membershipDate: formattedDate,
        cartItems: userInfo.cart?.length || 0
      })
      setLoading(prev => ({ ...prev, user: false }))
    }
  }, [userInfo])

  const handleLogout = async () => {
    try {
      await logout()
      navigate('/')
      window.location.reload() // Full page reload to ensure clean state
    } catch (err) {
      console.error('Logout error:', err)
      navigate('/')
    }
  }

  if (authLoading || loading.user) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500'></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className='min-h-screen bg-gray-50 p-6 flex items-center justify-center'>
        <div className='bg-white p-6 rounded-lg shadow-md max-w-md text-center'>
          <h2 className='text-xl font-bold text-red-600 mb-4'>Error</h2>
          <p className='text-gray-700 mb-4'>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors'
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-gray-50 p-6'>
      <div className='max-w-6xl mx-auto'>
        {/* Header */}
        <header className='flex justify-between items-center mb-8'>
          <div className='flex items-center space-x-4'>
            <MdDashboard className='text-3xl text-blue-600' />
            <h1 className='text-2xl font-bold text-gray-800'>User Dashboard</h1>
          </div>
          <button
            onClick={handleLogout}
            className='flex items-center space-x-2 text-red-600 hover:text-red-800 transition-colors'
            aria-label='Logout'
          >
            <IoIosLogOut className='text-2xl' />
            <span className='font-medium cursor-pointer'>Logout</span>
          </button>
        </header>

        {/* User Profile Section */}
        <section className='bg-white rounded-lg shadow-md p-6 mb-8'>
          <div className='flex flex-col md:flex-row items-start md:items-center gap-6'>
            <img
              src={userAvatar}
              alt='User profile'
              className='w-24 h-24 rounded-full border-4 border-blue-100 object-cover'
            />
            <div>
              <h2 className='text-xl font-semibold text-gray-800'>
                {userDetails.name || 'Guest User'}
              </h2>
              <p className='text-gray-600'>{userDetails.email}</p>
            </div>
          </div>
        </section>

        {/* User Details Section */}
        <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          <div className='bg-white rounded-lg shadow-md p-6'>
            <h3 className='text-lg font-bold text-gray-700 mb-2'>
              Membership Since
            </h3>
            <p className='text-gray-600'>{userDetails.membershipDate}</p>
          </div>

          <div className='bg-white rounded-lg shadow-md p-6'>
            <h3 className='text-lg font-bold text-gray-700 mb-2'>User ID</h3>
            <p className='text-gray-600 font-mono truncate'>{userDetails.id}</p>
          </div>

          <div className='bg-white rounded-lg shadow-md p-6'>
            <h3 className='text-lg font-bold text-gray-700 mb-2'>Cart Items</h3>
            <p className='text-gray-600'>
              {loading.products ? (
                <span className='inline-block h-4 w-4 animate-spin rounded-full border-2 border-blue-500 border-t-transparent'></span>
              ) : (
                userDetails.cartItems
              )}
            </p>
          </div>
        </section>

        {/* Cart Items Section */}
       
      </div>
    </div>
  )
}

export default Dashboard
