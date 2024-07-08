import * as joi from 'joi';

export const ValidatorEnv = joi.object({
  PORT: joi.number().default(3001),
  MONGO_DB_HOST: joi.string().required(),
  MONGO_DB_PORT: joi.number().required(),
  MONGO_DB_DATABASE: joi.string().required(),
  REDIS_HOST: joi.string().required(),
});
