import express from 'express'
import mongoose from 'mongoose'

import ps4Games from '../models/gamesSchema/ps4GamesSchema.js'
import ps5Games from '../models/gamesSchema/ps5GamesSchema.js'
import xboxOneGames from '../models/gamesSchema/xboxOneGamesSchema.js'
import xboxXGames from '../models/gamesSchema/xboxXGamesSchema.js'
import consoles from '../models/consoleSchema/consoleSchema.model.js'

const router = express.Router()

// GET PS4 game by ID
// GET PS4 game by game_id (number)
router.get('/ps4/:id', async (req, res) => {
  try {
    const gameId = Number(req.params.id) // convert string param to number

    if (isNaN(gameId)) {
      return res.status(400).json({ error: 'Invalid game ID format' })
    }

    const game = await ps4Games.findOne({ game_id: gameId })
    if (!game) {
      return res.status(404).json({ error: 'Game not found' })
    }

    res.json({
      message: 'PS4 page working!',
      game
    })
  } catch (error) {
    console.error('Error fetching PS4 game:', error)
    res.status(500).json({ error: 'Server error while fetching data' })
  }
})

// The rest of your placeholder routes are fine
router.get('/ps5/:id', async (req, res) => {
  try {
    const gameId = Number(req.params.id) // convert string param to number
    if (isNaN(gameId)) {
      return res.status(400).json({ error: 'Invalid game ID format' })
    }
    const game = await ps5Games.findOne({ game_id: gameId })
    if (!game) {
      return res.status(404).json({ error: 'Game not found' })
    }
    res.json({
      message: 'PS5 page working!',
      game
    })
  } catch (error) {
    console.error('Error fetching PS5 data:', error)
    res.status(500).json({ error: 'Server error while fetching data' })
  }
})

router.get('/xboxone/:id', async (req, res) => {
  try {
    const gameId = Number(req.params.id) // convert string param to number
    if (isNaN(gameId)) {
      return res.status(400).json({ error: 'Invalid game ID format' })
    }
    const game = await xboxOneGames.findOne({ game_id: gameId })
    if (!game) {
      return res.status(404).json({ error: 'Game not found' })
    }
    res.json({
      message: 'Xbox One page working!',
      game
    })
  } catch (error) {
    console.error('Error fetching Xbox One data:', error)
    res.status(500).json({ error: 'Server error while fetching data' })
  }
})

router.get('/xboxx/:id', async (req, res) => {
  try {
    const gameId = Number(req.params.id) // convert string param to number
    if (isNaN(gameId)) {
      return res.status(400).json({ error: 'Invalid game ID format' })
    }
    const game = await xboxXGames.findOne({ game_id: gameId })
    if (!game) {
      return res.status(404).json({ error: 'Game not found' })
    }
    res.json({
      message: 'Xbox X page working!',
      game
    })
  } catch (error) {
    console.error('Error fetching Xbox X data:', error)
    res.status(500).json({ error: 'Server error while fetching data' })
  }
})

router.get('/consoles/:id', async (req, res) => {
  try {
    const consoleId = Number(req.params.id) // convert string param to number
    if (isNaN(consoleId)) {
      return res.status(400).json({ error: 'Invalid console ID format' })
    }
    const game = await consoles.findOne({ console_id: consoleId })
    if (!game) {
      return res.status(404).json({ error: 'Console not found' })
    }
    return res.json({
      message: 'Consoles page working!',
      game
    })
  } catch (error) {
    console.error('Error fetching consoles data:', error)
    res.status(500).json({ error: 'Server error while fetching data' })
  }
})

export default router
