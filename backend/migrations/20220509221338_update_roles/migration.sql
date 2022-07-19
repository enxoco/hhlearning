-- AlterTable
ALTER TABLE "User" ADD COLUMN     "hasPaidTuition" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isParent" BOOLEAN NOT NULL DEFAULT false;
