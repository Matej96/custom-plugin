import template from './custom-blog-detail.html.twig';

const { Component, Mixin } = Shopware;

Component.register('custom-blog-detail', {
    template,

    inject : [
        'repositoryFactory'
    ],

    mixins: [
        Mixin.getByName('notification')
    ],

    data() {
        return {
            blog: null,
            isLoading: false,
            processSuccess: false,
            fileAccept: 'image/*',
            repository: null
        }
    },

    computed: {
        mediaItem() {
            return this.blog !== null ? this.blog.media : null;
        },

        secondMediaItem() {
            return this.blog !== null ? this.blog.secondMedia : null;
        },
    },

    created() {
        this.createdComponent();
    },

    methods: {
        createdComponent() {
            this.repository = this.repositoryFactory.create('custom_blog');
            this.getBlog();
        },

        getBlog(){
            this.repository.get(this.$route.params.id, Shopware.Context.api).then((entity) => {
                this.blog = entity;
            })
        },

        setMedia([mediaItem], mediaAssoc) {
            this.blog.mediaId = mediaItem.id;
            this.blog.media = mediaItem;
        },

        setSecondMedia([mediaItem], mediaAssoc) {
            this.blog.secondMediaId = mediaItem.id;
            this.blog.secondMedia = mediaItem;
        },

        onRemoveMediaItem() {
            this.blog.mediaId = null;
            this.blog.media = null;
        },

        onRemoveSecondMediaItem() {
            this.blog.secondMediaId = null;
            this.blog.secondMedia = null;
        },

        onClickSave() {
            this.isLoading = true;

            console.log(this.blog);
            this.repository.save(this.blog, Shopware.Context.api).then(() => {
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