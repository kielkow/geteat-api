import Food from '../schemas/Food';

class FoodController {
  async index(req, res) {
    const { ingredients } = req.query;

    const foods = await Food.find({ ingredients });

    return res.json(foods);
  }

  async store(req, res) {
    const { name, ingredients } = req.body;

    const foodExists = await Food.findOne({ name });
    if (foodExists) {
      return res
        .status(400)
        .json({ error: 'A food with this name already exists' });
    }

    const foodData = { name, ingredients };
    const food = await Food.create(foodData);

    return res.json(food);
  }
}

export default new FoodController();
