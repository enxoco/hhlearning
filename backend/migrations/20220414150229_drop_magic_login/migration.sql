/*
  Warnings:

  - You are about to drop the column `magicAuthIssuedAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `magicAuthRedeemedAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `magicAuthToken` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "magicAuthIssuedAt",
DROP COLUMN "magicAuthRedeemedAt",
DROP COLUMN "magicAuthToken";
