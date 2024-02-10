/*
  Warnings:

  - You are about to drop the column `companyId` on the `Bus` table. All the data in the column will be lost.
  - You are about to drop the column `registeredById` on the `Bus` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Bus" DROP CONSTRAINT "Bus_companyId_fkey";

-- DropForeignKey
ALTER TABLE "Bus" DROP CONSTRAINT "Bus_registeredById_fkey";

-- DropForeignKey
ALTER TABLE "Schedule" DROP CONSTRAINT "Schedule_busId_fkey";

-- AlterTable
ALTER TABLE "Bus" DROP COLUMN "companyId",
DROP COLUMN "registeredById";
