import express from 'express'
import authenticateUser from '../middleware/auth.middleware.js'
import User from '../models/userAuthentication/user.model.js'
import ps4GamesSchema from '../models/gamesSchema/ps4GamesSchema.js'
import ps5GamesSchema from '../models/gamesSchema/ps5GamesSchema.js'
import xboxXGamesSchema from '../models/gamesSchema/xboxXGamesSchema.js'
import xboxoneGamesSchema from '../models/gamesSchema/xboxOneGamesSchema.js'
import generateAIResponse, { withoutGameData } from '../services/ai.service.js'
import ChatHistory from '../models/AI_Model/ai.model.js'

const router = express.Router()

router.post('/post', authenticateUser, async (req, res) => {
  try {
    const userId = req.user?.id
    const userQuery = req.body.query

    if (!userId || !userQuery || typeof userQuery !== 'string') {
      return res.status(400).json({ message: 'Invalid user or query.' })
    }

    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ message: 'User not found.' })
    }

    const userName = user.userName
    const searchTerm = userQuery.toLowerCase().trim()

    const [ps4Games, ps5Games, xboxXGames, xboxOneGames] = await Promise.all([
      ps4GamesSchema
        .find({}, { base_name: 1, game_id: 1, platform: 1, _id: 0 })
        .lean(),
      ps5GamesSchema
        .find({}, { base_name: 1, game_id: 1, platform: 1, _id: 0 })
        .lean(),
      xboxXGamesSchema
        .find({}, { base_name: 1, game_id: 1, platform: 1, _id: 0 })
        .lean(),
      xboxoneGamesSchema
        .find({}, { base_name: 1, game_id: 1, platform: 1, _id: 0 })
        .lean()
    ])

    const filterGames = games =>
      games.filter(game => game.base_name?.toLowerCase().includes(searchTerm))

    const ps4Filtered = filterGames(ps4Games)
    const ps5Filtered = filterGames(ps5Games)
    const xboxOneFiltered = filterGames(xboxOneGames)
    const xboxXFiltered = filterGames(xboxXGames)

    let platform = null
    let filtered = []
    let aiResponse = ''

    if (ps4Filtered.length) {
      platform = 'ps4'
      filtered = ps4Filtered
      aiResponse = await generateAIResponse(userQuery, filtered, userName)
    } else if (ps5Filtered.length) {
      platform = 'ps5'
      filtered = ps5Filtered
      aiResponse = await generateAIResponse(userQuery, filtered, userName)
    } else if (xboxOneFiltered.length) {
      platform = 'xboxOne'
      filtered = xboxOneFiltered
      aiResponse = await generateAIResponse(userQuery, filtered, userName)
    } else if (xboxXFiltered.length) {
      platform = 'xboxX'
      filtered = xboxXFiltered
      aiResponse = await generateAIResponse(userQuery, filtered, userName)
    } else {
      // If no games matched, respond using general AI
      aiResponse = await withoutGameData(userQuery, userName)
      await ChatHistory.findOneAndUpdate(
        { userId },
        {
          $push: {
            messages: {
              timestamp: new Date(),
              query: userQuery,
              aiResponse
            }
          }
        },
        { upsert: true, new: true }
      )
      return res.status(200).json({
        message: 'No matching games found.',
        searchTerm,
        aiResponse
      })
    }

    // Save matched game response
    await ChatHistory.findOneAndUpdate(
      { userId },
      {
        $push: {
          messages: {
            timestamp: new Date(),
            query: userQuery,
            aiResponse
          }
        }
      },
      { upsert: true, new: true }
    )
    const availableGame = []

    if (platform === 'ps4') {
      availableGame.push(...ps4Filtered)
    } else if (platform === 'ps5') {
      availableGame.push(...ps5Filtered)
    } else if (platform === 'xboxOne') {
      availableGame.push(...xboxOneFiltered)
    } else if (platform === 'xboxX') {
      availableGame.push(...xboxXFiltered)
    }

    return res.status(200).json({
      message: `Match found in ${platform.toUpperCase()} games.`,
      platform,
      searchTerm,
      filteredGames: filtered,
      availableGame,
      aiResponse
    })
  } catch (error) {
    console.error('Error in /post route:', error)
    return res.status(500).json({
      message: 'Internal server error',
      error: error.message
    })
  }
})

// chat history
router.get('/chatHistory/:id', authenticateUser, async (req, res) => {
  try {
    const userId = req.params.id
    const userHistory = await ChatHistory.findOne({ userId })

    if (!userHistory) {
      return res
        .status(404)
        .json({ message: 'User not found', userHistory: [] })
    }

    return res.status(200).json({
      message: 'Chat history found',
      userHistory
    })
  } catch (error) {
    console.error('Error in GET /chatHistory:', error)
    return res.status(500).json({
      message: 'Internal server error',
      error: error.message
    })
  }
})

export default router
