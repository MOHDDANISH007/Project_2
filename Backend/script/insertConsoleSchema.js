import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config({ path: '../.env' })
import consoleSchema from '../models/consoleSchema/consoleSchema.model.js'

const data = [
  {
    Type: 'Console',
    console_id: 1,
    console_name: 'PlayStation 5 Standard Edition',
    price_inr: 49990,
    images_by_color: {
      White: 'https://a.media-amazon.com/images/I/51BGH9oKKIL._SL1000_.jpg',
      Black: 'https://zozila.com/wp-content/uploads/2023/09/Untitled-design.png'
    }
  },
  {
    Type: 'Console',
    console_id: 2,
    console_name: 'PlayStation 5 Digital Edition',
    price_inr: 39990,
    images_by_color: {
      White: 'https://a.media-amazon.com/images/I/41c+1Roq2aL._SX679_.jpg'
    }
  },
  {
    Type: 'Console',
    console_id: 3,
    console_name: 'PlayStation 5 Slim',
    price_inr: 42990,
    images_by_color: {
      White: 'https://a.media-amazon.com/images/I/41c+1Roq2aL._SX679_.jpg'
    }
  },
  {
    Type: 'Console',
    console_id: 4,
    console_name: 'PlayStation 5 Pro',
    price_inr: 54990,
    images_by_color: {
      White: 'https://zozila.com/wp-content/uploads/2024/11/pro-2-TB.jpg',
      Black:
        'https://media.direct.playstation.com/is/image/sierialto/digital-console-cover-ps5-midnight-black-standing-front-hero-1?$Background_Large$'
    }
  },
  {
    Type: 'Console',
    console_id: 5,
    console_name: 'PlayStation 4',
    price_inr: 32990,
    images_by_color: {
      'Jet Black':
        'https://images-cdn.ubuy.co.in/67035e2a633ed700d62eb9c6-sony-playstation-4-pro-console-1tb-jet.jpg',
      'Glacier White':
        'https://images-cdn.ubuy.co.in/667aadfedd50d91ca778f0f6-pre-owned-sony-playstation-4-pro-glacier.jpg'
    }
  },
  {
    Type: 'Console',
    console_id: 6,
    console_name: 'PlayStation 4 Slim',
    price_inr: 30990,
    images_by_color: {
      'Jet Black':
        'https://a.media-amazon.com/images/I/71M4SBulbJL._SL1500_.jpg'
    }
  },
  {
    Type: 'Console',
    console_id: 7,
    console_name: 'PlayStation 4 Pro',
    price_inr: 37990,
    images_by_color: {
      'Jet Black':
        'https://www.sony.co.in/image/83e724c6b5df327fc96f9c05d3ccc2ce?fmt=jpeg&wid=600&qlt=85',
      White:
        'https://5.imimg.com/data5/SELLER/Default/2023/9/344937549/UU/KP/BT/198348429/brand-new-sony-playstation-4-ps4-pro-1tb-glacier-white-discountinued-1000x1000.jpg'
    }
  },
  {
    Type: 'Console',
    console_id: 8,
    console_name: 'Xbox One',
    price_inr: 28990,
    images_by_color: {
      White: 'https://m.media-amazon.com/images/I/612wQCy8x+L._SL1000_.jpg',
      Black: 'https://m.media-amazon.com/images/I/51wHpKXVzxL._AC_SX679_.jpg'
    }
  },
  {
    Type: 'Console',
    console_id: 9,
    console_name: 'Xbox One S',
    price_inr: 24990,
    images_by_color: {
      White:
        'https://images-cdn.ubuy.co.in/64eece20aa759d37cc28a73e-microsoft-xbox-one-s-500gb-white.jpg'
    }
  },
  {
    Type: 'Console',
    console_id: 10,
    console_name: 'Xbox One X',
    price_inr: 34990,
    images_by_color: {
      Black: 'https://a.media-amazon.com/images/I/61RkJyhvV+L._SL1000_.jpg'
    }
  },
  {
    Type: 'Console',
    console_id: 11,
    console_name: 'Xbox Series X',
    price_inr: 52990,
    images_by_color: {
      'Matte Black':
        'https://a.media-amazon.com/images/I/61-jjE67uqL._SL1500_.jpg'
    }
  },
  {
    Type: 'Console',
    console_id: 12,
    console_name: 'Xbox Series S',
    price_inr: 34990,
    images_by_color: {
      White:
        'https://images-cdn.ubuy.co.in/64eece20aa759d37cc28a73e-microsoft-xbox-one-s-500gb-white.jpg'
    }
  },
  {
    Type: 'Console',
    console_id: 13,
    console_name: 'PS5 DualSense Wireless Controller - White',
    price_inr: 5749,
    images_by_color: {
      White: 'https://a.media-amazon.com/images/I/61Q1Pa4X4-L._SL1500_.jpg'
    }
  },
  {
    Type: 'Console',
    console_id: 14,
    console_name: 'PS5 DualSense Wireless Controller - Midnight Black',
    price_inr: 5899,
    images_by_color: {
      Black:
        'https://shopatsc.com/cdn/shop/products/DUALSENSE_MIDNIGHTBLACK_01_PR_RGB_WithNotice_1024x1024@2x.jpg?v=1622802764'
    }
  },
  {
    Type: 'Console',
    console_id: 15,
    console_name: 'PS5 DualSense Wireless Controller - Starlight Blue',
    price_inr: 6199,
    images_by_color: {
      'Starlight Blue': 'https://m.media-amazon.com/images/I/61x3P0RNrsL.jpg'
    }
  },
  {
    Type: 'Console',
    console_id: 16,
    console_name: 'PS5 DualSense Wireless Controller - Chroma Teal',
    price_inr: 6607,
    images_by_color: {
      'Chroma Teal': 'https://m.media-amazon.com/images/I/417n9klq4NL.jpg'
    }
  },
  {
    Type: 'Console',
    console_id: 17,
    console_name: 'PS4 DualShock 4 Wireless Controller - Jet Black',
    price_inr: 4499,
    images_by_color: {
      'Jet Black': 'https://a.media-amazon.com/images/I/41qfg+ISiiL.jpg'
    }
  },
  {
    Type: 'Console',
    console_id: 18,
    console_name: 'PS4 DualShock 4 Wireless Controller - Glacier White',
    price_inr: 4499,
    images_by_color: {
      'Glacier White': 'https://m.media-amazon.com/images/I/71J6h1x4UfL.jpg'
    }
  },
  {
    Type: 'Console',
    console_id: 19,
    console_name: 'Xbox Core Wireless Controller - Carbon Black',
    price_inr: 5490,
    images_by_color: {
      'Carbon Black': 'https://m.media-amazon.com/images/I/61YNiiJizXL.jpg'
    }
  },
  {
    Type: 'Console',
    console_id: 20,
    console_name: 'Xbox Core Wireless Controller - Electric Volt',
    price_inr: 6590,
    images_by_color: {
      'Electric Volt': 'https://m.media-amazon.com/images/I/511p8oS7pPL.jpg'
    }
  }
]

async function insertProducts () {
  try {
    // Clear existing data
    await consoleSchema.deleteMany({})

    // Insert new products
    const insertedProducts = await consoleSchema.insertMany(data)
    console.log(`Inserted ${consoleSchema.length} products successfully.`)
  } catch (error) {
    console.error('Error inserting products:', error)
  }
}

async function main () {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log('Connected to MongoDB')
    await insertProducts()
  } catch (error) {
    console.error('Error connecting to MongoDB:', error)
  } finally {
    await mongoose.disconnect()
    console.log('Disconnected from MongoDB')
  }
}

main().catch(error => {
  console.error('Error in main function:', error)
})
