/*
  Warnings:

  - You are about to drop the column `student` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `teacher` on the `Course` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_student_fkey";

-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_teacher_fkey";

-- DropIndex
DROP INDEX "Course_student_idx";

-- DropIndex
DROP INDEX "Course_teacher_idx";

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "student",
DROP COLUMN "teacher";

-- CreateTable
CREATE TABLE "_Course_student" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_Course_teacher" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_Course_student_AB_unique" ON "_Course_student"("A", "B");

-- CreateIndex
CREATE INDEX "_Course_student_B_index" ON "_Course_student"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Course_teacher_AB_unique" ON "_Course_teacher"("A", "B");

-- CreateIndex
CREATE INDEX "_Course_teacher_B_index" ON "_Course_teacher"("B");

-- AddForeignKey
ALTER TABLE "_Course_student" ADD FOREIGN KEY ("A") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Course_student" ADD FOREIGN KEY ("B") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Course_teacher" ADD FOREIGN KEY ("A") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Course_teacher" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
