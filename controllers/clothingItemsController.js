const ClothingItem = require('../models/ClothingItem');

const getAllClothingItems = async (req, res) => {
  try {
    const clothingItems = await ClothingItem.find();
    res.json(clothingItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const getClothingItemById = async (req, res) => {
  try {
    const clothingItem = await ClothingItem.findById(req.params.id);
    if (!clothingItem) {
      return res.status(404).json({ message: 'Clothing Item not found' });
    }
    res.json(clothingItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const createClothingItem = async (req, res) => {
  try {
    const { name, description, photoUrl, category } = req.body;
    const newClothingItem = new ClothingItem({
      name,
      description,
      photoUrl,
      category,
    });
    await newClothingItem.save();
    res.json(newClothingItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const updateClothingItem = async (req, res) => {
  try {
    const { name, description, photoUrl, category } = req.body;
    const updatedClothingItem = await ClothingItem.findByIdAndUpdate(
      req.params.id,
      { name, description, photoUrl, category },
      { new: true }
    );
    if (!updatedClothingItem) {
      return res.status(404).json({ message: 'Clothing Item not found' });
    }
    res.json(updatedClothingItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const deleteClothingItem = async (req, res) => {
  try {
    const deletedClothingItem = await ClothingItem.findByIdAndDelete(
      req.params.id
    );
    if (!deletedClothingItem) {
      return res.status(404).json({ message: 'Clothing Item not found' });
    }
    res.json({ message: 'Clothing Item deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getAllClothingItems,
  getClothingItemById,
  createClothingItem,
  updateClothingItem,
  deleteClothingItem,
};
