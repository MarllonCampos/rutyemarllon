import { PrismaClient } from "@prisma/client";
import * as fs from "fs";
import * as path from "path";
import csv from "csv-parser";

const prisma = new PrismaClient();

async function main() {
    const csvFilePath = path.join(__dirname, "../product.csv");
    const records: any[] = [];

    await new Promise((resolve, reject) => {
        fs.createReadStream(csvFilePath)
            .pipe(csv())
            .on("data", (row) => {
                records.push({
                    name: row.name,
                    description: row.description || "",
                    imageurl: row.imageurl,
                });
            })
            .on("end", resolve)
            .on("error", reject);
    });
    
    await prisma.product.createMany({
        data: records
    });

    console.log("Seed executado com sucesso!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
