import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config({ path: '../.env' })
import accessories from "../models/accessories/accessories.model.js"

const data = [
  {
    Type: 'Accessories',
    console_id: 1,
    console_name: 'PlayStation 5 Standard Edition',
    price_inr: 49990,
    images_by_color: {
      White: 'https://a.media-amazon.com/images/I/51BGH9oKKIL._SL1000_.jpg',
      Black: 'https://zozila.com/wp-content/uploads/2023/09/Untitled-design.png'
    }
  },
  {
    Type: 'Accessories',
    console_id: 2,
    console_name: 'PlayStation 5 Digital Edition',
    price_inr: 39990,
    images_by_color: {
      White: 'https://a.media-amazon.com/images/I/41c+1Roq2aL._SX679_.jpg'
    }
  },
  {
    Type: 'Accessories',
    console_id: 3,
    console_name: 'PlayStation 5 Slim',
    price_inr: 42990,
    images_by_color: {
      White: 'https://a.media-amazon.com/images/I/41c+1Roq2aL._SX679_.jpg'
    }
  },
  {
    Type: 'Accessories',
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
    Type: 'Accessories',
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
    Type: 'Accessories',
    console_id: 6,
    console_name: 'PlayStation 4 Slim',
    price_inr: 30990,
    images_by_color: {
      'Jet Black':
        'https://a.media-amazon.com/images/I/71M4SBulbJL._SL1500_.jpg'
    }
  },
  {
    Type: 'Accessories',
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
    Type: 'Accessories',
    console_id: 8,
    console_name: 'Xbox One',
    price_inr: 28990,
    images_by_color: {
      White: 'https://m.media-amazon.com/images/I/612wQCy8x+L._SL1000_.jpg',
      Black: 'https://m.media-amazon.com/images/I/51wHpKXVzxL._AC_SX679_.jpg'
    }
  },
  {
    Type: 'Accessories',
    console_id: 9,
    console_name: 'Xbox One S',
    price_inr: 24990,
    images_by_color: {
      White:
        'https://images-cdn.ubuy.co.in/64eece20aa759d37cc28a73e-microsoft-xbox-one-s-500gb-white.jpg'
    }
  },
  {
    Type: 'Accessories',
    console_id: 10,
    console_name: 'Xbox One X',
    price_inr: 34990,
    images_by_color: {
      Black: 'https://a.media-amazon.com/images/I/61RkJyhvV+L._SL1000_.jpg'
    }
  },
  {
    Type: 'Accessories',
    console_id: 11,
    console_name: 'Xbox Series X',
    price_inr: 52990,
    images_by_color: {
      'Matte Black':
        'https://a.media-amazon.com/images/I/61-jjE67uqL._SL1500_.jpg'
    }
  },
  {
    Type: 'Accessories',
    console_id: 12,
    console_name: 'Xbox Series S',
    price_inr: 34990,
    images_by_color: {
      White:
        'https://images-cdn.ubuy.co.in/64eece20aa759d37cc28a73e-microsoft-xbox-one-s-500gb-white.jpg'
    }
  },
  {
    Type: 'Accessories',
    console_id: 13,
    console_name: 'PS5 DualSense Wireless Controller - White',
    price_inr: 5749,
    images_by_color: {
      White: 'https://a.media-amazon.com/images/I/61Q1Pa4X4-L._SL1500_.jpg'
    }
  },
  {
    Type: 'Accessories',
    console_id: 14,
    console_name: 'PS5 DualSense Wireless Controller - Midnight Black',
    price_inr: 5899,
    images_by_color: {
      Black:
        'https://shopatsc.com/cdn/shop/products/DUALSENSE_MIDNIGHTBLACK_01_PR_RGB_WithNotice_1024x1024@2x.jpg?v=1622802764'
    }
  },
  {
    Type: 'Accessories',
    console_id: 15,
    console_name: 'PS5 DualSense Wireless Controller - Starlight Blue',
    price_inr: 6199,
    images_by_color: {
      'Starlight Blue': 'https://m.media-amazon.com/images/I/61x3P0RNrsL.jpg'
    }
  },
  {
    Type: 'Accessories',
    console_id: 16,
    console_name: 'PS5 DualSense Wireless Controller - Chroma Teal',
    price_inr: 6607,
    images_by_color: {
      'Chroma Teal': 'https://m.media-amazon.com/images/I/417n9klq4NL.jpg'
    }
  },
  {
    Type: 'Accessories',
    console_id: 17,
    console_name: 'PS4 DualShock 4 Wireless Controller - Jet Black',
    price_inr: 4499,
    images_by_color: {
      'Jet Black': 'https://a.media-amazon.com/images/I/41qfg+ISiiL.jpg'
    }
  },
  {
    Type: 'Accessories',
    console_id: 18,
    console_name: 'PS4 DualShock 4 Wireless Controller - Glacier White',
    price_inr: 4499,
    images_by_color: {
      'Glacier White': 'https://m.media-amazon.com/images/I/71J6h1x4UfL.jpg'
    }
  },
  {
    Type: 'Accessories',
    console_id: 19,
    console_name: 'Xbox Core Wireless Controller - Carbon Black',
    price_inr: 5490,
    images_by_color: {
      'Carbon Black': 'https://m.media-amazon.com/images/I/61YNiiJizXL.jpg'
    }
  },
  {
    Type: 'Accessories',
    console_id: 20,
    console_name: 'Xbox Core Wireless Controller - Electric Volt',
    price_inr: 6590,
    images_by_color: {
      'Electric Volt': 'https://m.media-amazon.com/images/I/511p8oS7pPL.jpg'
    }
  },

  {
    Type: 'Accessories',
    console_id: 21,
    game_name: 'Spider-Man 2 (PS4 Edition)',
    price_inr: 3699,
    image_link: 'https://a.media-amazon.com/images/I/71rInOWdBAL._SX679_.jpg'
  },
  {
    Type: 'Accessories',
    console_id: 22,
    game_name: 'Far Cry 6 (PS4 Edition)',
    price_inr: 1499,
    image_link:
      'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQjfJ78V_mAH94FoNVMQ7Uee2QdkAjHH8sf_3xLA9hLSRwyjftyk_UJiJqDF7Fm7khJGdY9g_2PWADCNtOC1USgVrpzU5wV1riM7YijH8yJz1SX2yfCivhB'
  },
  {
    Type: 'Accessories',
    console_id: 23,
    game_name: 'Astro Bot (PS4 Edition)',
    price_inr: 3399,
    image_link: 'https://a.media-amazon.com/images/I/716b4iZK6TL._SX679_.jpg'
  },
  {
    Type: 'Accessories',
    console_id: 24,
    game_name: 'Days Gone Remastered (PS4 Edition)',
    price_inr: 3399,
    image_link: 'https://a.media-amazon.com/images/I/91JAyQ8RLCL._SX522_.jpg'
  },
  {
    Type: 'Accessories',
    console_id: 25,
    game_name: 'Horizon Zero Dawn Remastered (PS4 Edition)',
    price_inr: 3399,
    image_link: 'https://a.media-amazon.com/images/I/819-3Ev22jL._SX522_.jpg'
  },
  {
    Type: 'Accessories',
    console_id: 26,
    game_name: 'Until Dawn (PS4 Edition)',
    price_inr: 3399,
    image_link: 'https://a.media-amazon.com/images/I/81c7WFBfNyL._SX522_.jpg'
  },
  {
    Type: 'Accessories',
    console_id: 27,
    game_name: 'Marvel’s Spider-Man: Miles Morales (PS4 Edition)',
    price_inr: 3399,
    image_link: 'https://a.media-amazon.com/images/I/811umGHYORL._SX569_.jpg'
  },
  {
    Type: 'Accessories',
    console_id: 28,
    game_name: 'God of War: Ragnarok (PS4 Edition)',
    price_inr: 4299,
    image_link: 'https://a.media-amazon.com/images/I/81LtrvOKYbL._SY879_.jpg'
  },
  {
    Type: 'Accessories',
    console_id: 29,
    game_name: 'Hogwarts Legacy (PS4 Edition)',
    price_inr: 4199,
    image_link: 'https://a.media-amazon.com/images/I/81z6AqCm5nL._SX522_.jpg'
  },
  {
    Type: 'Accessories',
    console_id: 30,
    game_name: "Assassin's Creed Shadows (PS4 Edition)",
    price_inr: 5299,
    image_link: 'https://a.media-amazon.com/images/I/81U2bxexU0L._SX569_.jpg'
  },
  {
    Type: 'Accessories',
    console_id: 31,
    game_name: 'Double Dragon Revive (PS4 Edition)',
    price_inr: 1999,
    image_link:
      'https://s.pacn.ws/1/p/198/double-dragon-revive-814271.11.jpg?v=sgiek6&width=800&crop=1280,1563'
  },
  {
    Type: 'Accessories',
    console_id: 32,
    game_name: 'Sonic X Shadow Generations (PS4 Edition)',
    price_inr: 2999,
    image_link:
      'https://dmdworld.store/wp-content/uploads/2024/11/ps4-sonic-shadow.png'
  },
  {
    Type: 'Accessories',
    console_id: 33,
    game_name: 'The Last of Us Part II Remastered (PS4 Edition)',
    price_inr: 3599,
    image_link: 'https://a.media-amazon.com/images/I/61KXzwaghhL._SX679_.jpg'
  },
  {
    Type: 'Accessories',
    console_id: 34,
    game_name: "Dragon's Dogma 2 (PS4 Edition)",
    price_inr: 5499,
    image_link: 'https://a.media-amazon.com/images/I/81kbquO0o-L._SX679_.jpg'
  },
  {
    Type: 'Accessories',
    console_id: 35,
    game_name: 'Bloodborne - Game of the Year (PS4 Edition)',
    price_inr: 4499,
    image_link: 'https://a.media-amazon.com/images/I/710ZADg0wbL._SY879_.jpg'
  },
  {
    Type: 'Accessories',
    console_id: 36,
    game_name: 'Ghost of Yōtei (PS4 Edition)',
    price_inr: 5499,
    image_link: 'https://a.media-amazon.com/images/I/61vCrYISMOL._SX679_.jpg'
  },
  {
    Type: 'Accessories',
    console_id: 37,
    game_name: 'Red Dead Redemption 2 (PS4 Edition)',
    price_inr: 4599,
    image_link:
      'https://rukminim2.flixcart.com/image/832/832/xif0q/physical-game/z/u/4/-original-imahfdkhykyv9eje.jpeg?q=70&crop=false'
  },
  {
    Type: 'Accessories',
    console_id: 38,
    game_name: 'Mafia 3 (PS4 Edition)',
    price_inr: 3499,
    image_link: 'https://a.media-amazon.com/images/I/81rvq5IfZiL._SX679_.jpg'
  },
  {
    Type: 'Accessories',
    console_id: 39,
    game_name: 'Fatal Fury: City of the Wolves (PS4 Edition)',
    price_inr: 2999,
    image_link: 'https://m.media-amazon.com/images/I/9131l3+42kL._AC_SX679_.jpg'
  },
  {
    Type: 'Accessories',
    console_id: 40,
    game_name: 'GTA 5 (PS4 Edition)',
    price_inr: 3999,
    image_link: 'https://m.media-amazon.com/images/I/81htlTqEckL._SX522_.jpg'
  },
  {
    Type: 'Accessories',
    console_id: 41,
    game_name: 'Doom: The Dark Ages (PS4 Edition)',
    price_inr: 4599,
    image_link: 'https://a.media-amazon.com/images/I/91IoZT4nczL._SX679_.jpg'
  },
  {
    Type: 'Accessories',
    console_id: 42,
    game_name: 'Elden Ring: Nightreign (PS4 Edition)',
    price_inr: 5599,
    image_link:
      'https://cdn.hmv.com/r/w-1280/p-webp/hmv/files/b5/b5be37d0-a98c-48ae-aa0e-1cb8d6cef628.png'
  },
  {
    Type: 'Accessories',
    console_id: 43,
    game_name: 'FIFA 23 (PS4 Edition)',
    price_inr: 5599,
    image_link: 'https://a.media-amazon.com/images/I/71RmYwT5JOL._SX679_.jpg'
  },
  {
    Type: 'Accessories',
    console_id: 44,
    game_name: "Five Nights at Freddy's: Secret of the Mimic (PS4 Edition)",
    price_inr: 2699,
    image_link: 'https://i.imgur.com/R91gtRg.jpg'
  },
  {
    Type: 'Accessories',
    console_id: 45,
    game_name: 'Hitman 3 (PS4 Edition)',
    price_inr: 3099,
    image_link: 'https://a.media-amazon.com/images/I/61ppuR4BooL._SX522_.jpg'
  },
  {
    Type: 'Accessories',
    console_id: 46,
    game_name: 'Kingdom Come: Deliverance  (PS4 Edition)',
    price_inr: 4599,
    image_link: 'https://a.media-amazon.com/images/I/91j1wKFr+bL._SX522_.jpg'
  },
  {
    Type: 'Accessories',
    console_id: 47,
    game_name: 'Resident Evil 3 (PS4 Edition)',
    price_inr: 3599,
    image_link: 'https://a.media-amazon.com/images/I/81zPtVj06kL._SX679_.jpg'
  },
  {
    Type: 'Accessories',
    console_id: 48,
    game_name: 'Call of Duty: Black Ops 6 (PS4 Edition)',
    price_inr: 4899,
    image_link:
      'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQ6GCYz53QwiDoEUlj2MocvsK-RdvzlMGno-7E8DElsG9pjQt-LeDUZ5pL4m8JaH-PxQ_G76gR15VDbbK01t1u5hOKNKymq17qazRlJkFboYHEAh9zK-gBHQw'
  },
  {
    Type: 'Accessories',
    console_id: 49,
    game_name: 'Ghost Recon Wildlands (PS4 Edition)',
    price_inr: 5599,
    image_link: 'https://a.media-amazon.com/images/I/91FhqicEyLL._SX679_.jpg'
  },
  {
    Type: 'Accessories',
    console_id: 50,
    game_name: 'Watch Dogs Legion (PS4 Edition)',
    price_inr: 4599,
    image_link: 'https://a.media-amazon.com/images/I/81HsglxgCQL._SX679_.jpg'
  }
]

async function insertProducts () {
  try {
    // Clear existing data
    await accessories.deleteMany({})

    // Insert new products
    const insertedProducts = await accessories.insertMany(data)
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
