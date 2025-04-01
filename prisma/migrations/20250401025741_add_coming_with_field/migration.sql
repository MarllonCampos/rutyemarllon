-- CreateTable
CREATE TABLE "attendance" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "whatsApp" TEXT,
    "comingWithId" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "attendance_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "attendance" ADD CONSTRAINT "attendance_comingWithId_fkey" FOREIGN KEY ("comingWithId") REFERENCES "attendance"("id") ON DELETE SET NULL ON UPDATE CASCADE;
