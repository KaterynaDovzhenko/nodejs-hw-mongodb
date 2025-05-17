import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import dotenv from 'dotenv';
import { getEnvVar } from './utils/getEnvVar.js';
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
    res.status(200).json({
      status: 200,
      message: 'Hello World!',
      data: null,
    });
  });

  app.get('/contacts', async (req, res) => {
    const contacts = await getAllContacts();

    res.status(200).json({
      status: 200,
      message: 'Contacts successfully retrieved',
      data: contacts,
    });
  });

  app.get('/contacts/:contactId', async (req, res) => {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);

    if (!contact) {
      return res.status(404).json({
        status: 404,
        message: "Contact wasn't found, try again :(",
        data: null,
      });
    }

    res.status(200).json({
      status: 200,
      message: 'Contact successfully retrieved',
      data: contact,
    });
  });

  app.use((req, res) => {
    res.status(404).json({
      status: 404,
      message: 'Route not found',
      data: null,
    });
  });

  app.use((err, req, res, next) => {
    res.status(500).json({
      status: 500,
      message: 'Something went wrong (',
      data: { error: err.message },
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
