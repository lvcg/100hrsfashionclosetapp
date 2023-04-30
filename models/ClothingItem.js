const mongoose = require('mongoose');

const clothingItemSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    photoUrl: {
      type: String,
      required: true
    },
    category: {
      type: String,
      enum: ['pants', 'shirts', 'dresses', 'shoes', 'accessories'],
      required: true
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  });

  const ClothingItem = mongoose.model('ClothingItem', clothingItemSchema);

  module.exports = ClothingItem;
