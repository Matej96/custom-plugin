<?php declare(strict_types=1);

namespace Blog\Migration;

use Doctrine\DBAL\Connection;
use Shopware\Core\Framework\Migration\MigrationStep;

class Migration1689590054 extends MigrationStep
{
    public function getCreationTimestamp(): int
    {
        return 1689590054;
    }

    public function update(Connection $connection): void
    {
        $connection->executeStatement('
            DROP TABLE IF EXISTS `custom_blog`;
        ');

        $connection->executeStatement('
            CREATE TABLE IF NOT EXISTS `custom_blog` (
                `id` BINARY(16) NOT NULL,
                `title` VARCHAR(255) NULL,
                `author` VARCHAR(255) NULL,
                `description` VARCHAR(255) NULL,
                `media_id` BINARY(16) NULL,
                `second_media_id` BINARY(16) NULL,
                `created_at` DATETIME(3) NOT NULL,
                `updated_at` DATETIME(3) NULL,
                PRIMARY KEY (`id`),
                CONSTRAINT `fk.custom_blog.media_id` FOREIGN KEY (`media_id`) REFERENCES `media` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
                CONSTRAINT `fk.custom_blog.second_media_id` FOREIGN KEY (`second_media_id`) REFERENCES `media` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        ');
    }

    public function updateDestructive(Connection $connection): void
    {
        // implement update destructive
    }
}
