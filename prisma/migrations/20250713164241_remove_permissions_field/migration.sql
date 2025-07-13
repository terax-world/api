/*
  Warnings:

  - You are about to drop the column `preferenceId` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `promoPrice` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Invoice" DROP COLUMN "preferenceId";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "promoPrice";
