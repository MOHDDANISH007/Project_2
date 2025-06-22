// pages/GameDetailsPage.js
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { motion } from 'framer-motion'
import TabNavigation from '../components/TabNavigation'
import GameOverview from '../components/GameOverview'
import GameDetails from '../components/GameDetails'
import GameFAQ from '../components/GameFAQ'
import SimilarGames from '../components/SimilarGames'
import LoadingSpinner from '../components/LoadingSpinner'
import { FaPlus, FaShoppingCart } from 'react-icons/fa'

const GameDetailsPage = () => {
  const { platform, id } = useParams()
  const [activeTab, setActiveTab] = useState('Overview')
  const [game, setGame] = useState(null)
  const [loading, setLoading] = useState(false)
  const [youtubeLink, setYoutubeLink] = useState('')
  const BASE_URL = 'http://localhost:5000'  // ✅ Use HTTP (not HTTPS)

  console.log('Platform:', platform, 'ID:', id)

  const tabs = ['Overview', 'Details', 'FAQ', 'Similar Games']

  const getEmbedUrl = url => {
    try {
      const parsed = new URL(url)
      if (parsed.hostname === 'youtu.be') {
        return `https://www.youtube.com/embed/${parsed.pathname.slice(1)}`
      }
      if (
        parsed.hostname.includes('youtube.com') &&
        parsed.searchParams.has('v')
      ) {
        return `https://www.youtube.com/embed/${parsed.searchParams.get('v')}`
      }
      return null
    } catch {
      return null
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)

        const response = await axios.get(`${BASE_URL}/${platform}/${id}`)
        console.log('Fetched game details:', response.data)
        console.log('Response data:', response.data)
        const details = response.data[`${platform}Details`]
        setGame(details)
        setYoutubeLink(getEmbedUrl(details.trailerVideo))
      } catch (err) {
        console.error('Error fetching game details:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [id, platform])

  if (loading || !game) {
    return <LoadingSpinner />
  }

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'Overview':
        return (
          <GameOverview
            game={game}
            youtubeLink={youtubeLink}
            platform={platform}
            id={id}
          />
        )
      case 'Details':
        return <GameDetails game={game} />
      case 'FAQ':
        return <GameFAQ faqs={game.faqs} />
      case 'Similar Games':
        return <SimilarGames games={game.similarProducts} platform={platform} />
      default:
        return (
          <GameOverview
            game={game}
            youtubeLink={youtubeLink}
            platform={platform}
            id={id}
          />
        )
    }
  }

  return (
    <motion.div>
      <div className='min-h-screen bg-gradient-to-br p-4 from-slate-900 via-purple-900 to-slate-900'>
        <TabNavigation
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        {renderActiveTab()}
      </div>
    </motion.div>
  )
}

export default GameDetailsPage
