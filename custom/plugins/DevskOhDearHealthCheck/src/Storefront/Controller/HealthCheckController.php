<?php declare(strict_types=1);

namespace Devsk\OhDearHealthCheck\Storefront\Controller;

use DateTime;
use Devsk\OhDearHealthCheck\Service\HealthCheckService;
use OhDear\HealthCheckResults\CheckResult;
use OhDear\HealthCheckResults\CheckResults;
use Shopware\Core\Kernel;
use Shopware\Storefront\Controller\StorefrontController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route(defaults={"_routeScope"={"storefront"}})
 */
class HealthCheckController extends StorefrontController
{
    /**
     * @var HealthCheckService
     */
    protected HealthCheckService $healthCheckService;

    /**
     * @param HealthCheckService $healthCheckService
     */
    public function __construct(HealthCheckService $healthCheckService)
    {
        $this->healthCheckService = $healthCheckService;
    }

    /**
     * @Route("/healthcheck", name="frontend.example.example", methods={"GET"})
     */
    public function healthCheck(): JsonResponse
    {
        $this->healthCheckService->getUsedDiskSpace();
        $this->healthCheckService->getDbSize();
        $generatedJsonResponse = $this->healthCheckService->generateJsonResponse();

        return $generatedJsonResponse;
    }
}