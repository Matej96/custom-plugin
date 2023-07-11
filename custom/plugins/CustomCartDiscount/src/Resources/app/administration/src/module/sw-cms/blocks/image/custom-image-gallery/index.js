import CMS from '../../../constant/sw-cms.constant';

import './component';
import './preview';

console.log('asd');

Shopware.Service('cmsService').registerCmsBlock({
    name: 'custom-image-gallery',
    label: 'Custom image gallery',
    category: 'image',
    component: 'sw-cms-block-custom-image-gallery',
    previewComponent: 'sw-cms-preview-custom-image-gallery',
    defaultConfig: {
        marginBottom: '20px',
        marginTop: '20px',
        marginLeft: '20px',
        marginRight: '20px',
        sizingMode: 'boxed',
    },
    slots: {
        imageGallery: {
            type: 'image-gallery',
            default: {
                config: {},
                data: {
                    sliderItems: {
                        source: 'default',
                        value: [
                            {
                                url: null,
                                newTab: false,
                                mediaId: null,
                                fileName: CMS.MEDIA.previewMountain,
                                mediaUrl: null,
                            },
                            {
                                url: null,
                                newTab: false,
                                mediaId: null,
                                fileName: CMS.MEDIA.previewGlasses,
                                mediaUrl: null,
                            },
                            {
                                url: null,
                                newTab: false,
                                mediaId: null,
                                fileName: CMS.MEDIA.previewPlant,
                                mediaUrl: null,
                            },
                        ],
                    },
                },
            },
        },
    },
});
