<?php declare(strict_types=1);

namespace Blog\Migration;

use Doctrine\DBAL\Connection;
use Shopware\Core\Framework\Migration\MigrationStep;

class Migration1689166926 extends MigrationStep
{
    public function getCreationTimestamp(): int
    {
        return 1689166926;
    }

    public function update(Connection $connection): void
    {
        $connection->executeStatement('
        CREATE TABLE `custom_blog` (
            `id` BINARY(16) NOT NULL,
            `title` VARCHAR(255) NULL,
            `author` VARCHAR(255) NULL,
            `description` VARCHAR(255) NULL,
            `created_at` DATETIME(3) NOT NULL,
            `updated_at` DATETIME(3) NULL,
            PRIMARY KEY (`id`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        ');
    }

    public function updateDestructive(Connection $connection): void
    {
        // implement update destructive
    }
}
