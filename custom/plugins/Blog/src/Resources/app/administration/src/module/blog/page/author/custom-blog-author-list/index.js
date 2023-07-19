import template from './custom-blog-author-list.html.twig';

const { Component } = Shopware;
const { Criteria } = Shopware.Data;

Component.register('custom-blog-author-list', {
    template,

    inject : [
        'repositoryFactory'
    ],

    data() {
        return {
            repository: null,
            authors: null
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
            this.repository = this.repositoryFactory.create('custom_author');

            this.repository.search(new Criteria, Shopware.Context.api).then((result) => {
                this.authors = result;
            })
        },

        getColumns() {
            return [{
                property: 'firstName',
                label: this.$tc('custom-blog.authorList.columnFirstName'),
                routerLink: 'custom.blog.authorDetail',
                inlineEdit: 'string',
                allowResize: true,
                primary: true
            }, {
                property: 'lastName',
                label: this.$tc('custom-blog.authorList.columnLastName'),
                inlineEdit: 'string',
                allowResize: true
            }, {
                property: 'email',
                label: this.$tc('custom-blog.authorList.columnEmail'),
                inlineEdit: 'string',
                allowResize: true
            }]
        }
    }
});