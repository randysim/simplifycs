/*
  Warnings:

  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `passwordSalt` on the `User` table. All the data in the column will be lost.
  - Added the required column `passwordHashed` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "passwordHashed" TEXT NOT NULL,
    "authToken" TEXT NOT NULL
);
INSERT INTO "new_User" ("authToken", "email", "firstName", "id", "lastName", "username") SELECT "authToken", "email", "firstName", "id", "lastName", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
CREATE UNIQUE INDEX "User_authToken_key" ON "User"("authToken");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
