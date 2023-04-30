const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Routes
app.use('/api/clothingitems', require('./routes/clothingItems'));
app.use('/api/users', require('./routes/users'));
app.use('/api/wishlistitems', require('./routes/wishlistitems'));

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
