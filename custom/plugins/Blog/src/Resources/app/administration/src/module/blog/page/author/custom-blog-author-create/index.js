const { Component } = Shopware;

Component.extend('custom-blog-author-create', 'custom-blog-author-detail', {
    methods: {
        getAuthor() {
            this.author = this.repository.create(Shopware.Context.api);
        },

        onClickSave() {
            this.isloading = true;

            this.repository.save(this.author, Shopware.Context.api).then(() => {
                this.isloading = false;
                this.$router.push({name: 'custom.blog.authorDetail', params: { id: this.author.id } });
            }).catch((exception) => {
                this.isloading = false;

                // this.createNotificationError({
                //     title: this.$tc('custom-blog.detail.errorTitle'),
                //     message: exception
                // });
            });
        }
    }
});