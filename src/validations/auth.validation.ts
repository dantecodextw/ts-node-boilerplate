import Joi from 'joi';
import validationHelper from '../utils/joiValidationHelper';

const signup = new validationHelper({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export default {
  signup,
};
