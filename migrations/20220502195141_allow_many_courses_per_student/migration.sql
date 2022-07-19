-- DropIndex
DROP INDEX "Course_student_key";

-- CreateIndex
CREATE INDEX "Course_student_idx" ON "Course"("student");
