import { prisma, Prisma } from '../generated/prismaClient';
import { SignupData } from '../types/auth.type';

type PublicUser = Omit<Prisma.UserCreateInput, 'password'>;

const signup = async (validatedData: SignupData): Promise<PublicUser> => {
  const user = await prisma.user.create({
    data: validatedData,
  });
  return user;
};

export default {
  signup,
};
