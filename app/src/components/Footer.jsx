import React from 'react'
import {
  Heart,
  Github,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  GamepadIcon,
  Zap,
  Shield,
  Trophy
} from 'lucide-react'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const GamingFooter = () => {
  const currentYear = new Date().getFullYear()
  const [Subscribe, setSubscribe] = useState(false)

  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Mail, href: '#', label: 'Email' }
  ]
  const handleSubscribe = () => {
    setSubscribe(true)
  }

  const quickLinks = [
    { name: 'Home', href: '#' },
    { name: 'Games', href: '#' },
    { name: 'Tournaments', href: '#' },
    { name: 'Leaderboard', href: '#' },
    { name: 'Community', href: '#' }
  ]

  const gameCategories = [
    { name: 'Action', href: '#' },
    { name: 'Adventure', href: '#' },
    { name: 'RPG', href: '#' },
    { name: 'Strategy', href: '#' },
    { name: 'Sports', href: '#' }
  ]

  return (
    <motion.div>
      <AnimatePresence>
        {Subscribe && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-70 z-50 p-4'
          >
            <div className='bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full'>
              <h2 className='text-2xl font-bold text-cyan-400 mb-4'>
                Thank You for Subscribing!
              </h2>
              <p className='text-white mb-4'>
                {' '}
                You have successfully subscribed to our newsletter. Stay tuned
                for the latest gaming news and updates!
              </p>
              <button
                onClick={() => setSubscribe(false)}
                className='bg-cyan-400 text-white px-4 py-2 rounded-lg hover:bg-cyan-500 transition-colors'
              >
                Close
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className='bg-black text-white relative overflow-hidden'>
        {/* Animated background elements */}
        <div className='absolute inset-0 opacity-10'>
          <div className='absolute top-10 left-10 animate-pulse'>
            <GamepadIcon size={40} className='text-cyan-400' />
          </div>
          <div className='absolute top-20 right-20 animate-bounce'>
            <Zap size={30} className='text-yellow-400' />
          </div>
          <div className='absolute bottom-20 left-1/4 animate-pulse'>
            <Shield size={35} className='text-purple-400' />
          </div>
          <div className='absolute bottom-32 right-1/3 animate-bounce'>
            <Trophy size={32} className='text-orange-400' />
          </div>
        </div>

        {/* Glowing top border */}
        <div className='h-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 animate-pulse'></div>

        <div className='relative z-10 max-w-7xl mx-auto px-6 py-12'>
          {/* Main footer content */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12'>
            {/* Brand section */}
            <div className='space-y-4'>
              <div className='flex items-center space-x-2'>
                <GamepadIcon className='text-cyan-400' size={32} />
                <h3 className='text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent'>
                  GameHub
                </h3>
              </div>
              <p className='text-gray-400 text-sm leading-relaxed'>
                Your ultimate gaming destination. Discover, play, and compete in
                the most exciting games with players worldwide.
              </p>
              <div className='flex space-x-4'>
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className='p-2 bg-gray-800 rounded-lg hover:bg-gradient-to-r hover:from-cyan-500 hover:to-purple-600 transition-all duration-300 transform hover:scale-110 group'
                    aria-label={social.label}
                  >
                    <social.icon
                      size={20}
                      className='group-hover:text-white transition-colors'
                    />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className='space-y-4'>
              <h4 className='text-lg font-semibold text-cyan-400 flex items-center'>
                <Zap size={18} className='mr-2' />
                Quick Links
              </h4>
              <ul className='space-y-2'>
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className='text-gray-400 hover:text-cyan-400 transition-colors duration-300 text-sm hover:translate-x-1 transform inline-block'
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Game Categories */}
            <div className='space-y-4'>
              <h4 className='text-lg font-semibold text-purple-400 flex items-center'>
                <Shield size={18} className='mr-2' />
                Categories
              </h4>
              <ul className='space-y-2'>
                {gameCategories.map((category, index) => (
                  <li key={index}>
                    <a
                      href={category.href}
                      className='text-gray-400 hover:text-purple-400 transition-colors duration-300 text-sm hover:translate-x-1 transform inline-block'
                    >
                      {category.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div className='space-y-4'>
              <h4 className='text-lg font-semibold text-pink-400 flex items-center'>
                <Trophy size={18} className='mr-2' />
                Stay Updated
              </h4>
              <p className='text-gray-400 text-sm'>
                Get the latest gaming news and updates delivered to your inbox.
              </p>
              <div className='space-y-2'>
                <input
                  type='email'
                  placeholder='Enter your email'
                  className='w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-sm transition-all duration-300'
                />
                <button
                  onClick={handleSubscribe}
                  className='w-full px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg hover:from-cyan-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 text-sm font-medium'
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className='border-t border-gray-800 mb-8'></div>

          {/* Bottom section */}
          <div className='flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0'>
            <div className='text-gray-400 text-sm'>
              © {currentYear} GameHub. All rights reserved.
            </div>

            {/* Made with love section */}
            <div className='flex items-center space-x-2 text-sm'>
              <span className='text-gray-400'>Made with</span>
              <Heart
                size={16}
                className='text-red-500 animate-pulse fill-current'
              />
              <span className='text-gray-400'>by</span>
              <span className='font-semibold bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-pulse'>
                Mohammad Danish
              </span>
            </div>

            <div className='flex space-x-6 text-xs text-gray-500'>
              <a href='#' className='hover:text-cyan-400 transition-colors'>
                Privacy Policy
              </a>
              <a href='#' className='hover:text-cyan-400 transition-colors'>
                Terms of Service
              </a>
              <a href='#' className='hover:text-cyan-400 transition-colors'>
                Support
              </a>
            </div>
          </div>
        </div>

        {/* Animated glow effect */}
        <div className='absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse opacity-50'></div>
      </footer>
    </motion.div>
  )
}

export default GamingFooter
