import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import User from '../models/userAuthentication/user.model.js'

// Configure environment variables
dotenv.config({ path: '../.env' })

const router = express.Router()

// Helper function to set secure cookie
const setAuthCookie = (res, token) => {
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    maxAge: 24 * 60 * 60 * 1000, // 1 day
    path: '/'
  })
}

// Input validation middleware
const validateSignupInput = (req, res, next) => {
  const { userName, userEmail, userPassword } = req.body
  if (!userName || !userEmail || !userPassword) {
    return res.status(400).json({
      error: 'All fields are required (userName, userEmail, userPassword)'
    })
  }
  next()
}

// Signup route
router.post('/signup', validateSignupInput, async (req, res) => {
  const { userName, userEmail, userPassword } = req.body

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ userEmail })
    if (existingUser) {
      return res.status(409).json({ error: 'User already exists' })
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(userPassword, salt)

    // Create new user
    const user = new User({
      userName,
      userEmail,
      userPassword: hashedPassword
    })

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    })

    user.token = token
    await user.save()

    // Set secure cookie
    setAuthCookie(res, token)

    // Return success response without sensitive data
    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: user._id,
        userName: user.userName,
        userEmail: user.userEmail
      }
    })
  } catch (err) {
    console.error('Signup error:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Login route
router.post('/login', async (req, res) => {
  const { userEmail, userPassword } = req.body

  if (!userEmail || !userPassword) {
    return res.status(400).json({
      error: 'Email and password are required'
    })
  }

  try {
    // Find user by email
    const user = await User.findOne({ userEmail })
    if (!user) {
      return res.status(401).json({
        error: 'Invalid credentials'
      })
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(userPassword, user.userPassword)
    if (!isMatch) {
      return res.status(401).json({
        error: 'Invalid credentials'
      })
    }

    // Generate new token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    })

    // Update user token in database
    user.token = token
    await user.save()

    // Set secure cookie
    setAuthCookie(res, token)

    // Return success response
    res.status(200).json({
      message: 'User logged in successfully',
      user: {
        id: user._id,
        userName: user.userName,
        userEmail: user.userEmail
      }
    })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({
      error: 'Internal server error'
    })
  }
})

// Logout route
router.post('/logout', (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    path: '/'
  })

  // Additional headers for CORS if needed
  res.header('Access-Control-Allow-Credentials', 'true')
  res.header('Access-Control-Allow-Origin', req.headers.origin || '*')

  res.status(200).json({ message: 'User logged out successfully' })
})

// Protected route example
router.get('/profile', async (req, res) => {
  try {
    const token = req.cookies.token
    if (!token) {
      return res.status(401).json({
        error: 'Not authorized'
      })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(decoded.id).select('-userPassword -token')

    if (!user) {
      return res.status(404).json({
        error: 'User not found'
      })
    }

    res.status(200).json(user)
  } catch (error) {
    console.error('Profile error:', error)
    res.status(500).json({
      error: 'Internal server error'
    })
  }
})

// Check authentication status
// This route checks if the user is authenticated by verifying the JWT token
router.get('/check', (req, res) => {
  const token = req.cookies.token

  if (!token) {
    return res.status(200).json({ authenticated: false })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    return res.status(200).json({ authenticated: true, userId: decoded })
  } catch (err) {
    return res.status(200).json({ authenticated: false })
  }
})

export default router
