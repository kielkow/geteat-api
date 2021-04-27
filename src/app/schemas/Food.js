import mongoose from 'mongoose';

const IngredientSchema = new mongoose.Schema({
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
});

const FoodSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    ingredients: {
      type: [IngredientSchema],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Food', FoodSchema);
