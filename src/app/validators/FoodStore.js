import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const checkType = Yup.object().shape({
      name: Yup.string()
        .max(30)
        .trim()
        .required(),
      description: Yup.string()
        .max(350)
        .trim()
        .required(),
      ingredients: Yup.array()
        .of(
          Yup.object().shape({
            name: Yup.string()
              .max(30)
              .trim()
              .required(),
            quantity: Yup.number()
              .positive()
              .required(),
            unitMeasurement: Yup.string()
              .max(30)
              .trim()
              .required(),
          })
        )
        .min(1)
        .required(),
        image_url: Yup.string().required(),
    });
    await checkType.validate(req.body, {
      abortEarly: false,
      strict: true,
    });

    const convertToLowerCase = Yup.object().shape({
      name: Yup.string().lowercase(),
      ingredients: Yup.array().of(
        Yup.object().shape({
          name: Yup.string().lowercase(),
          unitMeasurement: Yup.string().lowercase(),
        })
      ),
    });
    req.body = convertToLowerCase.cast(req.body);

    return next();
  } catch (error) {
    return res
      .status(400)
      .json({ error: 'Validation fails', messages: error.inner });
  }
};
