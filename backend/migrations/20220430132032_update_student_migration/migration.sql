/*
  Warnings:

  - A unique constraint covering the columns `[student]` on the table `Course` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Course_student_idx";

-- CreateIndex
CREATE UNIQUE INDEX "Course_student_key" ON "Course"("student");
