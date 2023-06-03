import mongoose from 'mongoose';


const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  shopId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Shop',
    required: true,
  },
  picture: {
    type: String, // Assuming you will store the URL of the picture
    required: true,
  },
  dataProduct: {
    type: Number,
    required: true,
  }
});

const Product = mongoose.model('Product', productSchema);

export default Product;
