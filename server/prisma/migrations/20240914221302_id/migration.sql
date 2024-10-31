/*
  Warnings:

  - The primary key for the `library` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `librarycomplete` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "library" DROP CONSTRAINT "library_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "library_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "librarycomplete" DROP CONSTRAINT "librarycomplete_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "librarycomplete_pkey" PRIMARY KEY ("id");
