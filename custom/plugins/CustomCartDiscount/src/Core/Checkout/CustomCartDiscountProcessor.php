<?php declare(strict_types=1);

namespace CustomCartDiscount\Core\Checkout;

use Shopware\Core\Checkout\Cart\Cart;
use Shopware\Core\Checkout\Cart\CartBehavior;
use Shopware\Core\Checkout\Cart\CartDataCollectorInterface;
use Shopware\Core\Checkout\Cart\CartProcessorInterface;
use Shopware\Core\Checkout\Cart\LineItem\CartDataCollection;
use Shopware\Core\Checkout\Cart\LineItem\LineItem;
use Shopware\Core\Checkout\Cart\Price\PercentagePriceCalculator;
use Shopware\Core\Checkout\Cart\Price\QuantityPriceCalculator;
use Shopware\Core\Checkout\Cart\Price\Struct\PercentagePriceDefinition;
use Shopware\Core\Checkout\Cart\Price\Struct\QuantityPriceDefinition;
use Shopware\Core\Checkout\Cart\Rule\LineItemRule;
use Shopware\Core\System\SalesChannel\SalesChannelContext;
use Shopware\Core\System\SystemConfig\SystemConfigService;

class CustomCartDiscountProcessor implements /*CartDataCollectorInterface,*/ CartProcessorInterface
{
    private QuantityPriceCalculator $quantityPriceCalculator;
    private PercentagePriceCalculator $percentagePriceCalculator;
    private SystemConfigService $systemConfigService;

    public function __construct(QuantityPriceCalculator $calculator, SystemConfigService $systemConfigService, PercentagePriceCalculator $percentagePriceCalculator) {
        $this->quantityPriceCalculator = $calculator;
        $this->systemConfigService = $systemConfigService;
        $this->percentagePriceCalculator = $percentagePriceCalculator;
    }

    public function process(CartDataCollection $data, Cart $original, Cart $toCalculate, SalesChannelContext $context, CartBehavior $behavior): void
    {
        if (!$this->systemConfigService->get('CustomCartDiscount.config.active')) {
            return;
        }

        $products = $toCalculate->getLineItems();

        if ($this->systemConfigService->get('CustomCartDiscount.config.discountValue')) {
            $discountValue = $this->systemConfigService->get('CustomCartDiscount.config.discountValue');
        }
        else {
            $discountValue = 20;
        }

        if ($this->systemConfigService->get('CustomCartDiscount.config.discountType') == 'lineItem'){
            $discountLineItem = $this->createDiscount('EXAMPLE_DISCOUNT', $discountValue);

            $definition = new PercentagePriceDefinition(
                -$discountValue,
                new LineItemRule(LineItemRule::OPERATOR_EQ, $products->getKeys())
            );

            $discountLineItem->setPriceDefinition($definition);

            $discountLineItem->setPrice($this->percentagePriceCalculator->calculate($definition->getPercentage(), $products->getPrices(), $context));

            $toCalculate->add($discountLineItem);
        }
        else {
            $products = $products->filterType(LineItem::PRODUCT_LINE_ITEM_TYPE)->getElements();

            foreach ($products as $product) {
                $definition = new QuantityPriceDefinition(
                    $product->getPrice()->getUnitPrice() * (1 - ($discountValue / 100)),
                    $product->getPrice()->getTaxRules(),
                    $product->getPrice()->getQuantity()
                );

                $calculated = $this->quantityPriceCalculator->calculate($definition, $context);

                $product->setPrice($calculated);
                $product->setPriceDefinition($definition);
            }
        }
    }


    private function createDiscount(string $name, int $discountValue): LineItem
    {
        $discountLineItem = new LineItem($name, 'custom_discount', null, 1);

        $discountLineItem->setLabel($discountValue . '% off!');
        $discountLineItem->setGood(false);
        $discountLineItem->setStackable(false);
        $discountLineItem->setRemovable(false);

        return $discountLineItem;
    }
}
