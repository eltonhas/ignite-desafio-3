/*
  Warnings:

  - A unique constraint covering the columns `[name,address]` on the table `organizations` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "organizations_name_email_address_key";

-- CreateIndex
CREATE UNIQUE INDEX "organizations_name_address_key" ON "organizations"("name", "address");
