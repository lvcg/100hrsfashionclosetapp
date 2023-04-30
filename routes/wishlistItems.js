const express = require('express');
const router = express.Router();
const WishlistItem = require('../models/WishlistItem');

// Route to add a new wishlist item
router.post('/', async (req, res) => {
  try {
    const { itemName, itemDescription, itemImage, itemCategory } = req.body;
    const newWishlistItem = new WishlistItem({
      itemName,
      itemDescription,
      itemImage,
      itemCategory,
    });
    const savedWishlistItem = await newWishlistItem.save();
    res.json(savedWishlistItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Route to get all wishlist items
router.get('/', async (req, res) => {
  try {
    const wishlistItems = await WishlistItem.find();
    res.json(wishlistItems);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Route to delete a wishlist item by id
router.delete('/:id', async (req, res) => {
  try {
    const deletedWishlistItem = await WishlistItem.findByIdAndDelete(req.params.id);
    res.json(deletedWishlistItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
