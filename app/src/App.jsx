import { Outlet } from 'react-router-dom'
import Header from './components/NavBar.jsx'
import './App.css'
import { motion } from 'framer-motion'

const App = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }} // ✅ Fixed: added missing `}` and `)`
    >
      {/* <Header /> */}
      <div>
        <Header />
        <div className='bg-[rgb(18, 19, 18)]'>
          <Outlet />
        </div>
      </div>
    </motion.div>
  )
}

export default App
