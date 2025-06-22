// components/GameFAQ.js
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FaPlus } from 'react-icons/fa'

const GameFAQ = ({ faqs }) => {
  const [openFAQIndex, setOpenFAQIndex] = useState(null)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className='px-4 py-6'>
        <h1 className='text-2xl md:text-4xl font-semibold mb-6 text-white text-center'>
          Frequently Asked Questions
        </h1>
        <div className='grid grid-cols-1 gap-4 max-w-4xl mx-auto'>
          {faqs?.map((faq, index) => (
            <div
              key={index}
              className='bg-white/5 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/10'
            >
              <div className='flex justify-between items-center'>
                <h3 className='text-base sm:text-lg md:text-xl font-semibold text-blue-400'>
                  {faq.question}
                </h3>
                <FaPlus
                  className='cursor-pointer text-white'
                  onClick={() =>
                    setOpenFAQIndex(openFAQIndex === index ? null : index)
                  }
                />
              </div>
              {openFAQIndex === index && (
                <p className='text-sm sm:text-base mt-2 transition-all duration-300 text-gray-200'>
                  {faq.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default GameFAQ
