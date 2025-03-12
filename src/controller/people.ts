import { Prisma, PrismaClient} from '@prisma/client';

import { Request, Response } from 'express';

const index = async (_:any, res: Response) => {
    const prisma = new PrismaClient();
    const peoples = prisma.people;
    const people = await peoples.findMany()
    
    res.json({message: people});
}

const createPerson = async (req: Request, res: Response) => {
    const prisma = new PrismaClient();
    const peoples = prisma.people;
    const person = await peoples.create({
       data:{
            'email': req.body.email,
            'whatsApp': req.body.whatsApp,
            'name': req.body.name,
            'lastName': req.body.lastName
       }
    })
    
    res.json({message: 'Cadastrado com sucesso', data: person});
}

export { index, createPerson }