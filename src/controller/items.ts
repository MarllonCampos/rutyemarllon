import { Prisma, PrismaClient} from '@prisma/client';

import { Request, Response } from 'express';

const index = async (_:any, res: Response) => {
    const prisma = new PrismaClient();
    const products = prisma.product;
    const items = await products.findMany()
    
    res.json({"message": items});
}

const findItems = async (req: Request, res: Response) => {
    const prisma = new PrismaClient();
    const products = prisma.product;
    const items = await products.findMany({
        where:{
            id:{
                in: req.body.id
            }
        }
    })
    
    res.json({"message": items});
}

const findReserved = async (req: Request, res: Response) => {
    const prisma = new PrismaClient();
    const products = prisma.product;
    const items = await products.findMany({
        where:{
            reservedPeopleId:{
                equals: Number(req.params.peopleId)
            }
        }
    })
    
    res.json({"message": items});
}

export { index, findItems, findReserved }