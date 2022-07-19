/*
  Warnings:

  - The primary key for the `Course` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Course` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `student` column on the `Course` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `teacher` column on the `Course` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Student` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Student` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_student_fkey";

-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_teacher_fkey";

-- AlterTable
ALTER TABLE "Course" DROP CONSTRAINT "Course_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "student",
ADD COLUMN     "student" INTEGER,
DROP COLUMN "teacher",
ADD COLUMN     "teacher" INTEGER,
ADD CONSTRAINT "Course_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Student" DROP CONSTRAINT "Student_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Student_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE INDEX "Course_student_idx" ON "Course"("student");

-- CreateIndex
CREATE INDEX "Course_teacher_idx" ON "Course"("teacher");

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_teacher_fkey" FOREIGN KEY ("teacher") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_student_fkey" FOREIGN KEY ("student") REFERENCES "Student"("id") ON DELETE SET NULL ON UPDATE CASCADE;
