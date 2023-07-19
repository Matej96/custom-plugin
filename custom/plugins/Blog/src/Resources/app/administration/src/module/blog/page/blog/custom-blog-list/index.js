import template from './custom-blog-list.html.twig';

const { Component } = Shopware;
const { Criteria } = Shopware.Data;

Component.register('custom-blog-list', {
    template,

    inject : [
        'repositoryFactory'
    ],

    data() {
        return {
            repository: null,
            blogs: null
        }
    },

    computed: {
        columns() {
            return this.getColumns();
        }
    },

    created() {
        this.createdComponent();
    },

    methods: {
        createdComponent() {
            this.repository = this.repositoryFactory.create('custom_blog');

            this.repository.search(new Criteria, Shopware.Context.api).then((result) => {
                this.blogs = result;
            })
        },

        getColumns() {
            return [{
                property: 'title',
                label: this.$tc('custom-blog.list.columnTitle'),
                routerLink: 'custom.blog.detail',
                inlineEdit: 'string',
                allowResize: true,
                primary: true
            }, {
                property: 'author',
                label: this.$tc('custom-blog.list.columnAuthor'),
                inlineEdit: 'string',
                allowResize: true
            }]
        }
    }
});