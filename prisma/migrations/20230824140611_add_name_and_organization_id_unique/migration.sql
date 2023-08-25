/*
  Warnings:

  - A unique constraint covering the columns `[name,organization_id]` on the table `pets` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "pets_name_organization_id_key" ON "pets"("name", "organization_id");
