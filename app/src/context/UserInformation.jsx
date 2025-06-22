import React, { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

export const UserInformationContext = createContext()
// const BASE_URL = 'http://localhost:5000'
const BASE_URL = 'https://project-2-backend-1hun.onrender.com'

export const UserInformationProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false)
  const [userInfo, setUserInfo] = useState(null)
  const [loading, setLoading] = useState(true) // Add loading state

  // Clear user data function
  const clearUser = () => {
    setLoggedIn(false)
    setUserInfo(null)
  }

  // Check authentication status
  const checkAuthStatus = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/authentication/check`, {
        withCredentials: true
      })

      setLoggedIn(res.data.authenticated)
      if (!res.data.authenticated) {
        clearUser()
      }
      return res.data.authenticated
    } catch (err) {
      console.error('Error checking auth:', err)
      clearUser()
      return false
    } finally {
      setLoading(false)
    }
  }

  // Fetch user information
  const fetchUserInfo = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/userInformation/user-info`, {
        withCredentials: true
      })

      if (res.data?.userInfo) {
        setUserInfo(res.data.userInfo)
      }
    } catch (err) {
      console.error('Error fetching user info:', err)
      setUserInfo(null)
    }
  }

  // Logout function
  const logout = async () => {
    try {
      await axios.post(
        `${BASE_URL}/authentication/logout`,
        {},
        {
          withCredentials: true
        }
      )
      clearUser()
      return true
    } catch (err) {
      console.error('Logout error:', err)
      return false
    }
  }

  // Initial load
  useEffect(() => {
    const initializeAuth = async () => {
      const isAuthenticated = await checkAuthStatus()
      if (isAuthenticated) {
        await fetchUserInfo()
      }
    }

    initializeAuth()
  }, [])

  // Value to provide to consumers
  const contextValue = {
    loggedIn,
    userInfo,
    loading,
    logout,
    refreshUserInfo: fetchUserInfo,
    checkAuthStatus
  }

  return (
    <UserInformationContext.Provider value={contextValue}>
      {children}
    </UserInformationContext.Provider>
  )
}

export const useUserInformation = () => {
  const context = useContext(UserInformationContext)
  if (!context) {
    throw new Error(
      'useUserInformation must be used within a UserInformationProvider'
    )
  }
  return context
}
