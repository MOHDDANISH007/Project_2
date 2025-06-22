import express from 'express'
import userDB from '../models/userAuthentication/user.model.js'
import authenticateUser from '../middleware/auth.middleware.js'

const router = express.Router()

router.get('/user-cart', authenticateUser, async (req, res) => {
  try{
    const userId = req.user.id
    const user = await userDB.findById(userId)
    if (!user) return res.status(404).json({ error: 'User not found' })
    res.json({ message: 'User cart retrieved!', cart: user.cart })
  }
  catch(error){
    console.error("Error fetching user cart:", error);
    res.status(500).json({ error: "Server error while fetching data" });
  }
})

// ➕ ADD TO CART
router.post('/add', authenticateUser, async (req, res) => {
  const userId = req.user.id
  const productId = parseInt(req.body.productId)
  const productQuantity = parseInt(req.body.quantity)
  const productType = req.body.productType?.toLowerCase()

  if (
    isNaN(productId) ||
    isNaN(productQuantity) ||
    productQuantity <= 0 ||
    !productType
  ) {
    return res.status(400).json({ error: 'Invalid input data' })
  }

  try {
    const user = await userDB.findById(userId)
    if (!user) return res.status(404).json({ error: 'User not found' })

    const existingProduct = user.cart.find(
      item => item.productId === productId && item.productType === productType
    )

    if (existingProduct) {
      existingProduct.quantity += productQuantity
    } else {
      user.cart.push({ productId, quantity: productQuantity, productType })
    }

    await user.save()

    res.json({ message: 'Product added to cart!', cart: user.cart })
  } catch (error) {
    console.error('Error adding product to cart:', error)
    res.status(500).json({ error: 'Server error while adding to cart' })
  }
})

// ❌ REMOVE FROM CART
router.post('/remove', authenticateUser, async (req, res) => {
  const userId = req.user.id
  const productId = Number(req.body.productId)
  const productQuantity = Number(req.body.productQuantity)
  const productType = req.body.productType?.toLowerCase()

  if (isNaN(productId) || isNaN(productQuantity) || productQuantity <= 0 || !productType) {
    return res.status(400).json({ error: 'Invalid input data' })
  }

  try {
    const user = await userDB.findById(userId)
    if (!user) return res.status(404).json({ error: 'User not found' })

    const existingProduct = user.cart.find(
      item => item.productId === productId && item.productType === productType
    )
    if (!existingProduct) return res.status(404).json({ error: 'Product not found in cart' })

    if (existingProduct.quantity <= productQuantity) {
      user.cart = user.cart.filter(item =>
        !(item.productId === productId && item.productType === productType)
      )
    } else {
      existingProduct.quantity -= productQuantity
    }

    await user.save()
    res.json({ message: 'Product removed from cart!', cart: user.cart })
  } catch (error) {
    console.error('Error removing product from cart:', error)
    res.status(500).json({ error: 'Server error while removing from cart' })
  }
})


export default router
