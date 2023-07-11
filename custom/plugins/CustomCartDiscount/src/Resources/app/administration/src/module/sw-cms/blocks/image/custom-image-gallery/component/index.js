import template from './sw-cms-custom-block-image-gallery.html.twig';

const { Component } = Shopware;

/**
 * @private since v6.5.0
 * @package content
 */
Component.register('sw-cms-block-custom-image-gallery', {
    template,
});
