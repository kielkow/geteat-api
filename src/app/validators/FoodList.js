import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      ingredients: Yup.array()
        .of(
          Yup.string()
            .trim()
            .min(1)
            .lowercase()
        )
        .compact(v => typeof v !== 'string' || v === '')
        .min(1)
        .required(),
    });

    await schema.validate(req.query, { abortEarly: false });

    req.query = schema.cast(req.query);

    return next();
  } catch (error) {
    return res
      .status(400)
      .json({ error: 'Validation fails', messages: error.inner });
  }
};
