-- CreateTable
CREATE TABLE "Setting" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL DEFAULT E'',
    "value" TEXT NOT NULL DEFAULT E'',

    CONSTRAINT "Setting_pkey" PRIMARY KEY ("id")
);
