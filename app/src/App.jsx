import { Outlet, useLocation } from 'react-router-dom'
import Header from './components/NavBar.jsx'
import './App.css'
import { motion } from 'framer-motion'
import GamingFooter from './components/Footer.jsx'
import FAQ from './components/FAQ_Content.jsx'
import BoxDesign from './components/Box_Design.jsx'

const App = () => {
  const location = useLocation();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div>
        <Header />
        <div className='bg-[rgb(18, 19, 18)]'>
          <Outlet />
        </div>

        {/* ✅ This will now react to navigation without reload */}
        {location.pathname === '/' && (
          <div>
            <BoxDesign />
            <FAQ />
            <GamingFooter />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default App;
