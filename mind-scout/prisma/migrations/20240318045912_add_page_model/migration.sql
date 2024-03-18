-- CreateTable
CREATE TABLE `Page` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(255) NULL,
    `description` VARCHAR(255) NULL,
    `content` TEXT NULL,
    `status` ENUM('IN_PROGRESS', 'ARCHIEVED') NOT NULL DEFAULT 'IN_PROGRESS',
    `scope` ENUM('PUBLIC', 'PROTECTED', 'PRIVATE') NOT NULL DEFAULT 'PROTECTED',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
