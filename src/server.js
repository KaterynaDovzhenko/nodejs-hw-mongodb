import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import dotenv from 'dotenv';

import contactsRouter from './routers/contacts.js';

import { getEnvVar } from './utils/getEnvVar.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

dotenv.config();
const PORT = Number(getEnvVar('PORT', '7070'));

export function setupServer() {
  const app = express();

  app.use(
    express.json({
      type: ['application/json', 'application/vnd.api+json'],
      limit: '100kb',
    }),
  );
  app.use(cors());
  app.use(
    pino({
      transport: { target: 'pino-pretty' },
    }),
  );

  app.get('/', (req, res) => {
    res.status(200).json({
      status: 200,
      message: 'Hello World!',
      data: null,
    });
  });

  app.use(contactsRouter);

  app.use(notFoundHandler);

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
