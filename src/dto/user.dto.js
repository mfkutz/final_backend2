import Joi from "joi";

export const userDto = Joi.object({
  first_name: Joi.string().min(2).max(30).required(),
  last_name: Joi.string().min(2).max(30).required(),
  email: Joi.string().email().required(),
  age: Joi.number().positive().integer().max(100).required(),
  password: Joi.string().min(4).max(15).required(),
  role: Joi.string().optional(),
});
