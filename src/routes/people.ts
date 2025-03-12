import { Router, Request, Response } from 'express';

import { index, createPerson } from '../controller/people'

const people = Router();

people.get('/', index)
people.post('/', createPerson)

export { people }