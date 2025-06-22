import { createContext, useContext, useState } from 'react'
import axios from 'axios'

const DataContext = createContext()

export const DataProvider = ({ children }) => {
  const [loading, setLoading] = useState(false)
  // const BASE_URL = 'http://localhost:5000'
  const BASE_URL = 'https://project-2-backend-1hun.onrender.com'

  const dataFromBackendForPS4 = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/ps4`)
      return res.data
    } catch (error) {
      console.error('Error fetching ps4 data:', error)
      return null
    }
  }

  const dataFromBackendForPS5 = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/ps5`)
      return res.data
    } catch (error) {
      console.error('Error fetching ps5 data:', error)
      return null
    }
  }

  const dataFromBackendForXboxOne = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/xboxOne`)
      return res.data
    } catch (error) {
      console.error('Error fetching Xbox One data:', error)
      return null
    }
  }

  const dataFromBackendForxboxX = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/xboxX`)
      return res.data
    } catch (error) {
      console.error('Error fetching Xbox Series X data:', error)
      return null
    }
  }

  const dataFromBackendForConsoles = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/products`)
      return res.data
    } catch (error) {
      console.error('Error fetching console data:', error)
      return null
    }
  }

  return (
    <DataContext.Provider
      value={{
        loading,
        setLoading,
        dataFromBackendForPS4,
        dataFromBackendForPS5,
        dataFromBackendForXboxOne, // ✅ fixed naming
        dataFromBackendForxboxX, // ✅ fixed naming
        dataFromBackendForConsoles
      }}
    >
      {children}
    </DataContext.Provider>
  )
}

// ✅ Exported hook with correct name
export const useData = () => useContext(DataContext)
