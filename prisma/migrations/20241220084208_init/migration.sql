-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Feature` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `enabled` BOOLEAN NOT NULL,

    UNIQUE INDEX `Feature_name_key`(`name`),
    INDEX `Feature_id_idx`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AuditLog` (
    `id` VARCHAR(191) NOT NULL,
    `featureName` VARCHAR(191) NOT NULL,
    `previousState` BOOLEAN NOT NULL,
    `newState` BOOLEAN NOT NULL,
    `changedBy` VARCHAR(191) NOT NULL,
    `timestamp` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `AuditLog` ADD CONSTRAINT `AuditLog_featureName_fkey` FOREIGN KEY (`featureName`) REFERENCES `Feature`(`name`) ON DELETE RESTRICT ON UPDATE CASCADE;
