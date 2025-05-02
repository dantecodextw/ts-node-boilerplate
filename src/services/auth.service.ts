import bcrypt from 'bcrypt';

import { prisma, Prisma } from '../generated/prismaClient';
import { LoginData, SignupData } from '../types/auth.type';
import CustomError from '../utils/customError.utils';
type User = Awaited<ReturnType<typeof prisma.user.findUnique>>;
type PublicUser = Omit<NonNullable<User>, 'password'>;

const signup = async (validatedData: SignupData): Promise<PublicUser> => {
  validatedData.password = await bcrypt.hash(validatedData.password, 12);
  const user = await prisma.user.create({
    data: validatedData,
  });
  return user;
};

const login = async (validatedData: LoginData): Promise<PublicUser> => {
  const user = await prisma.user.findUnique({
    where: {
      email: validatedData.email,
    },
    omit: {
      password: false,
    },
  });

  if (!user || !(await bcrypt.compare(validatedData.password, user.password))) {
    throw new CustomError('Invalid login credentials provided', 401);
  }

  const { password, ...safeUser } = user;

  return safeUser;
};

export default {
  signup,
  login,
};
