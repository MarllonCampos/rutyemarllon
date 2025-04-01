import { PrismaClient } from '@prisma/client';

import { Request, Response } from 'express';

const index = async (_: any, res: Response) => {
  const prisma = new PrismaClient();
  const peoples = prisma.people;
  const people = await peoples.findMany();

  res.json({ message: people });
};

const deletePerson = async (req: Request, res: Response) => {
  const prisma = new PrismaClient();
  const people = prisma.people;
  const personExists = await people.findFirst({
    where: {
      id: Number(req.params.userId),
    },
  });
  if (!personExists) {
    res.json({ message: 'Usuário não encontrado' });
  } else {
    await people.delete({
      where: {
        id: Number(req.params.userId),
      },
    });
    res.json({ message: 'Usuario deletado com sucesso' });
  }
};

const createPerson = async (req: Request, res: Response) => {
  const prisma = new PrismaClient();
  const peoples = prisma.people;

  const personExists = await peoples.findFirst({
    where: {
      whatsApp: req.body.whatsapp,
    },
  });
  if (personExists) {
    return res.status(202).json({ message: 'Usuário já cadastrado', data: { ...personExists } });
  }

  const person = await peoples.create({
    data: {
      whatsApp: req.body.whatsapp,
      name: req.body.name,
      lastName: req.body.lastName,
    },
  });

  res.json({ message: 'Cadastrado com sucesso', data: { ...person } });
};

export { index, createPerson, deletePerson };
