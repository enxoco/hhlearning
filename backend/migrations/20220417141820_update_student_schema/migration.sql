/*
  Warnings:

  - You are about to drop the column `firstName` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Student` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Course" DROP COLUMN "firstName",
DROP COLUMN "lastName",
ADD COLUMN     "name" TEXT NOT NULL DEFAULT E'';

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "name",
ADD COLUMN     "firstName" TEXT NOT NULL DEFAULT E'',
ADD COLUMN     "lastName" TEXT NOT NULL DEFAULT E'';
