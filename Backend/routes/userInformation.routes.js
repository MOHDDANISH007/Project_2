import express from 'express'
import userDB from '../models/userAuthentication/user.model.js'
import authenticateUser from '../middleware/auth.middleware.js'

const router = express.Router()

// user information routes

router.get('/user-info', authenticateUser, async (req, res) => {
  try {
    const userId = req.user.id
    const user = await userDB.findById(userId)
    console.log("User Data from the user info route is : ", user)
    if (!user) return res.status(404).json({ error: 'User not found' })
    res.json({ message: 'User info retrieved!', userInfo: user })
  } catch (err) {
    console.error('Error fetching user info:', err)
    res.status(500).json({ error: 'Server error while fetching data' })
  }
})

export default router
