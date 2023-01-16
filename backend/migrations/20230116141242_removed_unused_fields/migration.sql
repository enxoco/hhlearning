/*
  Warnings:

  - You are about to drop the column `city` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `phoneFather` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `phoneMother` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `street` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `zipcode` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "city",
DROP COLUMN "phone",
DROP COLUMN "phoneFather",
DROP COLUMN "phoneMother",
DROP COLUMN "state",
DROP COLUMN "street",
DROP COLUMN "zipcode",
ADD COLUMN     "coParent" TEXT NOT NULL DEFAULT E'';

-- CreateTable
CREATE TABLE "Family" (
    "id" SERIAL NOT NULL,
    "parents" TEXT NOT NULL DEFAULT E'',

    CONSTRAINT "Family_pkey" PRIMARY KEY ("id")
);
