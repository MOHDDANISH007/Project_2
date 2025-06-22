import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useData } from '../context/DataContext'
import { useAuth } from '../context/AuthContext'
import { motion, AnimatePresence } from 'framer-motion'
import axios from 'axios'

const HomeContent = () => {
  // Context hooks
  const { dataFromBackendForxboxX } = useData()
  const { login } = useAuth()

  // State management
  const [games, setGames] = useState([])
  const [cookie, setCookie] = useState(false)
  const [showLoginPopup, setShowLoginPopup] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Router hooks
  const location = useLocation()
  const navigate = useNavigate()

  // const BASE_URL = 'http://localhost:5000'
  const BASE_URL = 'https://project-2-backend-1hun.onrender.com'

  // Get search query from URL
  const query = new URLSearchParams(location.search)
    .get('query')
    ?.trim()
    .toLowerCase()

  // Fetch games data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await dataFromBackendForxboxX()
        if (Array.isArray(res.xboxXs)) {
          setGames(res.xboxXs)
        }
      } catch (err) {
        console.error('Error fetching games:', err)
      }
    }
    fetchData()
  }, [dataFromBackendForxboxX])

  // Check authentication cookie
  useEffect(() => {
    const checkCookie = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/authentication/check`, {
          withCredentials: true
        })
        setCookie(res.data.authenticated)
        if (!res.data.authenticated) {
          setTimeout(() => setShowLoginPopup(true), 2000)
        }
      } catch (err) {
        console.error('Error checking auth:', err)
        setCookie(false)
        setTimeout(() => setShowLoginPopup(true), 2000)
      }
    }
    checkCookie()
  }, [])

  // Handle login form submission
  const handleSubmit = async e => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await login(email, password)
      setShowLoginPopup(false)
      window.location.reload()
    } catch (error) {
      console.error('Login error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Filter games based on search query
  const filteredGames = query
    ? games.filter(game => {
        const gameName = game?.game_name?.toLowerCase().replace(/\s+/g, '')
        const searchQuery = query?.replace(/\s+/g, '')
        return gameName && searchQuery && gameName.includes(searchQuery)
      })
    : games

  return (
    <div className='home-content'>
      {/* Main content with animation */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        className='game-list-container'
      >
        <div className='text-white px-4 py-6'>
          <h1 className='text-3xl underline p-2 font-bold mb-4'>
            Xbox Series X Games
          </h1>

          {/* Games grid */}
          <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
            {filteredGames.map(game => (
              <li
                key={game.game_id}
                className='game-card bg-gray-800 p-4 rounded shadow cursor-pointer hover:bg-gray-700 transition'
                onClick={() => navigate(`/games/xboxX/${game.game_id}`)}
              >
                <div>
                  <img
                    src={game.image_link || '/fallback.jpg'}
                    alt={game.game_name || 'Game Image'}
                    className='game-image w-full h-48 object-cover rounded mb-3'
                    onError={e => {
                      e.target.src = '/fallback.jpg'
                    }}
                  />
                  <h2 className='game-title text-lg font-semibold mb-2 line-clamp-2'>
                    {game.game_name}
                  </h2>
                  <p className='game-price text-yellow-400 font-bold text-xl'>
                    ₹{game.price_inr}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          {/* No results message */}
          {query && filteredGames.length === 0 && (
            <p className='no-results text-white text-xl font-semibold text-center mt-6'>
              No game found by this name.
            </p>
          )}
        </div>
      </motion.div>

      {/* Login Popup */}
      <AnimatePresence>
        {showLoginPopup && !cookie && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='login-popup-overlay fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4'
            onClick={() => setShowLoginPopup(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className='login-popup bg-gradient-to-br from-gray-900 to-black border border-gray-700 rounded-2xl p-6 sm:p-8 w-full max-w-md relative'
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => setShowLoginPopup(false)}
                className='close-button absolute top-4 right-4 text-gray-400 hover:text-white transition-colors'
                aria-label='Close login popup'
              >
                ✕
              </button>

              <div className='login-header text-center mb-6'>
                <h2 className='text-2xl font-bold text-white mb-2'>
                  Welcome Back!
                </h2>
                <p className='text-gray-400'>
                  Sign in to access exclusive features
                </p>
              </div>

              <form onSubmit={handleSubmit} className='login-form space-y-4'>
                <div className='form-group'>
                  <input
                    type='email'
                    placeholder='Email address'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className='w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500'
                    required
                  />
                </div>

                <div className='form-group relative'>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder='Password'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className='w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500'
                    required
                  />
                  <button
                    type='button'
                    onClick={() => setShowPassword(!showPassword)}
                    className='password-toggle absolute right-3 top-3 text-gray-400'
                    aria-label={
                      showPassword ? 'Hide password' : 'Show password'
                    }
                  >
                    {showPassword ? '👁️' : '🙈'}
                  </button>
                </div>

                <button
                  type='submit'
                  disabled={isLoading}
                  className='login-button w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl shadow-lg hover:scale-105 transition disabled:opacity-50'
                >
                  {isLoading ? 'Signing in...' : 'Sign In'}
                </button>
              </form>

              <div className='signup-link text-center mt-6'>
                <p className='text-gray-400 text-sm'>
                  Don't have an account?{' '}
                  <span
                    className='text-purple-400 hover:text-purple-300 cursor-pointer'
                    onClick={() => navigate('/signup')}
                  >
                    Sign up
                  </span>
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default HomeContent
