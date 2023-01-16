/*
  Warnings:

  - You are about to drop the column `name` on the `Semester` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Semester" DROP COLUMN "name",
ADD COLUMN     "reportCardTitle" TEXT NOT NULL DEFAULT E'',
ADD COLUMN     "semester" TEXT NOT NULL DEFAULT E'',
ADD COLUMN     "year" INTEGER;
