const { Component } = Shopware;

Component.extend('custom-blog-create', 'custom-blog-detail', {
    methods: {
        getBlog() {
            this.blog = this.repository.create(Shopware.Context.api);
        },

        onClickSave() {
            this.isloading = true;

            // console.log(this.blog);

            this.repository.save(this.blog, Shopware.Context.api).then(() => {
                this.isloading = false;
                this.$router.push({name: 'custom.blog.detail', params: { id: this.blog.id } });
            }).catch((exception) => {
                this.isloading = false;

                this.createNotificationError({
                    title: this.$tc('custom-blog.detail.errorTitle'),
                    message: exception
                });
            });
        }
    }
});