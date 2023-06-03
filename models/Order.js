import mongoose from 'mongoose';

// Define a schema for the form data
const formDataSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  productList: {
    type: Array,
    required: false, 
  },
});

// Create a model based on the schema
const FormData = mongoose.model('FormData', formDataSchema);

export default FormData;