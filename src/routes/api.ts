import { Router } from 'express';

import * as ApiController from '../controllers/apiController';

const router = Router();

router.get('/povcharacters', ApiController.mainCharacters);
router.get('/covers', ApiController.covers);
router.get('/characters', ApiController.characters);
router.get('/books/:id', ApiController.booksCharacter);

export default router;