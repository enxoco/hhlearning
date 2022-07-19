/*
  Warnings:

  - You are about to drop the `_Student_parent` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_Student_parent" DROP CONSTRAINT "_Student_parent_A_fkey";

-- DropForeignKey
ALTER TABLE "_Student_parent" DROP CONSTRAINT "_Student_parent_B_fkey";

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "parent" INTEGER;

-- DropTable
DROP TABLE "_Student_parent";

-- CreateIndex
CREATE INDEX "Student_parent_idx" ON "Student"("parent");

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_parent_fkey" FOREIGN KEY ("parent") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
