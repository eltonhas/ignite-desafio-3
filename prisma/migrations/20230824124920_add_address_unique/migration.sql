/*
  Warnings:

  - A unique constraint covering the columns `[address]` on the table `organizations` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "organizations_address_key" ON "organizations"("address");
