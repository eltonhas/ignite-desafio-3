/*
  Warnings:

  - You are about to drop the column `enregy_level` on the `pets` table. All the data in the column will be lost.
  - Added the required column `energy_level` to the `pets` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `size` on the `pets` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `dependency_level` on the `pets` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `environment` on the `pets` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "OPTIONS" AS ENUM ('P', 'M', 'G');

-- AlterTable
ALTER TABLE "pets" DROP COLUMN "enregy_level",
ADD COLUMN     "energy_level" INTEGER NOT NULL,
DROP COLUMN "size",
ADD COLUMN     "size" "OPTIONS" NOT NULL,
DROP COLUMN "dependency_level",
ADD COLUMN     "dependency_level" "OPTIONS" NOT NULL,
DROP COLUMN "environment",
ADD COLUMN     "environment" "OPTIONS" NOT NULL;
