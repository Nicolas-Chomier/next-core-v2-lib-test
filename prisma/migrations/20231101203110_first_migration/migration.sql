-- CreateTable
CREATE TABLE "appUsers" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT NOT NULL,
    "rank" TEXT NOT NULL DEFAULT 'guest',

    CONSTRAINT "appUsers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "appData" (
    "id" SERIAL NOT NULL,
    "date" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "file_number" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "lat" DOUBLE PRECISION NOT NULL,
    "lon" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "appData_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "appUsers_email_key" ON "appUsers"("email");
