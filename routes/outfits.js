const express = require('express');
const router = express.Router();
const Outfit = require('../models/outfit');

// GET all outfits
router.get('/', async (req, res) => {
  try {
    const outfits = await Outfit.find();
    res.json(outfits);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET one outfit
router.get('/:id', getOutfit, (req, res) => {
  res.json(res.outfit);
});

// CREATE one outfit
router.post('/', async (req, res) => {
  const outfit = new Outfit({
    name: req.body.name,
    clothingItems: req.body.clothingItems,
    notes: req.body.notes
  });

  try {
    const newOutfit = await outfit.save();
    res.status(201).json(newOutfit);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// UPDATE one outfit
router.patch('/:id', getOutfit, async (req, res) => {
  if (req.body.name != null) {
    res.outfit.name = req.body.name;
  }
  if (req.body.clothingItems != null) {
    res.outfit.clothingItems = req.body.clothingItems;
  }
  if (req.body.notes != null) {
    res.outfit.notes = req.body.notes;
  }

  try {
    const updatedOutfit = await res.outfit.save();
    res.json(updatedOutfit);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE one outfit
router.delete('/:id', getOutfit, async (req, res) => {
  try {
    await res.outfit.remove();
    res.json({ message: 'Outfit deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware function to get outfit by ID
async function getOutfit(req, res, next) {
  let outfit;
  try {
    outfit = await Outfit.findById(req.params.id);
    if (outfit == null) {
      return res.status(404).json({ message: 'Outfit not found' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.outfit = outfit;
  next();
}

module.exports = router;
