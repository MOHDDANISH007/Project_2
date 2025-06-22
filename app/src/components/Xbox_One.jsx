import React, { useEffect, useState } from 'react'
import { useData } from '../context/DataContext.jsx'
import { motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'

const XboxOne = () => {
  const [xboxGames, setXboxGames] = useState([])
  const { dataFromBackendForXboxOne, loading, setLoading } = useData()
  const location = useLocation()
  const query = new URLSearchParams(location.search)
    .get('query')
    ?.trim()
    .toLowerCase()

  useEffect(() => {
    const fetchGames = async () => {
      setLoading(true)
      const data = await dataFromBackendForXboxOne()
      console.log('Xbox One Games:', data)
      if (data?.xboxOnes) {
        setXboxGames(data.xboxOnes)
      }
      setLoading(false)
    }

    fetchGames()
  }, [])

  const filterData = xboxGames.filter(game => {
    const name = game?.game_name?.toLowerCase().replace(/\s+/g, '')
    const search = query?.replace(/\s+/g, '')
    return name && search && name.includes(search)
  })

  const displayGames = query ? filterData : xboxGames

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center text-white'>
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
      <div className='text-white px-4 py-6'>
        <h1 className='text-3xl underline p-2 font-bold mb-4'>
          Xbox One Games
        </h1>

        <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {displayGames.map(game => (
            <Link key={game.game_id} to={`/games/xboxOne/${game.game_id}`}>
              <li className='bg-gray-800 p-4 rounded shadow cursor-pointer hover:bg-gray-700 transition'>
                <img
                  src={game.image_link || '/fallback.jpg'}
                  alt={game.game_name || 'Game Image'}
                  width={300}
                  height={200}
                  className='w-full h-48 object-cover rounded mb-3'
                />
                <h2 className='text-lg font-semibold mb-2 line-clamp-2'>
                  {game.game_name}
                </h2>
                <p className='text-yellow-400 font-bold text-xl'>
                  ₹{game.price_inr}
                </p>
              </li>
            </Link>
          ))}
        </ul>

        {query && filterData.length === 0 && (
          <p className='text-white text-xl font-semibold text-center mt-6'>
            No game found by this name.
          </p>
        )}
      </div>
    </motion.div>
  )
}

export default XboxOne
