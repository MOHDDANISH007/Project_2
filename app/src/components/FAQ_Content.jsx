import React, { useState } from 'react'
import {
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Package,
  Clock,
  ShoppingCart,
  Shield
} from 'lucide-react'
import { motion } from 'framer-motion'

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null)

  const faqData = [
    {
      id: 1,
      icon: Package,
      question: 'What is the difference between New and Pre-owned games?',
      answer:
        'New games are brand new, unopened products that come in original packaging with all original materials. Pre-owned games are previously owned items that have been tested and verified to work perfectly. Pre-owned games may show minor signs of use but are guaranteed to function like new. Pre-owned games are typically 20-40% cheaper than new games.'
    },
    {
      id: 2,
      icon: ShoppingCart,
      question: 'How does the buying process work?',
      answer:
        'Our buying process is simple: 1) Browse our catalog and add items to your cart, 2) Proceed to checkout and enter your shipping information, 3) Choose your payment method (credit card, PayPal, etc.), 4) Review and confirm your order, 5) Receive email confirmation with tracking information. We accept all major credit cards and offer secure payment processing.'
    },
    {
      id: 3,
      icon: Clock,
      question: 'When will my products arrive if I order now?',
      answer:
        "Standard shipping takes 5-7 business days. Express shipping (2-3 business days) and overnight shipping are also available for an additional fee. Orders placed before 2 PM EST ship the same day. You'll receive tracking information via email once your order ships, so you can monitor its progress in real-time."
    },
    {
      id: 4,
      icon: HelpCircle,
      question: 'How does the selling process work?',
      answer:
        'Selling with us is easy: 1) Get an instant quote by entering your game details on our sell page, 2) Ship your games to us for free using our prepaid shipping label, 3) We inspect and test your games within 2 business days, 4) Get paid via PayPal, check, or store credit once approved. We accept games in good condition and offer competitive prices.'
    },
    {
      id: 5,
      icon: Shield,
      question: 'Do pre-owned products come with a warranty?',
      answer:
        "Yes! All pre-owned games come with our 30-day satisfaction guarantee. If your game doesn't work properly, we'll replace it or provide a full refund. We thoroughly test all pre-owned games before selling them. Additionally, we offer an extended 90-day warranty for a small additional fee during checkout."
    }
  ]

  const toggleFAQ = index => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className='mb-20'
    >
      {/* this div for line */}
      <div className='h-1 bg-gradient-to-r from-cyan-500 to-purple-600 w-full rounded-full mb-8'></div>

      <div className='min-h-screen py-12 px-4'>
        <div className='max-w-4xl mx-auto'>
          {/* Header */}
          <div className='text-center mb-12'>
            <div className='flex justify-center mb-4'>
              <div className='p-3 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full'>
                <HelpCircle size={32} className='text-white' />
              </div>
            </div>
            <h2 className='text-4xl font-bold text-white mb-4'>
              Frequently Asked
              <span className='bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent'>
                {' '}
                Questions
              </span>
            </h2>
            <p className='text-gray-400 text-lg'>
              Find answers to common questions about our gaming services
            </p>
          </div>

          {/* FAQ Items */}
          <div className='space-y-4'>
            {faqData.map((faq, index) => {
              const IconComponent = faq.icon
              const isOpen = openIndex === index

              return (
                <div
                  key={faq.id}
                  className='bg-gray-800 rounded-xl border border-gray-700 overflow-hidden transition-all duration-300 hover:border-cyan-500'
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className='w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-750 transition-colors duration-200'
                  >
                    <div className='flex items-center space-x-4'>
                      <div
                        className={`p-2 rounded-lg transition-colors duration-300 ${
                          isOpen
                            ? 'bg-gradient-to-r from-cyan-500 to-purple-600'
                            : 'bg-gray-700'
                        }`}
                      >
                        <IconComponent
                          size={20}
                          className={`transition-colors duration-300 ${
                            isOpen ? 'text-white' : 'text-gray-400'
                          }`}
                        />
                      </div>
                      <h3
                        className={`text-lg font-semibold transition-colors duration-300 ${
                          isOpen ? 'text-cyan-400' : 'text-white'
                        }`}
                      >
                        {faq.question}
                      </h3>
                    </div>
                    <div className='flex-shrink-0 ml-4'>
                      {isOpen ? (
                        <ChevronUp
                          size={24}
                          className='text-cyan-400 transition-transform duration-300'
                        />
                      ) : (
                        <ChevronDown
                          size={24}
                          className='text-gray-400 transition-transform duration-300'
                        />
                      )}
                    </div>
                  </button>

                  <div
                    className={`transition-all duration-300 ease-in-out ${
                      isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    } overflow-hidden`}
                  >
                    <div className='px-6 pb-5'>
                      <div className='pl-12'>
                        <div className='border-l-2 border-gradient-to-b from-cyan-500 to-purple-600 pl-4'>
                          <p className='text-gray-300 leading-relaxed'>
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default FAQ
