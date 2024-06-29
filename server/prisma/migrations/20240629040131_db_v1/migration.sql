/*
  Warnings:

  - The primary key for the `Company` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `companyId` on the `FinancialData` table. All the data in the column will be lost.
  - Added the required column `corpCode` to the `FinancialData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isQuarterlyData` to the `FinancialData` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `FinancialData` DROP FOREIGN KEY `FinancialData_companyId_fkey`;

-- DropIndex
DROP INDEX `Company_corpCode_key` ON `Company`;

-- AlterTable
ALTER TABLE `Company` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD PRIMARY KEY (`corpCode`);

-- AlterTable
ALTER TABLE `FinancialData` DROP COLUMN `companyId`,
    ADD COLUMN `corpCode` VARCHAR(191) NOT NULL,
    ADD COLUMN `isQuarterlyData` BOOLEAN NOT NULL,
    MODIFY `year` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `FinancialData` ADD CONSTRAINT `FinancialData_corpCode_fkey` FOREIGN KEY (`corpCode`) REFERENCES `Company`(`corpCode`) ON DELETE RESTRICT ON UPDATE CASCADE;
