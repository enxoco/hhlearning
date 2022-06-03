/*
  Warnings:

  - You are about to drop the column `name` on the `Course` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Course" DROP COLUMN "name",
ADD COLUMN     "firstName" TEXT NOT NULL DEFAULT E'',
ADD COLUMN     "lastName" TEXT NOT NULL DEFAULT E'';
