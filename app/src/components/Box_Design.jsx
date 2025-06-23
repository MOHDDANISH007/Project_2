import React from 'react'
import { useNavigate } from 'react-router-dom'
import { SiPlaystation4, SiPlaystation5 } from 'react-icons/si'
import { BsXbox } from 'react-icons/bs'
import { motion } from 'framer-motion'

const GamePlatformSelector = () => {
  const navigate = useNavigate()

  const platforms = [
    {
      id: 'ps5',
      name: 'PS5',
      fullName: 'PlayStation 5',
      logo: <SiPlaystation5 size={60} />
    },
    {
      id: 'ps4',
      name: 'PS4',
      fullName: 'PlayStation 4',
      logo: <SiPlaystation4 size={60} />
    },
    {
      id: 'xboxX',
      name: 'Xbox Series X',
      fullName: 'Xbox Series X',
      logo: <BsXbox size={40} />
    },
    {
      id: 'xboxOne',
      name: 'Xbox One',
      fullName: 'Xbox One',
      logo: <BsXbox size={40} />
    }
  ]

  const handlePlatformClick = platformId => {
    navigate(`/${platformId}`)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }} // ✅ Corrected curly brace
      className='mt-20'
    >
      <div className='h-1 bg-gradient-to-r from-cyan-500 to-purple-600 w-full rounded-full mb-8'></div>
      <div className='min-h-screen p-8'>
        <div className='max-w-6xl mx-auto'>
          {/* Header */}
          <div className='text-center mb-12'>
            <h1 className='text-4xl font-bold text-white mb-4'>
              Shop for Games by Platform
            </h1>
            <p className='text-gray-400'>
              Select your gaming platform to browse games
            </p>
          </div>

          {/* Platform Boxes */}
          <div className='grid grid-cols-2 md:grid-cols-4 gap-6 mb-8'>
            {platforms.map(platform => (
              <div
                key={platform.id}
                onClick={() => handlePlatformClick(platform.id)}
                className='bg-gray-900 border-2 border-gray-700 hover:border-gray-500 rounded-lg p-6 cursor-pointer transition-all duration-300 hover:bg-gray-800'
              >
                <div className='text-center'>
                  <div className='text-4xl mb-3'>{platform.logo}</div>
                  <h3 className='text-white font-semibold text-lg mb-1'>
                    {platform.name}
                  </h3>
                  <p className='text-gray-400 text-sm'>{platform.fullName}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default GamePlatformSelector
