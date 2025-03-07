import { Router, Request, Response } from 'express';

import { index } from '../controller/items'

const items = Router();

items.get('/', index)

export { items }