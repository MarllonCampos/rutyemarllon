-- AlterTable
ALTER TABLE "products" ALTER COLUMN "reservedPeopleId" DROP NOT NULL,
ALTER COLUMN "reservedPeopleId" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_reservedPeopleId_fkey" FOREIGN KEY ("reservedPeopleId") REFERENCES "people"("id") ON DELETE SET NULL ON UPDATE CASCADE;
