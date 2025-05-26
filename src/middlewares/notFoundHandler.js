import createError from 'http-errors';

export const notFoundHandler = (err, req, res, next) => {
  next(createError(404, 'Contact not found :('));
};
