/*
  Warnings:

  - You are about to drop the column `invite_token` on the `Room` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[exclusive]` on the table `Room` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[ordinary]` on the table `Room` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `exclusive` to the `Room` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ordinary` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Room_invite_token_key";

-- AlterTable
ALTER TABLE "Room" DROP COLUMN "invite_token",
ADD COLUMN     "exclusive" TEXT NOT NULL,
ADD COLUMN     "ordinary" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'USER';

-- CreateIndex
CREATE UNIQUE INDEX "Room_exclusive_key" ON "Room"("exclusive");

-- CreateIndex
CREATE UNIQUE INDEX "Room_ordinary_key" ON "Room"("ordinary");
