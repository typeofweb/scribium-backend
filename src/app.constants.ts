import { mixed, number, object, string } from 'yup';

export const PASSWORD_REGEX = /^.{6,20}$/;

export const CONFIG_SCHEMA = object({
  HOST: string().required().default('127.0.0.1'),
  PORT: number().required().default(3000),
  AUTH_SECRET: string().required().default('GwzdLU6pW^53N#5f2DVg'),
  SALT_OR_ROUNDS: mixed<string | number>().required().default(10),
});
