import Joi from 'joi';
export const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    'string.base': ' Should include letters',
    'string.min': 'Too short!',
    'string.max': ' Too long!',
    'any.required': 'This field is required',
  }),
  phoneNumber: Joi.string().min(3).max(16).required().messages({
    'string.pattern.base':
      ' Phone number should include numbers, spaces, (), + or - ',
    'string.min': ' Too short!',
    'string.max': 'Too long!',
    'any.required': 'This field is required',
  }),
  email: Joi.string().email().min(3).max(60).messages({
    'string.email': ' Email should be valid',
    'string.min': ' Too short!',
    'string.max': ' Too long!',
  }),
  isFavourite: Joi.boolean().default(false).messages({
    'boolean.base': ' isFavourite sholud be defined',
  }),
  contactType: Joi.string().valid('work', 'home', 'personal').messages({
    'any.only':
      ' ContactType should include one of these: work, home, personal',
  }),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(30),
  phoneNumber: Joi.string().min(3).max(16).messages({
    'string.pattern.base':
      ' Phone number should include numbers, spaces, (), + or - ',
    'string.min': ' Too short!',
    'string.max': 'Too long!',
  }),
  email: Joi.string().email().min(3).max(60).messages({
    'string.email': ' Email should be valid',
    'string.min': ' Too short!',
    'string.max': ' Too long!',
  }),
  isFavourite: Joi.boolean().messages({
    'boolean.base': ' isFavourite sholud be defined',
  }),
  contactType: Joi.string().valid('work', 'home', 'personal').messages({
    'any.only':
      ' ContactType should include one of these: work, home, personal',
  }),
});
