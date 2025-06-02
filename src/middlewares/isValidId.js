import createHttpError from 'http-errors';
import { isValidObjectId } from 'mongoose';

export function isValidId(req, res, next) {
  if (!isValidObjectId(req.params.contactId)) {
    return next(
      createHttpError.BadRequest('ContactId should be a valid ObjectId'),
    );
  }
  next();
}
