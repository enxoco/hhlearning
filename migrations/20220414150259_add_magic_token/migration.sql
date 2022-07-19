-- AlterTable
ALTER TABLE "User" ADD COLUMN     "magicAuthIssuedAt" TIMESTAMP(3),
ADD COLUMN     "magicAuthRedeemedAt" TIMESTAMP(3),
ADD COLUMN     "magicAuthToken" TEXT;
