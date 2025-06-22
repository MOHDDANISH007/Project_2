import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const BASE_URL = 'https://project-2-backend-1hun.onrender.com' // Make sure this matches your backend URL

  // Load user on mount
  useEffect(() => {
    const verifyUser = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/authentication/profile`, {
          withCredentials: true
        })
        setUser(response.data)
      } catch (err) {
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    verifyUser()
  }, [])

  // Login function
  const login = async (email, password) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/authentication/login`,
        { userEmail: email, userPassword: password },
        { withCredentials: true }
      )

      setUser(response.data.user)
      return response.data
    } catch (err) {
      throw new Error(err.response?.data?.error || 'Login failed')
    }
  }

  // Signup function
  const signup = async (name, email, password) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/authentication/signup`,
        { userName: name, userEmail: email, userPassword: password },
        { withCredentials: true }
      )

      setUser(response.data.user)
      return response.data
    } catch (err) {
      throw new Error(err.response?.data?.error || 'Signup failed')
    }
  }

  // Logout function
  const logout = async () => {
    try {
      await axios.post(
        `${BASE_URL}/authentication/logout`,
        {},
        { withCredentials: true }
      )
      setUser(null)
      navigate('/login')
    } catch (err) {
      console.error('Logout error:', err)
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
