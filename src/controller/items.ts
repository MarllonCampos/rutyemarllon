import { Prisma, PrismaClient} from '@prisma/client';

import { Request, Response } from 'express';

const index = async (_:any, res: Response) => {
    const prisma = new PrismaClient();
    const products = prisma.product;
    const items = await products.findMany()
    
    res.json({"message": items});
}

export { index }