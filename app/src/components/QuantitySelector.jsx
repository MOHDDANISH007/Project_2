// components/QuantitySelector.js
import React from 'react'

const QuantitySelector = ({ quantity, setQuantity }) => {
  return (
    <div className='mt-4 w-fit bg-white p-4 rounded-xl flex flex-row gap-5 shadow-md'>
      <div className='mb-2'>
        <h1 className='text-lg font-semibold text-gray-700'>Quantity:</h1>
      </div>
      <div className='flex items-center gap-4'>
        <button
          disabled={quantity <= 0}
          onClick={() => setQuantity(quantity - 1)}
          className={`w-10 h-10 rounded-full bg-gray-200 text-gray-700 text-xl font-bold transition ${
            quantity <= 0
              ? 'cursor-not-allowed'
              : 'cursor-pointer hover:bg-gray-300'
          }`}
        >
          -
        </button>
        <p className='text-lg text-black font-medium w-6 text-center'>
          {quantity}
        </p>
        <button
          onClick={() => setQuantity(quantity + 1)}
          className='cursor-pointer w-10 h-10 rounded-full bg-gray-200 text-gray-700 text-xl font-bold hover:bg-gray-300 transition'
        >
          +
        </button>
      </div>
    </div>
  )
}

export default QuantitySelector
