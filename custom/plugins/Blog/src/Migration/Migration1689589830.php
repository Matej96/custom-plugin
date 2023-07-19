<?php declare(strict_types=1);

namespace Blog\Migration;

use Doctrine\DBAL\Connection;
use Shopware\Core\Framework\Migration\MigrationStep;

class Migration1689589830 extends MigrationStep
{
    public function getCreationTimestamp(): int
    {
        return 1689589830;
    }

    public function update(Connection $connection): void
    {
        // implement update
    }

    public function updateDestructive(Connection $connection): void
    {
        // implement update destructive
    }
}
