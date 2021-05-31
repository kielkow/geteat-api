import mongoose from 'mongoose';
import IngredientSchema from './Ingredient';

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
    image_url: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Food', FoodSchema);
