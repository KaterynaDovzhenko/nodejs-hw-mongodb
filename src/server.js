import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import dotenv from 'dotenv';
import { getEnvVar } from './utils/getEnvVar';
import { getAllContacts, getContactById } from './services/contacts.js';

dotenv.config();
const PORT = Number(getEnvVar('PORT', '7070'));

export function setupServer() {
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use(
    pino({
      transport: { target: 'pino-pretty' },
    }),
  );

  app.get('/', (req, res) => {
    res.json({
      message: 'Hello World!',
    });
  });

  app.use((err, req, res, next) => {
    res.status(404).json({
      message: 'Route not found',
      error: err.message,
    });
  });
  app.use((err, req, res, next) => {
    res.status(500).json({
      message: 'Something went wrong (',
      error: err.message,
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

  app.get('/contacts', async (req, res) => {
    const contacts = await getAllContacts();

    res.status(200).json({
      data: contacts,
    });
  });

  app.get('contacts/:contactId', async (req, res) => {
    const { contactId } = req.params;
    const contact = getContactById(contactId);

    if (!contact) {
      res.status(404).json({
        message: "Contact wasn't found, try again :(",
      });

      res.status(200).json({
        data: contact,
      });
    }
  });
}
