<?php declare(strict_types=1);

namespace Devsk\OhDearHealthCheck;

use Shopware\Core\Framework\Plugin;

if (file_exists(dirname(__DIR__) . '/vendor/autoload.php')) {
    require_once dirname(__DIR__) . '/vendor/autoload.php';
}

/**
 * Class DevskOhDearHealthCheck
 *
 * @package Devsk\OhDearHealthCheck
 */
class DevskOhDearHealthCheck extends Plugin
{
}