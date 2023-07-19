import './page/blog/custom-blog-list';
import './page/blog/custom-blog-detail';
import './page/blog/custom-blog-create';
import './page/author/custom-blog-author-create';
import './page/author/custom-blog-author-list';
import './page/author/custom-blog-author-detail';

import enGB from './snippet/en-GB.json'

Shopware.Module.register('custom-blog', {
    type: 'plugin',
    name: 'custom_blog',
    title: 'custom-blog.general.mainMenuItemGeneral',
    description: 'custom-blog.general.descriptionTextModule',
    color: '#ff3d58',
    icon: 'default-shopping-paper-bag-product',

    snippets: {
        'en-GB': enGB
    },

    routes: {
        index: {
            component: 'custom-blog-list',
            path: 'index'
        },
        detail: {
            component: 'custom-blog-detail',
            path: 'detail/:id',
            meta: {
                parentPath: 'custom.blog.index'
            }
        },
        create: {
            component: 'custom-blog-create',
            path: 'create',
            meta: {
                parentPath: 'custom.blog.index'
            }
        },

        authorIndex: {
            component: 'custom-blog-author-list',
            path: 'author/index'
        },
        authorDetail: {
            component: 'custom-blog-author-detail',
            path: 'author/:id',
            meta: {
                parentPath: 'custom.blog.authorIndex'
            }
        },
        authorCreate: {
            component: 'custom-blog-author-create',
            path: 'author/create',
            meta: {
                parentPath: 'custom.blog.authorIndex'
            }
        },
    },

    navigation: [{
        id: 'custom-blog-list',
        label: 'custom-blog.general.mainMenuItemGeneral',
        color: '#ff3d58',
        path: 'custom.blog.index',
        icon: 'default-shopping-paper-bag-product',
        position: 150,
        parent: 'sw-catalogue'
    }]
});