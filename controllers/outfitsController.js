const express = require('express');
const router = express.Router();
const Outfit = require('../models/Outfit');

// GET all outfits
router.get('/', async (req, res) => {
  try {
    const outfits = await Outfit.find();
    res.json(outfits);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// GET a specific outfit
router.get('/:id', async (req, res) => {
  try {
    const outfit = await Outfit.findById(req.params.id);
    if (!outfit) {
      return res.status(404).json({ message: 'Outfit not found' });
    }
    res.json(outfit);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// POST a new outfit
router.post('/', async (req, res) => {
  try {
    const { name, description, photoUrl, items } = req.body;
    const newOutfit = new Outfit({
      name,
      description,
      photoUrl,
      items,
    });
    await newOutfit.save();
    res.json(newOutfit);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// PUT (update) a specific outfit
router.put('/:id', async (req, res) => {
  try {
    const { name, description, photoUrl, items } = req.body;
    const updatedOutfit = await Outfit.findByIdAndUpdate(
      req.params.id,
      { name, description, photoUrl, items },
      { new: true }
    );
    if (!updatedOutfit) {
      return res.status(404).json({ message: 'Outfit not found' });
    }
    res.json(updatedOutfit);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// DELETE a specific outfit
router.delete('/:id', async (req, res) => {
  try {
    const deletedOutfit = await Outfit.findByIdAndDelete(req.params.id);
    if (!deletedOutfit) {
      return res.status(404).json({ message: 'Outfit not found' });
    }
    res.json(deletedOutfit);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;