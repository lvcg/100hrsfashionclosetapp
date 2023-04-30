const WishlistItem = require('../models/WishlistItem');

// GET all wishlist items
const getAllWishlistItems = async (req, res) => {
  try {
    const wishlistItems = await WishlistItem.find();
    res.json(wishlistItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// GET a specific wishlist item
const getWishlistItemById = async (req, res) => {
  try {
    const wishlistItem = await WishlistItem.findById(req.params.id);
    if (!wishlistItem) {
      return res.status(404).json({ message: 'Wishlist Item not found' });
    }
    res.json(wishlistItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// POST a new wishlist item
const createWishlistItem = async (req, res) => {
  try {
    const { name, description, photoUrl, price } = req.body;
    const newWishlistItem = new WishlistItem({
      name,
      description,
      photoUrl,
      price,
    });
    await newWishlistItem.save();
    res.json(newWishlistItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// PUT (update) a specific wishlist item
const updateWishlistItem = async (req, res) => {
  try {
    const { name, description, photoUrl, price } = req.body;
    const updatedWishlistItem = await WishlistItem.findByIdAndUpdate(
      req.params.id,
      { name, description, photoUrl, price },
      { new: true }
    );
    if (!updatedWishlistItem) {
      return res.status(404).json({ message: 'Wishlist Item not found' });
    }
    res.json(updatedWishlistItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// DELETE a specific wishlist item
const deleteWishlistItem = async (req, res) => {
  try {
    const deletedWishlistItem = await WishlistItem.findByIdAndDelete(
      req.params.id
    );
    if (!deletedWishlistItem) {
      return res.status(404).json({ message: 'Wishlist Item not found' });
    }
    res.json(deletedWishlistItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getAllWishlistItems,
  getWishlistItemById,
  createWishlistItem,
  updateWishlistItem,
  deleteWishlistItem,
};
