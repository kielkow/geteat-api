import mongoose from 'mongoose';

const IngredientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    unitMeasurement: {
      type: String,
      required: true,
    },
  },
  {
    _id: false,
  }
);

export default IngredientSchema;
