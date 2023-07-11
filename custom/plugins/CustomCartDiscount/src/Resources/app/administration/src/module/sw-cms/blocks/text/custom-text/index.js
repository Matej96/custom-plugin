import './component';
import './preview';

Shopware.Service('cmsService').registerCmsBlock({
    name: 'custom-text',
    label: 'Custom Text',
    category: 'text',
    component: 'sw-cms-block-custom-text',
    previewComponent: 'sw-cms-preview-custom-text',
    defaultConfig: {
        marginBottom: '20px',
        marginTop: '20px',
        marginLeft: '20px',
        marginRight: '20px',
        sizingMode: 'boxed',
    },
    slots: {
        content: 'text',
    },
});