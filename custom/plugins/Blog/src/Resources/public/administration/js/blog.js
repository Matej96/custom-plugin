!function(t){var e={};function o(n){if(e[n])return e[n].exports;var a=e[n]={i:n,l:!1,exports:{}};return t[n].call(a.exports,a,a.exports,o),a.l=!0,a.exports}o.m=t,o.c=e,o.d=function(t,e,n){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},o.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)o.d(n,a,function(e){return t[e]}.bind(null,a));return n},o.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="/bundles/blog/",o(o.s="Z4me")}({"75ar":function(t,e){Shopware.Component.extend("custom-blog-author-create","custom-blog-author-detail",{methods:{getAuthor:function(){this.author=this.repository.create(Shopware.Context.api)},onClickSave:function(){var t=this;this.isloading=!0,this.repository.save(this.author,Shopware.Context.api).then((function(){t.isloading=!1,t.$router.push({name:"custom.blog.authorDetail",params:{id:t.author.id}})})).catch((function(e){t.isloading=!1}))}}})},"8qob":function(t,e){Shopware.Component.extend("custom-blog-create","custom-blog-detail",{methods:{getBlog:function(){this.blog=this.repository.create(Shopware.Context.api)},onClickSave:function(){var t=this;this.isloading=!0,this.repository.save(this.blog,Shopware.Context.api).then((function(){t.isloading=!1,t.$router.push({name:"custom.blog.detail",params:{id:t.blog.id}})})).catch((function(e){t.isloading=!1,t.createNotificationError({title:t.$tc("custom-blog.detail.errorTitle"),message:e})}))}}})},Z4me:function(t,e,o){"use strict";o.r(e);var n=Shopware.Component,a=Shopware.Data.Criteria;n.register("custom-blog-list",{template:'{% block custom_blog_list %}\n    <sw-page class="custom-blog-list">\n        {% block custom_blog_smart_bar_actions %}\n            <template #smart-bar-actions>\n                <sw-button variant="primary" :routerLink="{ name: \'custom.blog.create\' }">\n                    {{ $tc(\'custom-blog.list.addButtonText\') }}\n                </sw-button>\n\n                <sw-button variant="ghost" :routerLink="{ name: \'custom.blog.authorIndex\' }">\n                    {{ $tc(\'custom-blog.authorList.listAuthors\') }}\n                </sw-button>\n            </template>\n        {% endblock %}\n\n        <template #content>\n            {% block custom_blog_list_content %}\n                <sw-entity-listing\n                        v-if="blogs"\n                        :items="blogs"\n                        :repository="repository"\n                        :showSelection="false"\n                        :columns="columns"\n                        detailRoute="custom.blog.detail">\n                </sw-entity-listing>\n            {% endblock %}\n        </template>\n    </sw-page>\n{% endblock %}',inject:["repositoryFactory"],data:function(){return{repository:null,blogs:null}},computed:{columns:function(){return this.getColumns()}},created:function(){this.createdComponent()},methods:{createdComponent:function(){var t=this;this.repository=this.repositoryFactory.create("custom_blog"),this.repository.search(new a,Shopware.Context.api).then((function(e){t.blogs=e}))},getColumns:function(){return[{property:"title",label:this.$tc("custom-blog.list.columnTitle"),routerLink:"custom.blog.detail",inlineEdit:"string",allowResize:!0,primary:!0},{property:"author",label:this.$tc("custom-blog.list.columnAuthor"),inlineEdit:"string",allowResize:!0}]}}});function i(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var o=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=o){var n,a,i,r,l=[],s=!0,c=!1;try{if(i=(o=o.call(t)).next,0===e){if(Object(o)!==o)return;s=!1}else for(;!(s=(n=i.call(o)).done)&&(l.push(n.value),l.length!==e);s=!0);}catch(t){c=!0,a=t}finally{try{if(!s&&null!=o.return&&(r=o.return(),Object(r)!==r))return}finally{if(c)throw a}}return l}}(t,e)||function(t,e){if(!t)return;if("string"==typeof t)return r(t,e);var o=Object.prototype.toString.call(t).slice(8,-1);"Object"===o&&t.constructor&&(o=t.constructor.name);if("Map"===o||"Set"===o)return Array.from(t);if("Arguments"===o||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o))return r(t,e)}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function r(t,e){(null==e||e>t.length)&&(e=t.length);for(var o=0,n=new Array(e);o<e;o++)n[o]=t[o];return n}var l=Shopware,s=l.Component,c=l.Mixin;s.register("custom-blog-detail",{template:'{% block custom_blog_detail %}\n    <sw-page class="custom-blog-detail">\n        <template #smart-bar-actions>\n            <sw-button variant="primary" :routerLink="{ name: \'custom.blog.index\' }">\n                {{ $tc(\'custom-blog.detail.cancelButtonText\') }}\n            </sw-button>\n\n            <sw-button-process\n                    :isLoading="isLoading"\n                    :processSuccess="processSuccess"\n                    variant="primary"\n{#                    @process-finish="saveFinish"#}\n                    @click="onClickSave">\n                {{ $tc(\'custom-blog.detail.saveButtonText\') }}\n            </sw-button-process>\n        </template>\n\n        <template #content>\n            <sw-card-view>\n                <sw-card v-if="blog" :isLoading="isLoading">\n                    <sw-field\n                            v-model="blog.title" :label="$tc(\'custom-blog.detail.titleLabel\')"\n                    ></sw-field>\n\n                    <sw-entity-single-select\n{#                            class="sas-blog-author-base-form__salutation-select"#}\n                            entity="custom_author"\n                            :label="$tc(\'custom-blog.detail.authorLabel\')"\n{#                            :placeholder="$tc(\'custom-author.detail.author.placeholder\')"#}\n{#                            :error="blogAuthorIdError"#}\n                            labelProperty="asfrewv"\n                            required\n                            v-model ="blog.authorId">\n                        <template #selection-label-property="{item}">\n                            <span>{{ item.firstName }} {{ item.lastName }} <i>({{ item.email }})</i></span>\n                        </template>\n                        <template #result-label-property="{item}">\n                            <span>{{ item.firstName }} {{ item.lastName }} <i>({{ item.email }})</i></span>\n                        </template>\n\n                    </sw-entity-single-select>\n\n                    <sw-text-editor\n                            v-model="blog.description" type="textarea" :label="$tc(\'custom-blog.detail.descriptionLabel\')"\n                    ></sw-text-editor>\n\n                    <sw-media-compact-upload-v2\n                            variant="regular"\n                            :label="$tc(\'custom-blog.detail.teaserImageLabel\')"\n                            :source="mediaItem"\n                            :uploadTag="blog.id"\n                            :defaultFolder="blog.getEntityName()"\n                            :allowMultiSelect="false"\n                            :fileAccept="fileAccept"\n                            @media-upload-remove-image="onRemoveMediaItem"\n                            @selection-change="setMedia">\n                    </sw-media-compact-upload-v2>\n\n                    <sw-media-compact-upload-v2\n                            variant="regular"\n                            :label="$tc(\'custom-blog.detail.imageLabel\')"\n                            :source="secondMediaItem"\n                            :uploadTag="blog.id"\n                            :defaultFolder="blog.getEntityName()"\n                            :allowMultiSelect="false"\n                            :fileAccept="fileAccept"\n                            @media-upload-remove-image="onRemoveSecondMediaItem"\n                            @selection-change="setSecondMedia">\n                    </sw-media-compact-upload-v2>\n                </sw-card>\n            </sw-card-view>\n        </template>\n    </sw-page>\n{% endblock %}',inject:["repositoryFactory"],mixins:[c.getByName("notification")],data:function(){return{blog:null,isLoading:!1,processSuccess:!1,fileAccept:"image/*",repository:null}},computed:{mediaItem:function(){return null!==this.blog?this.blog.media:null},secondMediaItem:function(){return null!==this.blog?this.blog.secondMedia:null}},created:function(){this.createdComponent()},methods:{createdComponent:function(){this.repository=this.repositoryFactory.create("custom_blog"),this.getBlog()},getBlog:function(){var t=this;this.repository.get(this.$route.params.id,Shopware.Context.api).then((function(e){t.blog=e}))},setMedia:function(t,e){var o=i(t,1)[0];this.blog.mediaId=o.id,this.blog.media=o},setSecondMedia:function(t,e){var o=i(t,1)[0];this.blog.secondMediaId=o.id,this.blog.secondMedia=o},onRemoveMediaItem:function(){this.blog.mediaId=null,this.blog.media=null},onRemoveSecondMediaItem:function(){this.blog.secondMediaId=null,this.blog.secondMedia=null},onClickSave:function(){var t=this;this.isLoading=!0,console.log(this.blog),this.repository.save(this.blog,Shopware.Context.api).then((function(){console.log("ok"),t.isLoading=!1,t.processSuccess=!0})).catch((function(e){console.log("neok"),t.isLoading=!1,t.createNotificationError({title:t.$tc("custom-blog.detail.errorTitle"),message:e})}))},saveFinish:function(){this.processSuccess=!1}}});o("8qob"),o("75ar");var u=Shopware.Component,m=Shopware.Data.Criteria;u.register("custom-blog-author-list",{template:'{% block custom_blog_list %}\n    <sw-page class="custom-blog-author-list">\n        {% block custom_blog_smart_bar_actions %}\n            <template #smart-bar-header>\n                    <h2>{{ $tc(\'custom-blog.authorGeneral.mainMenuItemGeneral\') }}</h2>\n            </template>\n            <template #smart-bar-actions>\n                <sw-button variant="primary" :routerLink="{ name: \'custom.blog.authorCreate\' }">\n                    {{ $tc(\'custom-blog.authorList.addButtonText\') }}\n                </sw-button>\n            </template>\n        {% endblock %}\n\n        <template #content>\n            {% block custom_blog_author_list_content %}\n                <sw-entity-listing\n                        v-if="authors"\n                        :items="authors"\n                        :repository="repository"\n                        :showSelection="false"\n                        :columns="columns"\n                        detailRoute="custom.blog.authorDetail">\n                </sw-entity-listing>\n            {% endblock %}\n        </template>\n    </sw-page>\n{% endblock %}',inject:["repositoryFactory"],data:function(){return{repository:null,authors:null}},computed:{columns:function(){return this.getColumns()}},created:function(){this.createdComponent()},methods:{createdComponent:function(){var t=this;this.repository=this.repositoryFactory.create("custom_author"),this.repository.search(new m,Shopware.Context.api).then((function(e){t.authors=e}))},getColumns:function(){return[{property:"firstName",label:this.$tc("custom-blog.authorList.columnFirstName"),routerLink:"custom.blog.authorDetail",inlineEdit:"string",allowResize:!0,primary:!0},{property:"lastName",label:this.$tc("custom-blog.authorList.columnLastName"),inlineEdit:"string",allowResize:!0},{property:"email",label:this.$tc("custom-blog.authorList.columnEmail"),inlineEdit:"string",allowResize:!0}]}}});function d(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var o=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=o){var n,a,i,r,l=[],s=!0,c=!1;try{if(i=(o=o.call(t)).next,0===e){if(Object(o)!==o)return;s=!1}else for(;!(s=(n=i.call(o)).done)&&(l.push(n.value),l.length!==e);s=!0);}catch(t){c=!0,a=t}finally{try{if(!s&&null!=o.return&&(r=o.return(),Object(r)!==r))return}finally{if(c)throw a}}return l}}(t,e)||function(t,e){if(!t)return;if("string"==typeof t)return p(t,e);var o=Object.prototype.toString.call(t).slice(8,-1);"Object"===o&&t.constructor&&(o=t.constructor.name);if("Map"===o||"Set"===o)return Array.from(t);if("Arguments"===o||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o))return p(t,e)}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function p(t,e){(null==e||e>t.length)&&(e=t.length);for(var o=0,n=new Array(e);o<e;o++)n[o]=t[o];return n}var h=Shopware,g=h.Component,b=h.Mixin;g.register("custom-blog-author-detail",{template:'{% block custom_blog_author_detail %}\n    <sw-page class="custom-blog-author-detail">\n        <template #smart-bar-header>\n            <h2>{{ $tc(\'custom-blog.authorGeneral.mainMenuItemGeneral\') }}</h2>\n        </template>\n        <template #smart-bar-actions>\n            <sw-button variant="primary" :routerLink="{ name: \'custom.blog.authorIndex\' }">\n                {{ $tc(\'custom-blog.authorDetail.cancelButtonText\') }}\n            </sw-button>\n\n            <sw-button-process\n                    :isLoading="isLoading"\n                    :processSuccess="processSuccess"\n                    variant="primary"\n                    {#                    @process-finish="saveFinish"#}\n                    @click="onClickSave">\n                {{ $tc(\'custom-blog.authorDetail.saveButtonText\') }}\n            </sw-button-process>\n        </template>\n\n        <template #content>\n            <sw-card-view>\n                <sw-card v-if="author" :isLoading="isLoading">\n                    <sw-field\n                            v-model="author.firstName" :label="$tc(\'custom-blog.authorDetail.firstNameLabel\')"\n                    ></sw-field>\n\n                    <sw-field\n                            v-model="author.lastName" :label="$tc(\'custom-blog.authorDetail.lastNameLabel\')"\n                    ></sw-field>\n\n                    <sw-field\n                            v-model="author.email" :label="$tc(\'custom-blog.authorDetail.emailLabel\')"\n                    ></sw-field\n>\n\n                    <sw-media-compact-upload-v2\n                            variant="regular"\n                            :label="$tc(\'custom-blog.authorDetail.imageLabel\')"\n                            :source="mediaItem"\n                            :uploadTag="author.id"\n                            :defaultFolder="author.getEntityName()"\n                            :allowMultiSelect="false"\n                            :fileAccept="fileAccept"\n                            @media-upload-remove-image="onRemoveMediaItem"\n                            @selection-change="setMedia">\n                    </sw-media-compact-upload-v2>\n                </sw-card>\n            </sw-card-view>\n        </template>\n    </sw-page>\n{% endblock %}',inject:["repositoryFactory"],mixins:[b.getByName("notification")],data:function(){return{author:null,isLoading:!1,processSuccess:!1,fileAccept:"image/*",repository:null}},computed:{mediaItem:function(){return null!==this.author?this.author.media:null}},created:function(){this.createdComponent()},methods:{createdComponent:function(){this.repository=this.repositoryFactory.create("custom_author"),this.getAuthor()},getAuthor:function(){var t=this;this.repository.get(this.$route.params.id,Shopware.Context.api).then((function(e){t.author=e}))},setMedia:function(t,e){var o=d(t,1)[0];this.author.mediaId=o.id,this.author.media=o},onRemoveMediaItem:function(){this.blog.mediaId=null,this.blog.media=null},onClickSave:function(){var t=this;this.isLoading=!0,console.log(this.author),this.repository.save(this.author,Shopware.Context.api).then((function(){console.log("ok"),t.isLoading=!1,t.processSuccess=!0})).catch((function(e){console.log("neok"),t.isLoading=!1,t.createNotificationError({title:t.$tc("custom-blog.detail.errorTitle"),message:e})}))},saveFinish:function(){this.processSuccess=!1}}});var f=o("yubt");Shopware.Module.register("custom-blog",{type:"plugin",name:"custom_blog",title:"custom-blog.general.mainMenuItemGeneral",description:"custom-blog.general.descriptionTextModule",color:"#ff3d58",icon:"default-shopping-paper-bag-product",snippets:{"en-GB":f},routes:{index:{component:"custom-blog-list",path:"index"},detail:{component:"custom-blog-detail",path:"detail/:id",meta:{parentPath:"custom.blog.index"}},create:{component:"custom-blog-create",path:"create",meta:{parentPath:"custom.blog.index"}},authorIndex:{component:"custom-blog-author-list",path:"author/index"},authorDetail:{component:"custom-blog-author-detail",path:"author/:id",meta:{parentPath:"custom.blog.authorIndex"}},authorCreate:{component:"custom-blog-author-create",path:"author/create",meta:{parentPath:"custom.blog.authorIndex"}}},navigation:[{id:"custom-blog-list",label:"custom-blog.general.mainMenuItemGeneral",color:"#ff3d58",path:"custom.blog.index",icon:"default-shopping-paper-bag-product",position:150,parent:"sw-catalogue"}]})},yubt:function(t){t.exports=JSON.parse('{"custom-blog":{"general":{"mainMenuItemGeneral":"Blogs","descriptionTextModule":"Manage blogs here."},"list":{"addButtonText":"Add article","columnTitle":"Title","columnAuthor":"Author"},"detail":{"titleLabel":"Name","authorLabel":"Author","descriptionLabel":"Description","cancelButtonText":"Cancel","saveButtonText":"Save","errorTitle":"Error saving the bundle","teaserImageLabel":"Teaser image","imageLabel":"Image"},"authorGeneral":{"mainMenuItemGeneral":"Authors","descriptionTextModule":"Manage authors here."},"authorList":{"listAuthors":"List authors","addButtonText":"Add author","columnFirstName":"First name","columnLastName":"Last name","columnEmail":"Email"},"authorDetail":{"firstNameLabel":"First name","lastNameLabel":"Last name","emailLabel":"Email","imageLabel":"Image","cancelButtonText":"Cancel","saveButtonText":"Save"}}}')}});