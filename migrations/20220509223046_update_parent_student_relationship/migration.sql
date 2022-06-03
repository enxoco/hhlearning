/*
  Warnings:

  - You are about to drop the column `parents` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the `Parent` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_Parent_children` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_parents_fkey";

-- DropForeignKey
ALTER TABLE "_Parent_children" DROP CONSTRAINT "_Parent_children_A_fkey";

-- DropForeignKey
ALTER TABLE "_Parent_children" DROP CONSTRAINT "_Parent_children_B_fkey";

-- DropIndex
DROP INDEX "Student_parents_idx";

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "parents";

-- DropTable
DROP TABLE "Parent";

-- DropTable
DROP TABLE "_Parent_children";

-- CreateTable
CREATE TABLE "_Student_parent" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_Student_parent_AB_unique" ON "_Student_parent"("A", "B");

-- CreateIndex
CREATE INDEX "_Student_parent_B_index" ON "_Student_parent"("B");

-- AddForeignKey
ALTER TABLE "_Student_parent" ADD FOREIGN KEY ("A") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Student_parent" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
