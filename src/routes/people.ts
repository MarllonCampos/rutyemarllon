import { Router, Request, Response } from 'express';

import { index, createPerson, deletePerson } from '../controller/people';

const people = Router();
people.get('/', (req: Request, res: Response) => {
  index(req, res);
});
people.post('/', (req: Request, res: Response) => {
  createPerson(req, res);
});
people.delete('/:userId', (req: Request, res: Response) => {
  deletePerson(req, res);
});

export { people };
