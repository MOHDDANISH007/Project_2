import React, { useState, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useData } from '../context/DataContext' // adjust path as needed

const AccessoriesContent = () => {
  const { dataFromBackendForConsoles, loading, setLoading } = useData()
  const [products, setProducts] = useState([])
  const [currentImageIndex, setCurrentImageIndex] = useState({})
  const [localLoading, setLocalLoading] = useState(true)

  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const query = queryParams.get('query')?.trim().toLowerCase()

  useEffect(() => {
    let isMounted = true

    const fetchData = async () => {
      try {
        if (products.length === 0) setLocalLoading(true)

        const data = await dataFromBackendForConsoles()

        if (isMounted && Array.isArray(data.consoles)) {
          setProducts(data.consoles)
          const initialIndexes = {}
          data.consoles.forEach((_, index) => {
            initialIndexes[index] = 0
          })
          setCurrentImageIndex(initialIndexes)
        }
      } catch (error) {
        console.error('Error fetching consoles:', error)
      } finally {
        if (isMounted) {
          setLocalLoading(false)
          if (setLoading) setLoading(false)
        }
      }
    }

    fetchData()
    return () => {
      isMounted = false
    }
  }, [dataFromBackendForConsoles])

  const handlePrevImage = productIndex => {
    setCurrentImageIndex(prev => {
      const colorKeys = Object.keys(products[productIndex].images_by_color)
      const currentIndex = prev[productIndex] || 0
      const newIndex =
        currentIndex === 0 ? colorKeys.length - 1 : currentIndex - 1
      return {
        ...prev,
        [productIndex]: newIndex
      }
    })
  }

  const handleNextImage = productIndex => {
    setCurrentImageIndex(prev => {
      const colorKeys = Object.keys(products[productIndex].images_by_color)
      const currentIndex = prev[productIndex] || 0
      const newIndex =
        currentIndex === colorKeys.length - 1 ? 0 : currentIndex + 1
      return {
        ...prev,
        [productIndex]: newIndex
      }
    })
  }

  const filterData = products.filter(product => {
    const name = product?.console_name?.toLowerCase().replace(/\s+/g, '')
    const search = query?.replace(/\s+/g, '')
    return name && search && name.includes(search)
  })

  const displayProducts = query ? filterData : products

  const getCurrentImageData = (product, productIndex) => {
    const colorKeys = Object.keys(product.images_by_color)
    const currentIndex = currentImageIndex[productIndex] || 0
    const currentColor = colorKeys[currentIndex]
    const currentImage = product.images_by_color[currentColor]

    return {
      color: currentColor,
      image: currentImage,
      totalImages: colorKeys.length,
      currentIndex: currentIndex + 1
    }
  }

  if (localLoading || products.length === 0) {
    return (
      <div className='min-h-screen flex items-center justify-center text-white bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900'>
        <div className='text-2xl'>Loading consoles...</div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 1.5, ease: 'easeOut' }}
    >
      <div className='text-white px-4 py-6 min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900'>
        <h1 className='text-3xl underline p-2 font-bold mb-4'>
          Accessories Product
        </h1>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
          {displayProducts.map((product, productIndex) => {
            const imageData = getCurrentImageData(product, productIndex)

            return (
              <motion.div
                key={productIndex}
                className='bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 shadow-lg'
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <h2 className='text-xl font-semibold mb-4 text-center'>
                  {product.console_name}
                </h2>

                <div className='relative group'>
                  <div className='relative overflow-hidden rounded-lg mb-4'>
                    <Link to={`/dynamic_products/${product.product_id}`}>
                      <img
                        src={imageData.image}
                        alt={`${product.console_name} - ${imageData.color}`}
                        className='w-full h-64 object-cover rounded-lg transition-all duration-300'
                      />
                    </Link>

                    {imageData.totalImages > 1 && (
                      <>
                        <button
                          onClick={() => handlePrevImage(productIndex)}
                          className='absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200'
                          aria-label='Previous image'
                        >
                          <svg
                            className='w-4 h-4'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M15 19l-7-7 7-7'
                            />
                          </svg>
                        </button>

                        <button
                          onClick={() => handleNextImage(productIndex)}
                          className='absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200'
                          aria-label='Next image'
                        >
                          <svg
                            className='w-4 h-4'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M9 5l7 7-7 7'
                            />
                          </svg>
                        </button>
                      </>
                    )}
                  </div>

                  <div className='text-center'>
                    <h3 className='text-lg font-medium mb-2 text-blue-400'>
                      {imageData.color}
                    </h3>

                    {imageData.totalImages > 1 && (
                      <div className='flex justify-center space-x-1 mb-2'>
                        {Object.keys(product.images_by_color).map(
                          (_, index) => (
                            <button
                              key={index}
                              onClick={() =>
                                setCurrentImageIndex(prev => ({
                                  ...prev,
                                  [productIndex]: index
                                }))
                              }
                              className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                                index === (currentImageIndex[productIndex] || 0)
                                  ? 'bg-blue-400'
                                  : 'bg-gray-600 hover:bg-gray-500'
                              }`}
                              aria-label={`View ${
                                Object.keys(product.images_by_color)[index]
                              } variant`}
                            />
                          )
                        )}
                      </div>
                    )}

                    <p className='text-sm text-gray-400'>
                      {imageData.currentIndex} of {imageData.totalImages}
                    </p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {query && filterData.length === 0 && (
          <p className='text-white text-xl font-semibold text-center mt-6'>
            No Product found by this name.
          </p>
        )}
      </div>
    </motion.div>
  )
}

export default AccessoriesContent
