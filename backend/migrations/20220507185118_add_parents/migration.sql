-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "parents" INTEGER;

-- CreateTable
CREATE TABLE "Parent" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL DEFAULT E'',
    "lastName" TEXT NOT NULL DEFAULT E'',
    "email" TEXT NOT NULL DEFAULT E'',
    "isPaid" BOOLEAN NOT NULL DEFAULT false,
    "totalOwed" TEXT NOT NULL DEFAULT E'',

    CONSTRAINT "Parent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_Parent_children" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE INDEX "Parent_email_idx" ON "Parent"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_Parent_children_AB_unique" ON "_Parent_children"("A", "B");

-- CreateIndex
CREATE INDEX "_Parent_children_B_index" ON "_Parent_children"("B");

-- CreateIndex
CREATE INDEX "Student_parents_idx" ON "Student"("parents");

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_parents_fkey" FOREIGN KEY ("parents") REFERENCES "Parent"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Parent_children" ADD FOREIGN KEY ("A") REFERENCES "Parent"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Parent_children" ADD FOREIGN KEY ("B") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;
