/*
  Warnings:

  - You are about to drop the `_Course_student` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_Course_teacher` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_Course_student" DROP CONSTRAINT "_Course_student_A_fkey";

-- DropForeignKey
ALTER TABLE "_Course_student" DROP CONSTRAINT "_Course_student_B_fkey";

-- DropForeignKey
ALTER TABLE "_Course_teacher" DROP CONSTRAINT "_Course_teacher_A_fkey";

-- DropForeignKey
ALTER TABLE "_Course_teacher" DROP CONSTRAINT "_Course_teacher_B_fkey";

-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "student" INTEGER,
ADD COLUMN     "teacher" INTEGER;

-- DropTable
DROP TABLE "_Course_student";

-- DropTable
DROP TABLE "_Course_teacher";

-- CreateIndex
CREATE INDEX "Course_student_idx" ON "Course"("student");

-- CreateIndex
CREATE INDEX "Course_teacher_idx" ON "Course"("teacher");

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_teacher_fkey" FOREIGN KEY ("teacher") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_student_fkey" FOREIGN KEY ("student") REFERENCES "Student"("id") ON DELETE SET NULL ON UPDATE CASCADE;
