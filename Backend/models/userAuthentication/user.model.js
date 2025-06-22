import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true
    },
    userEmail: {
      type: String,
      required: true,
      unique: true
    },
    userPassword: {
      type: String,
      required: true
    },
    cart: [
      {
        productId: {
          type: Number,
        },
        quantity: {
          type: Number,
          default: 1
        },
        productType: {
          type: String, // e.g., 'console', 'ps4', 'ps5', 'controller'
        }
      }
    ]
  },
  { timestamps: true }
)

const User = mongoose.model('User', userSchema)
export default User
