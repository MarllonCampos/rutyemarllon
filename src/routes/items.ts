import { Router, Request, Response } from 'express';

import { index, findItems, findReserved } from '../controller/items'

const items = Router();

items.get('/', index)
items.post('/', findItems)
items.post('/:peopleId', findReserved)

export { items }