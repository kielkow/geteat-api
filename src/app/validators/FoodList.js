import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      ingredients: Yup.array()
        .min(1)
        .required(),
    });

    await schema.validate(req.query, { abortEarly: false });

    req.query.ingredients = JSON.parse(req.query.ingredients).map(ingredient =>
      ingredient.toLowerCase()
    );

    return next();
  } catch (error) {
    return res
      .status(400)
      .json({ error: 'Validation fails', messages: error.inner });
  }
};
