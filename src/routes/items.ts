import { Router, Request, Response } from 'express';

import { index, findItems, findReserved, reserve } from '../controller/items'

const items = Router();

items.get('/', index)
items.post('/', findItems)
items.post('/:peopleId', findReserved)
items.patch('/reserve', reserve)

export { items }