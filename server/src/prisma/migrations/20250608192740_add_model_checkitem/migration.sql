/*
  Warnings:

  - You are about to drop the column `checkList` on the `Task` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Task" DROP COLUMN "checkList";

-- CreateTable
CREATE TABLE "CheckItem" (
    "id" TEXT NOT NULL,
    "task_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "CheckItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CheckItem_task_id_key" ON "CheckItem"("task_id");

-- AddForeignKey
ALTER TABLE "CheckItem" ADD CONSTRAINT "CheckItem_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
