-- CreateTable
CREATE TABLE `lottery` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NULL,
    `image` VARCHAR(255) NULL,
    `start_date` TIMESTAMP(0) NULL,
    `end_date` TIMESTAMP(0) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `lottery_race_prizes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `race` INTEGER NULL,
    `prize` VARCHAR(255) NULL,
    `person` INTEGER NULL,

    INDEX `race_idx`(`race`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `lottery_race_winners` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `race_prize` INTEGER NULL,
    `user` INTEGER NULL,

    INDEX `race_prize_idx`(`race_prize`),
    INDEX `user_idx`(`user`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `lottery_races` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `lottery` INTEGER NULL,
    `race` VARCHAR(100) NULL,

    INDEX `lottery_idx`(`lottery`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `lottery_users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `lottery` INTEGER NULL,
    `user` INTEGER NULL,
    `ebarimt_img` VARCHAR(255) NULL,
    `image` VARCHAR(255) NULL,
    `isAllow` INTEGER NULL,
    `date` TIMESTAMP(0) NULL,

    INDEX `lottery_idx`(`lottery`),
    INDEX `user_idx`(`user`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `firstname` VARCHAR(100) NULL,
    `lastname` VARCHAR(100) NULL,
    `phone` VARCHAR(15) NULL,
    `password` VARCHAR(500) NULL,
    `token` VARCHAR(505) NULL,
    `role` ENUM('admin', 'user') NULL,
    `create_date` TIMESTAMP(0) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `lottery_race_prizes` ADD CONSTRAINT `fk_race` FOREIGN KEY (`race`) REFERENCES `lottery_races`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `lottery_race_winners` ADD CONSTRAINT `fk_race_prize` FOREIGN KEY (`race_prize`) REFERENCES `lottery_race_prizes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `lottery_race_winners` ADD CONSTRAINT `fk_user` FOREIGN KEY (`user`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `lottery_races` ADD CONSTRAINT `fk_lottery` FOREIGN KEY (`lottery`) REFERENCES `lottery`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `lottery_users` ADD CONSTRAINT `fk_lottery_constraint` FOREIGN KEY (`lottery`) REFERENCES `lottery`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `lottery_users` ADD CONSTRAINT `fk_user_constraint` FOREIGN KEY (`user`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
