import './component';
import './config';
import './preview';

Shopware.Service('cmsService').registerCmsElement({
    name: 'custom-text-element',
    label: 'Custom text',
    component: 'sw-cms-el-custom-text',
    configComponent: 'sw-cms-el-config-custom-text',
    previewComponent: 'sw-cms-el-preview-custom-text',
    defaultConfig: {
        content: {
            source: 'static',
            value: `
                <h2>Random</h2>
                <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, 
                sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, 
                sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. 
                Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. 
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, 
                sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. 
                At vero eos et accusam et justo duo dolores et ea rebum. 
                Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
            `,
        },
        verticalAlign: {
            source: 'static',
            value: null,
        },
    }
});