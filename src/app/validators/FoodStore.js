import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      ingredients: Yup.array()
        .min(1)
        .required(),
    });

    await schema.validate(req.body, { abortEarly: false });

    req.body.name = req.body.name.toLowerCase();
    req.body.ingredients = req.body.ingredients.map(ingredient =>
      ingredient.toLowerCase()
    );

    return next();
  } catch (error) {
    return res
      .status(400)
      .json({ error: 'Validation fails', messages: error.inner });
  }
};
