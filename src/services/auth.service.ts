import prisma from '../generated/prismaClient';
import { SignupData } from '../types/auth.type';

const signup = async (validatedData: SignupData) => {
  // const user = await prisma.user.create({
  //   // data: {}
  // })
};

export default {
  signup,
};
