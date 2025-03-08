-- AlterTable
ALTER TABLE "products" ADD COLUMN     "reserved" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "reservedPeopleId" INTEGER NOT NULL DEFAULT 0;
