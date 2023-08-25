/*
  Warnings:

  - Changed the type of `age` on the `pets` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "AGE_OPTIONS" AS ENUM ('CUB', 'ADULT', 'OLD');

-- AlterTable
ALTER TABLE "pets" DROP COLUMN "age",
ADD COLUMN     "age" "AGE_OPTIONS" NOT NULL;
