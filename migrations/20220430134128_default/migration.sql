/*
  Warnings:

  - You are about to drop the column `courses` on the `Student` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[student]` on the table `Course` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_courses_fkey";

-- DropIndex
DROP INDEX "Student_courses_idx";

-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "student" INTEGER;

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "courses";

-- CreateIndex
CREATE UNIQUE INDEX "Course_student_key" ON "Course"("student");

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_student_fkey" FOREIGN KEY ("student") REFERENCES "Student"("id") ON DELETE SET NULL ON UPDATE CASCADE;
