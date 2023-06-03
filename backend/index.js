import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import express from 'express';

import multer from 'multer';

import cors from 'cors';

// Configure the destination and filename for multer
const storage = multer.diskStorage({
  destination: 'uploads/', // Set the destination folder where files will be stored
  filename: (req, file, cb) => {
    const originalFilename = file.originalname;
    cb(null, originalFilename); // Use the original filename
  },
});


// Create a multer upload instance with the storage configuration
const upload = multer({ storage });

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));
// Enable CORS middleware
app.use(cors({ origin: 'http://localhost:5502' }));

// Connect to MongoDB
mongoose.connect('mongodb://mongo/shop', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Product model
import Product from '/app/models/Product.js';
import Shop from '/app/models/Shop.js';
import FormData from '/app/models/Order.js';


// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the Internet Shop!');
});

// Get all products
app.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get products by shopId
app.get('/products/:shopId', async (req, res) => {
  try {
    const shopId = req.params.shopId;
    const products = await Product.find({ shopId });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});
app.get('/products/:shopId', async (req, res) => {
  try {
    const shopId = req.params.shopId;
    const products = await Product.find({ shopId });
    // Populate the shopId field to get the shop details
    const populatedProducts = await Product.populate(products, { path: 'shopId', select: 'name' });
    // Map the products and include the picture URLs
    const productsWithPictures = populatedProducts.map((product) => ({
      _id: product._id,
      name: product.name,
      price: product.price,
      description: product.description,
      shop: {
        _id: product.shopId._id,
        name: product.shopId.name,
      },
      picture: `/uploads/${product.picture}`, // Assuming the pictures are stored in the "uploads" folder
    }));
    res.json(productsWithPictures);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});



// Create a new product
app.post('/products', upload.single('picture'), async (req, res) => {
  try {
    const { name, price, description, shopId, dataProduct } = req.body;
    const picture = req.file.filename; // Get the uploaded file's filename
    const product = new Product({ name, price, description, shopId, picture, dataProduct });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.post('/shops', async (req, res) => {
  try {
    const {name } = req.body;
    const shop = new Shop({name });
    await shop.save();
    res.status(201).json(shop);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Handle the form submission
app.post('/submit', async (req, res) => {
  try {
    // Extract the form data from the request body
    const { name, email, phone, address, productList } = req.body;

    // Create a new instance of the FormData model
    const formData = new FormData({
      name,
      email,
      phone,
      address,
      productList,
    });

    // Save the form data to the database
    await formData.save();
    res.status(201).json(formData);
    res.send('Form data saved successfully');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});






