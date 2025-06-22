import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { TbTruckDelivery } from 'react-icons/tb'
import { TiTick } from 'react-icons/ti'
import { FaPlus } from 'react-icons/fa'
import { RiSecurePaymentLine } from 'react-icons/ri'
import { FaCartShopping } from 'react-icons/fa6'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

const ProductDetailPage = () => {
  const navigate = useNavigate()
  const { id } = useParams()

  const [products, setProducts] = useState({})
  const [images, setImages] = useState([])
  const [videos, setVideos] = useState([])
  const [activeImage, setActiveImage] = useState(true)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [activeTab, setActiveTab] = useState('Overview')
  const [openFAQIndex, setOpenFAQIndex] = useState(null)
  const [quantity, setQuantity] = useState(0)
  const [loading, setLoading] = useState(false)
  // const BASE_URL = 'http://localhost:5000' // Replace with your actual API base URL
  const BASE_URL = 'https://project-2-backend-1hun.onrender.com' // Replace with your actual API base URL

  const slugSegment = 'consoles'
  const features = [
    'True 4K Gaming Experiance',
    'Enchanced Graphics Performance',
    'Ultra Fast Loading Time'
  ]

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const response = await fetch(`${BASE_URL}/products/${id}`)
        const data = await response.json()
        console.log('Fetched product data:', data)

        const media = data.consoleDetails?.media || {}
        const imageArray = Object.values(media.images_by_color || {})

        const rawVideo = media.video || ''
        let embedURL = ''

        if (rawVideo.includes('youtu.be')) {
          const videoId = rawVideo.split('youtu.be/')[1].split('?')[0]
          embedURL = `https://www.youtube.com/embed/${videoId}`
        } else if (rawVideo.includes('youtube.com/watch')) {
          const videoId = rawVideo.split('v=')[1].split('&')[0]
          embedURL = `https://www.youtube.com/embed/${videoId}`
        }

        const videoArray = embedURL ? [embedURL] : []

        setProducts(data.consoleDetails)
        setImages(imageArray)
        setVideos(videoArray)
        setLoading(false)
      } catch (err) {
        console.error('Error fetching product:', err)
      }
    }

    if (id) {
      fetchProducts()
    }
  }, [id])

  if (loading) {
    return (
      <div className='flex items-center justify-center min-h-screen bg-white'>
        <div className='animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-500'></div>
        <p className='ml-4 text-lg text-gray-700 font-medium'>Loading...</p>
      </div>
    )
  }

  function getCookieValue (name) {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'))
    return match ? match[2] : null
  }

  const handleAddToCart = async () => {
    const token = getCookieValue('token')
    try {
      const res = await axios.post(
        `${BASE_URL}/cart/add`,
        {
          productId: id,
          quantity,
          productType: slugSegment
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
          withCredentials: true
        }
      )
      console.log(res.data.message)
    } catch (error) {
      console.error('Error adding to cart:', error)
    }
  }

  // ... Render JSX (same structure as provided)

  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 1.5, ease: 'easeOut' }}
    >
      <div className='min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 sm:p-6 text-white overflow-x-hidden'>
        <div className='max-w-7xl mx-auto flex flex-col lg:flex-row gap-6'>
          {/* Media Section */}
          <div className='flex-1'>
            <div className='mb-6 flex justify-center'>
              {activeImage && images.length > 0 ? (
                <motion.img
                  src={images[currentImageIndex]}
                  alt={`img-${currentImageIndex}`}
                  className='w-full max-w-full sm:max-w-xl rounded-lg shadow-xl object-contain'
                  whileHover={{ scale: 1.05 }}
                />
              ) : (
                videos.length > 0 && (
                  <motion.iframe
                    src={videos[0]}
                    title={`vid-0`}
                    className='w-full max-w-full sm:w-[500px] h-[300px] rounded-lg shadow-xl'
                    allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                    allowFullScreen
                    whileHover={{ scale: 1.05 }}
                  />
                )
              )}
            </div>

            <div className='flex flex-wrap justify-center gap-4'>
              {images.map((img, index) => (
                <motion.img
                  key={index}
                  src={img}
                  alt={`thumb-img-${index}`}
                  className={`w-20 h-20 rounded-md object-cover cursor-pointer shadow-md hover:ring-2 hover:ring-purple-500 ${
                    activeImage && currentImageIndex === index
                      ? 'ring-4 ring-purple-400'
                      : ''
                  }`}
                  onClick={() => {
                    setActiveImage(true)
                    setCurrentImageIndex(index)
                  }}
                  whileHover={{ scale: 1.1 }}
                />
              ))}

              {videos.map((vid, index) => (
                <motion.div
                  key={index}
                  className={`w-20 h-20 rounded-md cursor-pointer shadow-md hover:ring-2 hover:ring-purple-500 relative ${
                    !activeImage ? 'ring-4 ring-purple-400' : ''
                  }`}
                  onClick={() => setActiveImage(false)}
                  whileHover={{ scale: 1.1 }}
                >
                  <iframe
                    src={vid}
                    title={`thumb-vid-${index}`}
                    className='w-full h-full rounded-md'
                    allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                    allowFullScreen
                  />
                  <div className='absolute inset-0 flex items-center justify-center'>
                    <svg
                      className='w-8 h-8 text-white opacity-75'
                      fill='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path d='M8 5v14l11-7z' />
                    </svg>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Details Section */}
          <div className='flex-1'>
            <div className='bg-slate-800 bg-opacity-80 p-6 rounded-lg shadow-xl'>
              <h1 className='text-3xl font-bold mb-4 text-center lg:text-left'>
                {products.product_name || 'Loading...'}
              </h1>
              <div className='space-y-3'>
                <h3 className='text-2xl font-semibold'>
                  Current Price ₹{products.current_price || 'N/A'}
                </h3>
                <h3 className='text-xl font-medium text-green-400'>
                  Discount: {products.discount || 'N/A'}
                </h3>
                <h3 className='text-xl font-medium text-gray-400 line-through'>
                  Original Price: ₹{products.original_price || 'N/A'}
                </h3>
                <div className='flex items-center gap-2'>
                  <TbTruckDelivery />
                  <span className='font-semibold text-gray-400 text-lg'>
                    {products.delivery_note || 'N/A'}
                  </span>
                </div>
              </div>
            </div>

            <div className='border-2 mt-10 border-gray-500 rounded-lg p-4'>
              <div className='p-5'>
                <p className='text-lg'>{products.description?.overview}</p>
              </div>
              <div className='p-5'>
                {features.map((feature, index) => (
                  <ul
                    className='flex items-center gap-2 text-amber-600'
                    key={index}
                  >
                    <TiTick />
                    <li>{feature}</li>
                  </ul>
                ))}
              </div>
            </div>

            <div>
              <div className='mt-4 w-fit bg-white p-4 rounded-xl flex flex-row gap-5 shadow-md'>
                <div className='mb-2'>
                  <h1 className='text-lg font-semibold text-gray-700'>
                    Quantity:
                  </h1>
                </div>
                <div className='flex items-center gap-4'>
                  <button
                    disabled={quantity <= 0}
                    onClick={() => setQuantity(quantity - 1)}
                    className={`w-10 h-10 rounded-full bg-gray-200 text-gray-700 text-xl font-bold transition ${
                      quantity <= 0
                        ? 'cursor-not-allowed'
                        : 'cursor-pointer hover:bg-gray-300'
                    }`}
                  >
                    -
                  </button>
                  <p className='text-lg text-black font-medium w-6 text-center'>
                    {quantity}
                  </p>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className='cursor-pointer w-10 h-10 rounded-full bg-gray-200 text-gray-700 text-xl font-bold hover:bg-gray-300 transition'
                  >
                    +
                  </button>
                </div>
              </div>

              <div className='p-1 mt-4'>
                <button
                  onClick={handleAddToCart}
                  className='cursor-pointer flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition duration-200 shadow-md'
                >
                  <FaCartShopping className='text-lg' />
                  <span className='font-semibold'>Add to Cart</span>
                </button>
              </div>
            </div>

            <div className='mt-5 flex flex-col md:flex-row gap-4 items-start md:items-center border-2 p-5 rounded-md'>
              <RiSecurePaymentLine size={24} className='text-green-400' />
              {products?.warranty && (
                <div>
                  <div className='font-semibold text-white'>
                    {products.warranty.duration} Warranty
                  </div>
                  <div className='text-gray-400'>
                    {products.warranty.description}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className='border-2 mt-10 border-gray-500 rounded-2xl p-4'>
          <ul className='flex flex-wrap items-center gap-6 text-amber-600 cursor-pointer text-lg'>
            {['Overview', 'Specification', 'FAQ', 'Reviews'].map(tab => (
              <li
                key={tab}
                className={`${
                  activeTab === tab
                    ? 'border-b-2 text-white font-semibold transition-all duration-600 ease-in'
                    : ''
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </li>
            ))}
          </ul>
          <div className='border-b-2 mt-2 border-gray-500 opacity-50'></div>

          <div className='mt-6 text-white'>
            {activeTab === 'Overview' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                <div className='space-y-6'>
                  <h2 className='text-xl font-bold px-4'>Key Features</h2>
                  <div className='flex flex-wrap justify-between gap-4'>
                    {products.description?.features?.map((feature, index) => (
                      <div
                        key={index}
                        className='bg-slate-800 p-4 rounded-lg w-full sm:w-[48%] lg:w-[30%] shadow-md'
                      >
                        <p className='text-lg text-amber-400 font-bold'>
                          {feature.title}
                        </p>
                        <p className='text-sm text-gray-300'>
                          {feature.content}
                        </p>
                      </div>
                    ))}
                  </div>
                  <h2 className='text-xl font-bold px-4'>What's in the Box</h2>
                  <div className='flex flex-wrap gap-3 px-4'>
                    {products.included_items?.map((item, index) => (
                      <div
                        key={index}
                        className='bg-slate-700 p-3 rounded-md text-sm shadow'
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'Specification' && products.specifications && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                <div className='p-4'>
                  <h2 className='text-xl font-bold mb-4'>Specifications</h2>
                  {Object.entries(products.specifications).map(([key, val]) => (
                    <div
                      key={key}
                      className='flex justify-between text-sm md:text-base border-b py-2 border-gray-700'
                    >
                      <span className='text-amber-400 capitalize'>{key}</span>
                      <span>{val}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'FAQ' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                <div className='p-4'>
                  <h2 className='text-2xl font-semibold mb-6 text-center'>
                    Frequently Asked Questions
                  </h2>
                  <div className='grid gap-4'>
                    {products.faqs?.map((faq, index) => (
                      <div
                        key={index}
                        className='bg-slate-800 rounded-lg p-4 shadow'
                      >
                        <div className='flex justify-between items-center'>
                          <h3 className='font-semibold'>{faq.question}</h3>
                          <FaPlus
                            className='cursor-pointer'
                            onClick={() =>
                              setOpenFAQIndex(
                                openFAQIndex === index ? null : index
                              )
                            }
                          />
                        </div>
                        {openFAQIndex === index && (
                          <p className='text-gray-300 mt-2'>{faq.answer}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'Reviews' && (
              <p className='text-center text-gray-400'>No reviews available.</p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default ProductDetailPage
