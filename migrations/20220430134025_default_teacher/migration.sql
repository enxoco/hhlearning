/*
  Warnings:

  - You are about to drop the column `student` on the `Course` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_student_fkey";

-- DropIndex
DROP INDEX "Course_student_key";

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "student";

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "courses" INTEGER;

-- CreateIndex
CREATE INDEX "Student_courses_idx" ON "Student"("courses");

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_courses_fkey" FOREIGN KEY ("courses") REFERENCES "Course"("id") ON DELETE SET NULL ON UPDATE CASCADE;
