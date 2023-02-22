-- CreateTable
CREATE TABLE "Verify" (
    "email" TEXT NOT NULL,
    "verificationKey" TEXT NOT NULL,
    "verificationExpirationTime" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "passwordSalt" TEXT NOT NULL,
    "authToken" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Verify_email_key" ON "Verify"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
