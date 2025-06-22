import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'



const ProductCard = ({ products, rootSlug, id }) => {
  const [productData, setProductData] = useState(null)

  useEffect(() => {
    if (
      products &&
      products.base_name &&
      products.image_link &&
      products.price_inr
    ) {
      setProductData(products)
    } else {
      setProductData(null)
    }
  }, [products])

  console.log('Product from the component is : ', productData)
  console.log('Slug from the component is : ', rootSlug)
  console.log('ID from the component is : ', id)

  return Object.keys(productData || {}).length > 0 ? (
    <div className='p-4 bg-gradient-to-br mt-12 rounded-2xl from-slate-900 to-purple-900'>
      {/* Header */}
      <div className='text-center mb-8'>
        <h1 className='text-xl md:text-3xl font-bold text-white mb-2'>
          {productData.base_name} is Available On this Platform
        </h1>
        <p className='text-purple-300'>Check it Out ⬇️</p>
      </div>

      {/* Card */}
      <div className='max-w-4xl mx-auto'>
        <div className='bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6 shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105'>
          <div className='flex flex-col md:flex-row items-center gap-6'>
            {/* Image */}
            <div className='w-full md:w-1/3'>
              <div className='relative group'>
                <div className='absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl blur opacity-20 group-hover:opacity-40 transition-opacity'></div>
                <img
                  src={productData.image_link}
                  alt={productData.base_name}
                  className='relative w-full h-48 md:h-56 object-cover rounded-xl border border-white/30 transition-transform duration-300 group-hover:scale-105'
                />
              </div>
            </div>

            {/* Content */}
            <div className='w-full md:w-2/3 text-center md:text-left'>
              <h2 className='text-2xl md:text-3xl font-bold text-white mb-4'>
                {productData.base_name}
              </h2>

              <div className='mb-6'>
                <span className='text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent'>
                  ₹{productData.price_inr}
                </span>
              </div>

              <Link to={`/games/${rootSlug}/${id}`}>
                <button className='cursor-pointer w-full md:w-auto bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/50 transform hover:-translate-y-1'>
                  Get It Now 🚀
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className='p-4 rounded-xl mt-10 bg-gradient-to-br from-slate-900 to-purple-900'>
      {/* Header */}
      <div className='text-center mb-8'>
        <h1 className='text-xl md:text-3xl font-bold text-white mb-2'>
          This Game is Not Available or Product Not Found on this Platform
        </h1>
      </div>
    </div>
  )
}

export default ProductCard
