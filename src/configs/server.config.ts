import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.join(__dirname, `../../.env.${process.env.NODE_ENV}`),
});

export const serverConfig = {
  SERVER_PORT: process.env.PORT || '3001',
  DB_NAME: process.env.DB_NAME,
  DB_DOMAIN: process.env.DB_DOMAIN,
  DB_PORT: Number(process.env.DB_PORT) || 5432,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  MODE: process.env.NODE_ENV,
  API_PREFIX: '/api/v1',
};
