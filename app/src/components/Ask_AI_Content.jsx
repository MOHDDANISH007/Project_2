import React, { useContext, useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import remarkGfm from 'remark-gfm'
import 'highlight.js/styles/github-dark.css'
import { motion, AnimatePresence } from 'framer-motion'
import { IoGameController } from 'react-icons/io5'
import {
  Search,
  Send,
  History,
  ChevronDown,
  ChevronUp,
  Clock,
  User,
  Bot,
  Trash2,
  RefreshCw
} from "lucide-react";
import axios from 'axios'
import ProductCard from './ProductCard'
import { UserInformationContext } from '../context/UserInformation'

const AskAIPage = () => {
  const { userInfo, loggedIn } = useContext(UserInformationContext)

  const [messages] = useState([
    {
      id: 1,
      type: 'ai',
      content:
        '🎮 Welcome to AI Game Assistant! \n\nBefore we start, let me guide you on how to get the best help:',
      navigationGuide: {
        title: '📋 How to Use This Assistant',
        description:
          "I can help you in TWO different ways. Choose the approach that matches what you're looking for:",
        routes: [
          {
            number: '1️⃣',
            title: 'Ask About ANY Game',
            subtitle: 'General Gaming Questions & Advice',
            description:
              'Perfect for getting information about games from anywhere - not just our platform',
            useCases: [
              '• Get reviews and ratings for any game',
              '• Ask for gaming recommendations',
              '• Learn about game genres and mechanics',
              '• Get gaming tips and strategies',
              '• Compare different games'
            ],
            examples: [
              'What is Elden Ring about?',
              'Best horror games of 2024?',
              'How to get better at FPS games?'
            ],
            promptTemplate:
              "💬 Example: 'Tell me about [Any Game Name]' or 'What are the best [Genre] games?'"
          },
          {
            number: '2️⃣',
            title: 'Check Our Platform',
            subtitle: 'Platform Availability & Catalog Search',
            description:
              'Specifically check if games are available on OUR platform and get platform-specific details',
            useCases: [
              '• Check if a specific game is available here',
              "• Browse our platform's game catalog",
              '• Get platform-specific pricing and details',
              '• Find platform exclusives',
              "• See what's trending on our platform"
            ],
            examples: [
              'Is Minecraft available on your platform?',
              'Show me your RPG games',
              "What's the price of Cyberpunk 2077 here?"
            ],
            promptTemplate:
              "🔍 Example: 'Give the only name of game which you want to check on our platform [Game Name] . Example => GTA 5'"
          }
        ]
      }
    }
  ])

  const [games, setGames] = useState([])
  const [rootSlug, setRootSlug] = useState('')
  const [id, setId] = useState('')
  const [products, setProducts] = useState({})
  const [query, setQuery] = useState('')
  const [aiResponse, setAiResponse] = useState('')
  const [userID, setUserID] = useState('')
  const [userHistory, setUserHistory] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [loading, setLoading] = useState(false)
  const BASE_URL = 'https://project-2-backend-1hun.onrender.com'
  // New state for history section
  const [showHistory, setShowHistory] = useState(false)
  const [selectedHistoryItem, setSelectedHistoryItem] = useState(null)
  const [isLoadingHistory, setIsLoadingHistory] = useState(false)

  useEffect(() => {
    if (rootSlug === 'xbox_one') {
      setRootSlug('xboxone')
    } else if (rootSlug === 'xbox_x') {
      setRootSlug('xboxx')
    }
  }, [rootSlug])

  useEffect(() => {
    if (loggedIn && userInfo?._id) {
      setUserID(userInfo._id)
    }
  }, [userInfo, loggedIn])

  useEffect(() => {
    if (!rootSlug || !id) return
    const fetchDetails = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}/productsItems/${rootSlug}/${id}`
        )
        setProducts(res.data.game)
      } catch (err) {
        console.error('Error fetching game details:', err)
      }
    }
    fetchDetails()
  }, [rootSlug, id])

  useEffect(() => {
    if (!userID) return
    const fetchHistory = async () => {
      setIsLoadingHistory(true)
      try {
        const res = await fetch(`${BASE_URL}/askAI/chatHistory/${userID}`, {
          method: 'GET',
          credentials: 'include'
        })
        const json = await res.json()
        setUserHistory(json.userHistory?.messages || [])
      } catch (err) {
        console.error('Failed to fetch history:', err)
      } finally {
        setIsLoadingHistory(false)
      }
    }
    fetchHistory()
  }, [userID])

  const handleToSubmit = async () => {
    if (!query.trim()) return
    setIsLoading(true)
    try {
      const res = await fetch(`${BASE_URL}/askAI/post`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ query })
      })
      const data = await res.json()
      setAiResponse(data.aiResponse || '')
      setGames(data.availableGame || [])
      const first = data.availableGame?.[0]
      if (first?.platform && first?.game_id) {
        setRootSlug(first.platform.toLowerCase())
        setId(first.game_id)
      } else {
        setProducts({})
        setRootSlug('')
        setId('')
      }
      setUserHistory(prev => [
        ...prev,
        { type: 'user', query, timestamp: new Date().toISOString() },
        {
          type: 'ai',
          aiResponse: data.aiResponse,
          timestamp: new Date().toISOString()
        }
      ])
      setQuery('')
      const histRes = await fetch(`${BASE_URL}/askAI/chatHistory/${userID}`, {
        credentials: 'include'
      })
      const histJson = await histRes.json()
      setUserHistory(histJson.userHistory?.messages || [])
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const formatTimestamp = timestamp => {
    if (!timestamp) return 'Just now'
    const date = new Date(timestamp)
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const groupHistoryByDate = history => {
    const grouped = {}
    history.forEach((item, index) => {
      const date = item.timestamp
        ? new Date(item.timestamp).toDateString()
        : new Date().toDateString()
      if (!grouped[date]) grouped[date] = []
      grouped[date].push({ ...item, index })
    })
    return grouped
  }

  const clearHistory = async () => {
    if (!confirm('Are you sure you want to clear all chat history?')) return
    try {
      setUserHistory([])
    } catch (err) {
      console.error('Failed to clear history:', err)
    }
  }

  const refreshHistory = async () => {
    if (!userID) return
    setIsLoadingHistory(true)
    try {
      const res = await fetch(`${BASE_URL}/askAI/chatHistory/${userID}`, {
        credentials: 'include'
      })
      const json = await res.json()
      setUserHistory(json.userHistory?.messages || [])
    } catch (err) {
      console.error('Failed to refresh history:', err)
    } finally {
      setIsLoadingHistory(false)
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 1.5 }}
      className='bg-white text-black min-h-screen'
    >
      <div className='flex flex-col sm:flex-row justify-between items-center p-4 sm:p-6 gap-4'>
        <div className='flex flex-col sm:flex-row items-center gap-4'>
          <img
            src='/ai-assistant.png'
            className='w-16 h-16'
            alt='AI Assistant'
          />
          <div className='flex flex-col gap-2 text-center sm:text-left'>
            <h1 className='text-2xl sm:text-3xl font-bold'>
              GameNation AI Assistant
            </h1>
            <p className='text-base sm:text-lg'>
              Choose your assistance mode below
            </p>
          </div>
        </div>

        <div className='flex items-center gap-4'>
          <motion.button
            onClick={() => setShowHistory(!showHistory)}
            className='flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-full hover:from-purple-600 hover:to-indigo-700 transition-all shadow-lg'
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <History size={20} />
            <span className='font-medium'>Chat History</span>
            {showHistory ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </motion.button>

          <div className='flex border border-green-500 rounded-full px-4 py-2'>
            <div className='w-2 h-2 bg-green-500 rounded-full mr-2 mt-3'></div>
            <button className='text-green-500'>
              <span className='font-bold mr-2 text-xl'>online</span>
            </button>
          </div>
        </div>
      </div>

      <div className='opacity-50 bg-gradient-to-r from-indigo-500 to-purple-600 h-1'></div>

      <AnimatePresence>
        {showHistory && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className='bg-gradient-to-br from-gray-50 to-indigo-50 border-b border-gray-200'
          >
            <div className='max-w-6xl mx-auto p-4 sm:p-6'>
              <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6'>
                <div className='flex items-center gap-3'>
                  <div className='p-2 bg-purple-100 rounded-lg'>
                    <Clock className='text-purple-600' size={24} />
                  </div>
                  <div>
                    <h2 className='text-xl font-bold text-gray-900'>
                      Chat History
                    </h2>
                    <p className='text-sm text-gray-600'>
                      {userHistory.length} conversation
                      {userHistory.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                </div>

                <div className='flex gap-2'>
                  <button
                    onClick={refreshHistory}
                    disabled={isLoadingHistory}
                    className='flex items-center gap-2 px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50'
                  >
                    <RefreshCw
                      size={16}
                      className={isLoadingHistory ? 'animate-spin' : ''}
                    />
                    Refresh
                  </button>
                  <button
                    onClick={clearHistory}
                    className='flex items-center gap-2 px-3 py-2 text-sm bg-red-50 text-red-600 border border-red-200 rounded-lg hover:bg-red-100 transition-colors'
                  >
                    <Trash2 size={16} />
                    Clear All
                  </button>
                </div>
              </div>

              {isLoadingHistory ? (
                <div className='flex justify-center py-8'>
                  <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600'></div>
                </div>
              ) : userHistory.length === 0 ? (
                <div className='text-center py-12'>
                  <div className='mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4'>
                    <History className='text-gray-400' size={24} />
                  </div>
                  <h3 className='text-lg font-medium text-gray-900 mb-2'>
                    No chat history yet
                  </h3>
                  <p className='text-gray-600'>
                    Start a conversation to see your history here
                  </p>
                </div>
              ) : (
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
                  <div className='lg:col-span-1 bg-white rounded-xl shadow-sm border border-gray-200 p-4 max-h-96 overflow-y-auto'>
                    <h3 className='font-semibold text-gray-900 mb-3'>
                      Recent Conversations
                    </h3>
                    <div className='space-y-2'>
                      {Object.entries(groupHistoryByDate(userHistory)).map(
                        ([date, items]) => (
                          <div key={date}>
                            <p className='text-xs font-medium text-gray-500 mb-2 sticky top-0 bg-white py-1'>
                              {date === new Date().toDateString()
                                ? 'Today'
                                : date}
                            </p>
                            {items.map(item => (
                              <motion.div
                                key={item.index}
                                onClick={() => setSelectedHistoryItem(item)}
                                className={`p-3 rounded-lg cursor-pointer transition-all ${
                                  selectedHistoryItem?.index === item.index
                                    ? 'bg-purple-50 border border-purple-200'
                                    : 'bg-gray-50 hover:bg-gray-100'
                                }`}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                <div className='flex items-start gap-2'>
                                  <div
                                    className={`p-1 rounded ${
                                      item.type === 'user'
                                        ? 'bg-blue-100'
                                        : 'bg-green-100'
                                    }`}
                                  >
                                    {item.type === 'user' ? (
                                      <User
                                        size={12}
                                        className='text-blue-600'
                                      />
                                    ) : (
                                      <Bot
                                        size={12}
                                        className='text-green-600'
                                      />
                                    )}
                                  </div>
                                  <div className='flex-1 min-w-0'>
                                    <p className='text-sm text-gray-900 truncate'>
                                      {item.type === 'user'
                                        ? item.query
                                        : 'AI Response'}
                                    </p>
                                    <p className='text-xs text-gray-500'>
                                      {formatTimestamp(item.timestamp)}
                                    </p>
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  <div className='lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6'>
                    {selectedHistoryItem ? (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className='space-y-4'
                      >
                        <div className='flex items-center gap-3 pb-4 border-b border-gray-200'>
                          <div
                            className={`p-2 rounded-lg ${
                              selectedHistoryItem.type === 'user'
                                ? 'bg-blue-100'
                                : 'bg-green-100'
                            }`}
                          >
                            {selectedHistoryItem.type === 'user' ? (
                              <User className='text-blue-600' size={20} />
                            ) : (
                              <Bot className='text-green-600' size={20} />
                            )}
                          </div>
                          <div>
                            <h3 className='font-semibold text-gray-900'>
                              {selectedHistoryItem.type === 'user'
                                ? 'Your Question'
                                : 'AI Response'}
                            </h3>
                            <p className='text-sm text-gray-600'>
                              {formatTimestamp(selectedHistoryItem.timestamp)}
                            </p>
                          </div>
                        </div>

                        <div className='prose prose-slate max-w-none'>
                          {selectedHistoryItem.type === 'user' ? (
                            <div className='bg-blue-50 p-4 rounded-lg'>
                              <p className='text-gray-800 font-medium'>
                                {selectedHistoryItem.query}
                              </p>
                            </div>
                          ) : (
                            <div className='bg-gray-50 p-4 rounded-lg'>
                              <ReactMarkdown
                                rehypePlugins={[rehypeHighlight]}
                                remarkPlugins={[remarkGfm]}
                                components={{
                                  h1: props => (
                                    <h1
                                      className='text-2xl font-bold text-purple-700 mt-4 mb-2'
                                      {...props}
                                    />
                                  ),
                                  h2: props => (
                                    <h2
                                      className='text-xl font-semibold text-indigo-600 mt-5 mb-2'
                                      {...props}
                                    />
                                  ),
                                  h3: props => (
                                    <h3
                                      className='text-xl text-blue-500 mt-4 mb-2'
                                      {...props}
                                    />
                                  ),
                                  p: props => (
                                    <p
                                      className='my-2 leading-relaxed text-gray-700'
                                      {...props}
                                    />
                                  ),
                                  code: ({ children }) => (
                                    <code className='bg-gray-200 px-1 rounded text-sm text-red-500'>
                                      {children}
                                    </code>
                                  ),
                                  li: props => (
                                    <li className='ml-6 list-disc'>
                                      {props.children}
                                    </li>
                                  ),
                                  blockquote: props => (
                                    <blockquote
                                      className='border-l-4 border-blue-400 pl-4 italic text-gray-600 my-4'
                                      {...props}
                                    />
                                  )
                                }}
                              >
                                {selectedHistoryItem.aiResponse}
                              </ReactMarkdown>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ) : (
                      <div className='flex items-center justify-center h-64 text-gray-500'>
                        <div className='text-center'>
                          <Clock
                            size={48}
                            className='mx-auto mb-4 opacity-50'
                          />
                          <p className='text-lg'>
                            Select a conversation to view details
                          </p>
                          <p className='text-sm'>
                            Click on any item from the history list
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className='px-4 sm:px-10'>
        <div className='mt-4 p-4 sm:p-6 max-w-2xl bg-gray-50 rounded-md border text-gray-800'>
          <div className='flex items-center gap-4'>
            <IoGameController size={30} />
            <p className='text-lg font-bold'>
              Welcome to GameNation AI Assistant!
            </p>
          </div>
          <div className='mt-4 flex flex-col sm:flex-row'>
            <p className='text-lg ml-0 sm:ml-10'>
              Before we start, let me guide you on how to get the best help:
            </p>
          </div>
        </div>
      </div>

      <div className='px-4 sm:p-6 max-w-6xl mx-auto'>
        {messages[0].navigationGuide && (
          <div className='mt-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-4 sm:p-8 border border-blue-100'>
            <div className='text-center mb-8'>
              <h3 className='text-xl sm:text-2xl font-bold text-gray-900 mb-2'>
                {messages[0].navigationGuide.title}
              </h3>
              <p className='text-gray-700'>
                {messages[0].navigationGuide.description}
              </p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
              {messages[0].navigationGuide.routes.map((route, index) => (
                <div
                  key={index}
                  className='bg-white rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100'
                >
                  <div className='flex items-start space-x-4 mb-4'>
                    <div className='text-3xl'>{route.number}</div>
                    <div className='flex-1'>
                      <h4 className='text-lg sm:text-xl font-bold text-gray-900'>
                        {route.title}
                      </h4>
                      <p className='text-sm font-medium text-indigo-600 mb-2'>
                        {route.subtitle}
                      </p>
                      <p className='text-gray-600 text-sm'>
                        {route.description}
                      </p>
                    </div>
                  </div>

                  <div className='mb-4'>
                    <h5 className='font-semibold text-gray-900 mb-2'>
                      ✨ What you can do:
                    </h5>
                    <div className='space-y-1'>
                      {route.useCases.map((useCase, useCaseIndex) => (
                        <p key={useCaseIndex} className='text-sm text-gray-600'>
                          {useCase}
                        </p>
                      ))}
                    </div>
                  </div>

                  <div className='mb-4'>
                    <h5 className='font-semibold text-gray-900 mb-2'>
                      💡 Example Questions:
                    </h5>
                    <div className='space-y-1'>
                      {route.examples.map((example, exampleIndex) => (
                        <p
                          key={exampleIndex}
                          className='text-sm text-gray-500 italic'
                        >
                          • "{example}"
                        </p>
                      ))}
                    </div>
                  </div>

                  <div className='bg-gray-50 rounded-xl p-4'>
                    <h5 className='font-semibold text-gray-900 mb-2'>
                      📝 How to Ask:
                    </h5>
                    <p className='text-sm text-gray-700 font-mono bg-white px-3 py-2 rounded border'>
                      {route.promptTemplate}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className='px-4 sm:p-6 max-w-4xl mx-auto'>
          <h1 className='text-2xl sm:text-3xl font-extrabold mb-6 text-blue-700'>
            🔮 Ask GameNation AI
          </h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {aiResponse && (
              <div className='mt-8 p-4 sm:p-6 bg-gray-50 rounded border text-gray-800 markdown-body prose prose-slate max-w-none'>
                <ReactMarkdown
                  rehypePlugins={[rehypeHighlight]}
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h1: props => (
                      <h1
                        className='text-3xl font-bold text-purple-700 mt-6 mb-3'
                        {...props}
                      />
                    ),
                    h2: props => (
                      <h2
                        className='text-2xl font-semibold text-indigo-600 mt-5 mb-2'
                        {...props}
                      />
                    ),
                    h3: props => (
                      <h3
                        className='text-xl text-blue-500 mt-4 mb-2'
                        {...props}
                      />
                    ),
                    p: props => (
                      <p
                        className='my-2 leading-relaxed text-gray-700'
                        {...props}
                      />
                    ),
                    code: ({ children }) => (
                      <code className='bg-gray-200 px-1 rounded text-sm text-red-500'>
                        {children}
                      </code>
                    ),
                    li: props => (
                      <li className='ml-6 list-disc'>{props.children}</li>
                    ),
                    blockquote: props => (
                      <blockquote
                        className='border-l-4 border-blue-400 pl-4 italic text-gray-600 my-4'
                        {...props}
                      />
                    )
                  }}
                >
                  {aiResponse}
                </ReactMarkdown>

                <ProductCard products={products} rootSlug={rootSlug} id={id} />
              </div>
            )}
          </motion.div>

          <div className='relative mt-8'>
            <AnimatePresence>
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className='flex flex-col items-center justify-center py-8'
                >
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 10, -10, 0]
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.5,
                      ease: 'easeInOut'
                    }}
                    className='text-indigo-600 mb-4'
                  >
                    <IoGameController size={48} />
                  </motion.div>
                  <motion.p
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className='text-gray-600 font-medium'
                  >
                    Crafting your gaming wisdom...
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>

            <div className='flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 p-4 bg-gray-50 rounded-2xl border border-gray-200 focus-within:border-indigo-300 focus-within:bg-white transition-all'>
              <Search className='h-5 w-5 text-gray-500' />
              <input
                type='text'
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyPress={e => {
                  if (e.key === 'Enter') handleToSubmit()
                }}
                placeholder='Ask me about games, search for specific titles, or get recommendations...'
                className='flex-1 bg-transparent border-none outline-none text-gray-900 placeholder-gray-500'
              />
              <button
                onClick={handleToSubmit}
                disabled={!query.trim()}
                className='p-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed'
              >
                <Send className='h-5 w-5' />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default AskAIPage
