<?php declare(strict_types=1);

namespace CustomCartDiscount\Resources\Subscriber;

use Shopware\Core\Content\Product\ProductEvents;
use Shopware\Core\Framework\DataAbstractionLayer\Event\EntityLoadedEvent;
use Shopware\Core\System\SystemConfig\SystemConfigService;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class MySubscriber implements EventSubscriberInterface
{
    private SystemConfigService $systemConfigService;

    public function __construct(SystemConfigService $systemConfigService)
    {
        $this->systemConfigService = $systemConfigService;
    }

    public static function getSubscribedEvents(): array
    {
        return [
            ProductEvents::PRODUCT_LOADED_EVENT => 'onProductsLoaded'
        ];
    }

    public function onProductsLoaded(EntityLoadedEvent $event): void
    {
        $config = $this->systemConfigService->get('CustomCartDiscount.config.discountType');
    }
}