/*
  Warnings:

  - A unique constraint covering the columns `[name,email,address]` on the table `organizations` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "organizations_name_email_address_key" ON "organizations"("name", "email", "address");
