const express = require('express');
const router = express.Router();
const { getAllClothingItems, getClothingItemById, createClothingItem, updateClothingItem, deleteClothingItem } = require('../controllers/clothingItemsController');

// GET all clothing items
router.get('/', getAllClothingItems);

// GET a specific clothing item
router.get('/:id', getClothingItemById);

// POST a new clothing item
router.post('/', createClothingItem);

// PUT (update) a specific clothing item
router.put('/:id', updateClothingItem);

// DELETE a specific clothing item
router.delete('/:id', deleteClothingItem);

module.exports = router;






