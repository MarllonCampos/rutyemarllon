import { Router } from 'express';

import { index, createPerson, deletePerson } from '../controller/people';

const people = Router();

people.get('/', index);
people.post('/', createPerson);
people.delete('/:userId', deletePerson);

export { people };
