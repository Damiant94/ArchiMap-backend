import express from 'express';
import { body } from 'express-validator';
import bodyParser from "body-parser";

import { addObject, getCountries, getObject, getObjects } from '../controllers/feed';

const router = express.Router();
const jsonParser = bodyParser.json()

router.post(
  '/add-object',
  jsonParser,
  [
    body('name').isLength({ min: 3, max: 25 }),
    body('description').isLength({ min: 3, max: 1000 })
  ],
  addObject
);

router.get('/get-objects', getObjects);

router.get('/get-countries', getCountries);

router.get('/get-object/:objectId', getObject);

export default router;
