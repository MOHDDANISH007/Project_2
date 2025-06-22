// components/GameOverview.js
import React, { useState } from 'react'
import { FaShoppingCart } from 'react-icons/fa' // ✅ Supported
import QuantitySelector from './QuantitySelector'
import { motion } from 'framer-motion'
import axios from 'axios'

const GameOverview = ({ game, youtubeLink, platform, id }) => {
  const [quantity, setQuantity] = useState(0)
  // const BASE_URL = 'http://localhost:5000'
  const BASE_URL = 'https://project-2-backend-1hun.onrender.com'

  const handleAddToCart = async () => {
    const token =
      document.cookie.match('(^|;)\\s*token\\s*=\\s*([^;]+)')?.pop() || ''
    try {
      const res = await axios.post(
        `${BASE_URL}/cart/add`,
        {
          productId: id,
          quantity,
          productType: platform
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

  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 1.5 }}
      className='px-4 py-2 text-white'
    >
      <div>
        <h1 className='text-3xl md:text-4xl p-4 md:p-10 font-bold'>
          Game Gallery & Trailer
        </h1>

        <div className='flex flex-col lg:flex-row gap-6 p-4 md:p-10 justify-evenly items-center'>
          <div className='w-full lg:w-1/2'>
            {game.image && (
              <img
                src={game.image}
                alt={game.title}
                className='h-auto max-h-[500px] object-cover rounded-md'
              />
            )}
          </div>

          <div className='w-full lg:w-1/2'>
            {youtubeLink && (
              <iframe
                src={youtubeLink}
                height='300'
                width='100%'
                allowFullScreen
                className='mt-4 w-full h-[300px] md:h-[400px] lg:h-[500px] rounded-lg'
              />
            )}
          </div>
        </div>

        <div className='text-center py-6 px-4 space-y-2'>
          <h2 className='text-2xl md:text-3xl font-bold text-blue-400'>
            {game.title}
          </h2>
          <p className='text-lg md:text-xl text-gray-300'>
            Developed by:{' '}
            <span className='font-semibold text-white'>{game.developer}</span>
          </p>
          <p className='text-lg md:text-xl text-gray-300'>
            Price:{' '}
            <span className='font-semibold text-white'>₹{game.price}</span>
          </p>

          <div className='md:flex md:justify-center md:items-center md:gap-2 flex justify-center flex-col items-center'>
            <QuantitySelector quantity={quantity} setQuantity={setQuantity} />

            <div className='p-1 mt-4'>
              <button
                onClick={handleAddToCart}
                className='cursor-pointer flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition duration-200 shadow-md'
              >
                <FaShoppingCart  className='text-lg' />
                <span className='font-semibold'>Add to Cart</span>
              </button>
            </div>
          </div>
        </div>

        <h1 className='text-3xl md:text-4xl p-4 md:p-10 font-bold'>
          About This Game
        </h1>

        <div>
          <p className='text-base md:text-xl p-4 md:p-10'>{game.about}</p>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 p-4'>
            <div className='bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10'>
              <h3 className='text-lg md:text-xl font-semibold mb-4 text-blue-400'>
                Game Features
              </h3>
              <ul className='space-y-2 text-gray-300 text-sm md:text-base'>
                <li>• Enhanced 4K visuals and 60 FPS gameplay</li>
                <li>• DualSense haptic feedback integration</li>
                <li>• Massive open-world environment</li>
                <li>• Single-player campaign experience</li>
                <li>• No internet connection required</li>
              </ul>
            </div>

            <div className='bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10'>
              <h3 className='text-lg md:text-xl font-semibold mb-4 text-blue-400'>
                Technical specs
              </h3>
              <div className='space-y-2 text-sm md:text-base'>
                <div className='flex justify-between'>
                  <span className='font-semibold'>Platform:</span>
                  <span>{game.platform?.join(', ')}</span>
                </div>
                <div className='flex justify-between'>
                  <span className='font-semibold'>Genre:</span>
                  <span>{game.genre}</span>
                </div>
                <div className='flex justify-between'>
                  <span className='font-semibold'>Publisher:</span>
                  <span>{game.publisher}</span>
                </div>
                <div className='flex justify-between'>
                  <span className='font-semibold'>Origin:</span>
                  <span>{game.countryOfOrigin}</span>
                </div>
                <div className='flex justify-between'>
                  <span className='font-semibold'>Release Date:</span>
                  <span>{game.releaseDate}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default GameOverview
