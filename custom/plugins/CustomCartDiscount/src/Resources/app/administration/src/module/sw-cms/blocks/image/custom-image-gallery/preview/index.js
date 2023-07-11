import template from './sw-cms-preview-custom-image-gallery.html.twig';
import './sw-cms-preview-custom-image-gallery.scss';

const { Component } = Shopware;

/**
 * @private since v6.5.0
 * @package content
 */
Component.register('sw-cms-preview-custom-image-gallery', {
    template,
});
