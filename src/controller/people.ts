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

type Attendee = {
  name: string;
  whatsapp: string | null;
};
type Guest = Omit<Attendee, 'whatsapp'> & {
  comingWithId: number;
};

type RegisterBody = Attendee & {
  guests: Guest[];
};

const registerAttendance = async (req: Request, res: Response) => {
  const prisma = new PrismaClient();
  try {
    const { name, whatsapp, guests }: RegisterBody = req.body;

    // Validação básica
    if (!name) {
      return res.status(400).json({ message: 'O campo "name" é obrigatório.' });
    }

    const attendance = await prisma.attendance.create({
      data: {
        name,
        whatsApp: whatsapp || null,
      },
    });

    if (attendance && guests.length > 0) {
      await prisma.attendance.createMany({
        data: guests.map((guest: Guest) => ({
          name: guest.name,
          comingWithId: attendance.id,
        })),
      });
    }

    res.status(201).json({ message: 'Presença registrada com sucesso.', data: attendance });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao registrar presença.', error });
  }
};

export { index, createPerson, deletePerson, registerAttendance };
