/*
  Warnings:

  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.
  - Made the column `name` on table `Role` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_role_fkey";

-- DropIndex
DROP INDEX "User_role_idx";

-- AlterTable
ALTER TABLE "Role" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "name" SET DEFAULT E'';

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role";

-- CreateTable
CREATE TABLE "_User_role" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_User_role_AB_unique" ON "_User_role"("A", "B");

-- CreateIndex
CREATE INDEX "_User_role_B_index" ON "_User_role"("B");

-- AddForeignKey
ALTER TABLE "_User_role" ADD FOREIGN KEY ("A") REFERENCES "Role"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_User_role" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
