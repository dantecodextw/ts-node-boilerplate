import { validatedEnv } from './validateEnv';

const appConfig = {
  PORT: validatedEnv.PORT,
  NODE_ENV: validatedEnv.NODE_ENV,
  API_PREFIX: validatedEnv.API_PREFIX,
};

export default appConfig;
