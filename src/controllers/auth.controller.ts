import asyncErrorHandler from '../middlewares/asyncErrorHandler.middleware';
import authValidation from '../validations/auth.validation';
import type { SignupData } from '../types/auth.type';
import authService from '../services/auth.service';

const signup = asyncErrorHandler(async (req, res) => {
  const validatedData = authValidation.signup.validate(req.body) as SignupData;
  const data = await authService.signup(validatedData);
  res.status(201).json({
    message: 'User has been created',
    data,
  });
});

export default { signup };
