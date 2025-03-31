import { Prisma, PrismaClient } from '@prisma/client';

import { NextFunction, Request, Response } from 'express';
import { sendMessage } from '../services/sendWhatsapp';
import { formatMessage } from '../services/formatMessage';

const index = async (_: any, res: Response) => {
  const prisma = new PrismaClient();
  const products = prisma.product;
  const items = await products.findMany();

  res.json({ message: items });
};

const findItems = async (req: Request, res: Response) => {
  const prisma = new PrismaClient();
  const products = prisma.product;
  const items = await products.findMany({
    where: {
      id: {
        in: req.body.id,
      },
    },
  });

  res.json({ message: items });
};

const findReserved = async (req: Request, res: Response) => {
  const prisma = new PrismaClient();
  const products = prisma.product;
  const items = await products.findMany({
    where: {
      reservedPeopleId: {
        equals: Number(req.params.peopleId),
      },
    },
  });

  res.json({ message: items });
};

const reserve = async (req: Request, res: Response, next: NextFunction) => {
  const prisma = new PrismaClient();
  const products = prisma.product;
  const items = await products.updateManyAndReturn({
    where: {
      id: {
        in: req.body.id,
      },
    },
    data: {
      reserved: true,
      reservedPeopleId: req.body.peopleId,
    },
    include: {
      reservedPerson: true,
    },
  });
  if (items.length < 1) {
    res.status(422).json({ message: `Não há itens reservados` });
    return;
  }

  if (!items[0].reservedPerson) {
    res.status(422).json({ message: `Não há WhatsApp cadastrado` });
    return;
  }

  const name = `${items[0].reservedPerson?.name} ${items[0].reservedPerson?.lastName}`;
  const whatsApp = items[0].reservedPerson?.whatsApp;

  const formatedMessage = formatMessage(items);
  await sendMessage({ items: formatedMessage, receiverName: name, to: whatsApp });

  res.json({
    message: 'Itens reservados',
    data: items.map((item) => ({ name: item.name, description: item.description, person: item.reservedPerson })),
  });
};

export { index, findItems, findReserved, reserve };
