export function validateBody(schema) {
  return async (req, res, next) => {
    try {
      await schema.validateAsync(req.body, {
        abortEarly: false,
      });
      next();
    } catch (err) {
      const errors = err.details.map((detail) => detail.message);

      res.status(400).json({
        message: 'Validation failed',
        details: errors,
      });
    }
  };
}
