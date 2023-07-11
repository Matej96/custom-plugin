<?php declare(strict_types=1);

namespace CustomCartDiscount\DataResolver;

use Shopware\Core\Content\Media\Cms\Type\ImageSliderTypeDataResolver;

class CustomCustomImageGalleryCmsElementResolver extends ImageSliderTypeDataResolver{
    public function getType(): string
    {
        return 'custom-image-gallery';
    }
}