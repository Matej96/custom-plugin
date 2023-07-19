import template from './custom-blog-author-detail.html.twig';

const { Component, Mixin } = Shopware;

Component.register('custom-blog-author-detail', {
    template,

    inject : [
        'repositoryFactory'
    ],

    mixins: [
        Mixin.getByName('notification')
    ],

    data() {
        return {
            author: null,
            isLoading: false,
            processSuccess: false,
            fileAccept: 'image/*',
            repository: null
        }

    },

    computed: {
        mediaItem() {
            return this.author !== null ? this.author.media : null;
        },

    },

    created() {
        this.createdComponent();
    },

    methods: {
        createdComponent() {
            this.repository = this.repositoryFactory.create('custom_author');
            this.getAuthor();
        },

        getAuthor(){
            this.repository.get(this.$route.params.id, Shopware.Context.api).then((entity) => {
                this.author = entity;
            })
        },

        setMedia([mediaItem], mediaAssoc) {
            this.author.mediaId = mediaItem.id;
            this.author.media = mediaItem;
        },

        onRemoveMediaItem() {
            this.blog.mediaId = null;
            this.blog.media = null;
        },

        onClickSave() {
            this.isLoading = true;

            console.log(this.author);
            this.repository.save(this.author, Shopware.Context.api).then(() => {
                console.log("ok");
                this.isLoading = false;
                this.processSuccess = true;
            }).catch((exception) => {
                console.log("neok");
                this.isLoading = false;
                this.createNotificationError({
                    title: this.$tc('custom-blog.detail.errorTitle'),
                    message: exception
                });
            })
        },

        saveFinish() {
            this.processSuccess = false;
        }
    }
});