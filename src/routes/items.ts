import { Router, Request, Response } from 'express';

import { index, findItems, findReserved, reserve } from '../controller/items';

const items = Router();

items.get('/', (req: Request, res: Response) => {
  index(req, res);
});
items.post('/', (req: Request, res: Response) => {
  findItems(req, res);
});
items.post('/:peopleId', (req: Request, res: Response) => {
  findReserved(req, res);
});
items.patch('/reserve', (req: Request, res: Response) => {
  reserve(req, res);
});

export { items };
