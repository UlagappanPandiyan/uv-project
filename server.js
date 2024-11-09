// server.js
const express = require('express');
const { Client } = require('pg');
const cors = require('cors');
const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(cors());
app.use('/images', express.static('images')); // Serve images as static files

// PostgreSQL connection configuration
const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'ecommerce_db',
  password: 'Joker123#',
  port: 5432,
});

client.connect();

// Get all products
app.get('/products', (req, res) => {
  client.query('SELECT * FROM products', (err, result) => {
    if (err) {
      res.status(500).send('Error fetching products');
      return;
    }
    res.json(result.rows);
  });
});

// Add product to cart (for simplicity, just a sample endpoint)
app.post('/add-to-cart', (req, res) => {
  const { productId, quantity } = req.body;
  res.json({ message: `Product ${productId} added to cart with quantity: ${quantity}` });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
