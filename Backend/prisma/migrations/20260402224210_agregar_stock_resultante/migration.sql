/*
  Warnings:

  - Added the required column `stockResultante` to the `MovimientoInventario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MovimientoInventario" ADD COLUMN     "stockResultante" INTEGER NOT NULL;
