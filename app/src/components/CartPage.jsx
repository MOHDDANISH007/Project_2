import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { motion } from 'framer-motion'
import { MdDelete } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

const CartPage = () => {
  const [userCart, setUserCart] = useState([])
  const [productsData, setProductsData] = useState([])
  const [image, setImage] = useState(null)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  // const BASE_URL = 'http://localhost:5000'
  const BASE_URL = 'https://project-2-backend-1hun.onrender.com'

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/cart/user-cart`, {
          withCredentials: true
        })
        console.log('Cart Data is : ', res)
        setUserCart(res.data.cart)
      } catch (err) {
        console.error('Error fetching cart:', err)
        if (err.response?.status === 401) {
          navigate('/login')
        }
      }
    }

    fetchCart()
  }, [navigate])

  useEffect(() => {
    const fetchAllProductDetails = async () => {
      try {
        setLoading(true)
        const productPromises = userCart.map(item => {
          const url = `${BASE_URL}/productsItems/${item.productType}/${item.productId}`
          return axios.get(url)
        })

        const responses = await Promise.allSettled(productPromises)
        const combinedData = responses
          .map((res, index) => {
            if (res.status === 'fulfilled') {
              return {
                ...res.value.data.game,
                quantity: userCart[index].quantity,
                productType: userCart[index].productType,
                productId: userCart[index].productId
              }
            } else {
              console.warn(
                `Failed to fetch product: ${userCart[index].productType}/${userCart[index].productId}`,
                res.reason?.response?.status
              )
              return null
            }
          })
          .filter(Boolean)

        setProductsData(combinedData)
        setLoading(false)
      } catch (err) {
        console.error('Unexpected error in fetchAllProductDetails:', err)
      }
    }

    if (userCart.length > 0) {
      fetchAllProductDetails()
    } else {
      setProductsData([])
    }
  }, [userCart])

  useEffect(() => {
    if (productsData[0]?.Type === 'Console') {
      setImage(Object.values(productsData[0].images_by_color)[0])
    }
  }, [productsData])

  const totalAmount = productsData.reduce(
    (acc, item) => acc + item.price_inr * item.quantity,
    0
  )

  const productNames = productsData.map(
    p => p.full_name || p.base_name || p.console_name || 'Unnamed Product'
  )

  const handleRemoveFromCart = async (productId, quantity, productType) => {
    try {
      await axios.post(
        `${BASE_URL}/cart/remove`,
        {
          productId,
          productQuantity: quantity,
          productType
        },
        {
          withCredentials: true
        }
      )

      setUserCart(prev =>
        prev.filter(
          item =>
            item.productId !== productId || item.productType !== productType
        )
      )
    } catch (err) {
      console.error('Error removing from cart:', err)
    }
  }

  if (loading) {
    return (
      <div className='flex items-center justify-center min-h-screen bg-white'>
        <div className='animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-500'></div>
        <p className='ml-4 text-lg text-gray-700 font-medium'>
          Loading Cart...
        </p>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 1.5, ease: 'easeOut' }}
      className='min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white px-4 py-6 sm:px-8'
    >
      <h1 className='text-4xl sm:text-5xl font-bold mb-8 text-center text-yellow-400'>
        🛒 My Cart
      </h1>

      {productsData.length > 0 ? (
        <div className='max-w-6xl mx-auto flex flex-col lg:flex-row gap-10'>
          <div className='flex flex-col gap-6 w-full lg:w-2/3'>
            {productsData.map((product, index) => (
              <div
                key={index}
                className='bg-gray-800 border border-gray-700 rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:gap-6 shadow-xl'
              >
                <img
                  className='w-full sm:w-40 h-auto object-cover rounded-xl shadow-md'
                  src={
                    product.Type === 'Console'
                      ? Object.values(product.images_by_color)[0]
                      : product.image_link
                  }
                  alt={product.console_name || product.full_name}
                />
                <div className='flex-1 space-y-2 sm:space-y-3'>
                  <p className='text-xl sm:text-2xl font-bold text-white'>
                    {product.console_name || product.full_name}
                  </p>
                  <p className='text-base sm:text-lg text-gray-300'>
                    Quantity: {product.quantity}
                  </p>
                  <p className='text-base sm:text-lg text-gray-300'>
                    Price: ₹{product.price_inr}
                  </p>
                </div>
                <button
                  onClick={() =>
                    handleRemoveFromCart(
                      product.productId,
                      product.quantity,
                      product.productType
                    )
                  }
                  className='text-red-500 cursor-pointer hover:text-red-600 transition duration-200 self-end sm:self-center'
                >
                  <MdDelete size={28} />
                </button>
              </div>
            ))}
          </div>

          <div className='bg-gray-800 border border-gray-700 rounded-2xl p-5 sm:p-6 shadow-xl space-y-4 max-h-[400px] overflow-y-auto w-full lg:w-1/3'>
            <h2 className='text-2xl sm:text-3xl font-bold text-yellow-400'>
              🧾 Billing Summary
            </h2>
            <div>
              <span className='font-semibold text-white'>Products:</span>
              <ul className='list-disc list-inside mt-2 text-gray-300 text-sm space-y-1'>
                {productNames.map((name, idx) => (
                  <li key={idx}>{name}</li>
                ))}
              </ul>
            </div>
            <p className='text-lg sm:text-xl font-bold text-green-400 border-t border-gray-600 pt-2'>
              Total Amount: ₹{totalAmount}
            </p>
          </div>
        </div>
      ) : (
        <div className='text-center text-gray-300 text-lg sm:text-xl mt-10'>
          No Products in Cart 🛒
        </div>
      )}
    </motion.div>
  )
}

export default CartPage
