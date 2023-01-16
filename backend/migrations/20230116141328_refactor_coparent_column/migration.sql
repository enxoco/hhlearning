/*
  Warnings:

  - You are about to drop the column `coParent` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "coParent",
ADD COLUMN     "coParents" JSONB DEFAULT '[]';
