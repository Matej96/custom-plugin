<?php

namespace Devsk\OhDearHealthCheck\Service;

use DateTime;
use Shopware\Core\Kernel;
use Symfony\Component\HttpFoundation\JsonResponse;

/**
 * Class PromoBannerService
 *
 * @package Devsk\OhDearHealthCheck\Service
 */
class HealthCheckService
{
    const STATUS_OK = 'ok';
    const STATUS_WARNING = 'warning';
    const STATUS_FAILED = 'failed';
    const STATUS_CRASHED = 'crashed';
    const STATUS_SKIPPED = 'skipped';

    // variables for disk space checker
    private $usedSpaceInPercentage = '';
    private $usedSpaceStatus = '';
    private $dbLogStatus;
    private $dbSizeReadable;
    private $dbSize;

    /**
     * Returns Unix timestamp in seconds
     *
     * @return int
     */
    public function getCurrentTimestamp(): int
    {
        return (new DateTime())->getTimestamp();
    }

    public function getUsedDiskSpace()
    {
        $totalSpace = @disk_total_space('/');
        $usedSpace = $totalSpace - @disk_free_space('/');

        if ($totalSpace == 0) {
            $this->usedSpaceStatus = self::STATUS_SKIPPED;
            return 0; // To avoid division by zero error
        }

        // Calculate the percentage with 2 decimal points
        $percentage = ($usedSpace / $totalSpace) * 100;
        $this->usedSpaceInPercentage =  round($percentage, 2); // Round to 2 decimal places
//        dd($this->usedSpaceInPercentage);

        // Set the status
        if (intval($this->usedSpaceInPercentage) > 90) {
            $this->usedSpaceStatus = self::STATUS_FAILED;
        } else if (intval($this->usedSpaceInPercentage) > 75) {
            $this->usedSpaceStatus = self::STATUS_WARNING;
        } else {
            $this->usedSpaceStatus = self::STATUS_OK;
        }
    }

    public function getDbSize()
    {
        $connection = Kernel::getConnection();
        $query = <<<SQL
            SELECT SUM(data_length + index_length) AS `size` 
                        FROM `information_schema`.`TABLES` 
                        GROUP BY TABLE_CATALOG
        SQL;

        $row = $connection->fetchAssociative($query);

        if ($row) {
            $this->dbSize = $row['size'];
            $this->dbSizeReadable = $this->formatBytes($row['size']);

            // 5000 MB
            if ($this->dbSize > 5242880000) {
                $this->dbLogStatus = self::STATUS_FAILED;
            } else {
                $this->dbLogStatus = self::STATUS_OK;
            }
        } else {
            $this->dbLogStatus = self::STATUS_SKIPPED;
        }

        $query = <<<SQL
            SELECT table_name AS `Table`, round(((data_length + index_length) / 1024 / 1024), 2) AS `Size (MB)` 
                        FROM `information_schema`.`TABLES` 
                        ORDER BY `Size (MB)` DESC
                        LIMIT 5
        SQL;

        $result = $connection->fetchAllAssociative($query);
        if ($result) {
            foreach ($result as $row) {
                $this->dbTableSizes[$row['Table']] = $row['Size (MB)'].' MB';
            }
        }
    }

    public function generateJsonResponse()
    {
        $currentTime = $this->getCurrentTimestamp();

        return new JsonResponse([
            "finishedAt" => $currentTime,
            "checkResults" => [
                [
                    "name" => "UsedDiskSpace",
                    "label" => "Used Disk Space",
                    "status" => $this->usedSpaceStatus,
                    "notificationMessage" => "Disk usage: ".$this->usedSpaceStatus." (".$this->usedSpaceInPercentage."% used)",
                    "shortSummary" => $this->usedSpaceInPercentage."%",
                    "meta" => ["disk_space_used_percentage" => $this->usedSpaceInPercentage]
                ],
                [
                    "name" => "DbSize",
                    "label" => "Db Size",
                    "status" => $this->dbLogStatus,
                    "notificationMessage" => "Mysql size: ".$this->dbLogStatus." (".$this->dbSizeReadable.")",
                    "shortSummary" => $this->dbSizeReadable,
                    "meta" => $this->dbTableSizes
                ]
            ]
        ]);
    }

    // Function to format bytes to a human-readable format
    private function formatBytes($bytes, $precision = 2) {
        $units = array('B', 'KB', 'MB', 'GB', 'TB');

        $bytes = max($bytes, 0);
        $pow = floor(($bytes ? log($bytes) : 0) / log(1024));
        $pow = min($pow, count($units) - 1);

        $bytes /= (1 << (10 * $pow));

        return round($bytes, $precision) . ' ' . $units[$pow];
    }

}