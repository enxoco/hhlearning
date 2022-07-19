-- AlterTable
ALTER TABLE "User" ADD COLUMN     "firstName" TEXT NOT NULL DEFAULT E'',
ADD COLUMN     "lastName" TEXT NOT NULL DEFAULT E'',
ADD COLUMN     "role" INTEGER;

-- CreateTable
CREATE TABLE "Role" (
    "id" SERIAL NOT NULL,
    "name" TEXT,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "User_role_idx" ON "User"("role");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_role_fkey" FOREIGN KEY ("role") REFERENCES "Role"("id") ON DELETE SET NULL ON UPDATE CASCADE;
