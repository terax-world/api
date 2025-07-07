/*
  Warnings:

  - You are about to drop the `PaymentHistory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "PaymentHistory";

-- CreateTable
CREATE TABLE "Invoice" (
    "id" UUID NOT NULL,
    "playerNick" TEXT NOT NULL,
    "productId" UUID NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "paymentType" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "paymentDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "paymentLink" TEXT NOT NULL,
    "mpTransactionId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
