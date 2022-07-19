-- CreateTable
CREATE TABLE "Semester" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL DEFAULT E'',

    CONSTRAINT "Semester_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReportCardSetting" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL DEFAULT E'',
    "address" TEXT NOT NULL DEFAULT E'',
    "semester" INTEGER,

    CONSTRAINT "ReportCardSetting_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ReportCardSetting_semester_idx" ON "ReportCardSetting"("semester");

-- AddForeignKey
ALTER TABLE "ReportCardSetting" ADD CONSTRAINT "ReportCardSetting_semester_fkey" FOREIGN KEY ("semester") REFERENCES "Semester"("id") ON DELETE SET NULL ON UPDATE CASCADE;
