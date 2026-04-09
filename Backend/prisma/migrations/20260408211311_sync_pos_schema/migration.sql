/*
  Warnings:

  - You are about to drop the column `precioCompra` on the `Producto` table. All the data in the column will be lost.
  - You are about to drop the column `precioVenta` on the `Producto` table. All the data in the column will be lost.
  - You are about to alter the column `total` on the `Venta` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.
  - You are about to drop the `VentaDetalle` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `precio` to the `Producto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `metodoPago` to the `Venta` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "MetodoPago" AS ENUM ('efectivo', 'transferencia');

-- DropForeignKey
ALTER TABLE "VentaDetalle" DROP CONSTRAINT "VentaDetalle_productoId_fkey";

-- DropForeignKey
ALTER TABLE "VentaDetalle" DROP CONSTRAINT "VentaDetalle_ventaId_fkey";

-- AlterTable
ALTER TABLE "Producto" DROP COLUMN "precioCompra",
DROP COLUMN "precioVenta",
ADD COLUMN     "precio" DECIMAL(65,30) NOT NULL;

-- AlterTable
ALTER TABLE "Venta" ADD COLUMN     "metodoPago" "MetodoPago" NOT NULL,
ALTER COLUMN "total" SET DATA TYPE DECIMAL(65,30);

-- DropTable
DROP TABLE "VentaDetalle";

-- CreateTable
CREATE TABLE "DetalleVenta" (
    "id" SERIAL NOT NULL,
    "ventaId" INTEGER NOT NULL,
    "productoId" INTEGER NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "precioUnitario" DECIMAL(65,30) NOT NULL,
    "subtotal" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "DetalleVenta_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "DetalleVenta_ventaId_idx" ON "DetalleVenta"("ventaId");

-- CreateIndex
CREATE INDEX "DetalleVenta_productoId_idx" ON "DetalleVenta"("productoId");

-- AddForeignKey
ALTER TABLE "DetalleVenta" ADD CONSTRAINT "DetalleVenta_ventaId_fkey" FOREIGN KEY ("ventaId") REFERENCES "Venta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetalleVenta" ADD CONSTRAINT "DetalleVenta_productoId_fkey" FOREIGN KEY ("productoId") REFERENCES "Producto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
