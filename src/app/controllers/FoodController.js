import Food from '../schemas/Food';

class FoodController {
  async index(req, res) {
    const { ingredients } = req.query;

    let foods = await Food.find({
      'ingredients.name': { $all: ingredients },
    });

    if (foods.length === 0) {
      foods = await Food.find({
        'ingredients.name': ingredients,
      });
    }

    const sortFoods = foods.sort(
      (a, b) => a.ingredients.length - b.ingredients.length
    );

    return res.json(sortFoods);
  }

  async store(req, res) {
    const { name, description, ingredients, url } = req.body;

    const foodExists = await Food.findOne({ name });
    if (foodExists) {
      return res
        .status(400)
        .json({ error: 'A food with this name already exists' });
    }

    const foodData = { name, description, ingredients, url };
    const food = await Food.create(foodData);

    return res.json(food);
  }
}

export default new FoodController();
