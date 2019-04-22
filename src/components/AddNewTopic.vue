<template>
    <div>

        <h1 class="mt-4">Add new topic</h1>

        <div class="form-group">
            <label for="usernameInput">Title</label>
            <input type="text" class="form-control" id="usernameInput" v-model="input.title">
        </div>


        <div class="form-group">
            <ckeditor class="form-control" id="details" :editor="editor" v-model="input.content" :config="editorConfig"></ckeditor>
        </div>

        <div style="text-align: right; margin-top: 15px;">
            <button type="button" class="btn btn-secondary" v-on:click="addTopic" :disabled="disableAddButton">
                <i class="fas fa-plus-circle"></i> Add new topic
            </button>
        </div></div>
</template>

<script>

    import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
    import {
        addNewTopic
    } from "@/service/topicsService";

    export default {
        name: "AddNewTopic",

        data() {
            return {
                editor: ClassicEditor,
                editorConfig: {},
                input: {
                    title: '',
                    content: ''
                },
                disableAddButton: false
            }
        },

        methods: {

            addTopic() {

                this.disableAddButton = true;

                let loadingToaster = this.$toasted.show("Saving topic ...", {
                    theme: "toasted-primary",
                    position: "top-center",
                    duration : 1000,
                    type: 'info',
                    iconPack: 'fontawesome',
                    icon: 'info'
                });

                setTimeout(() => addNewTopic({
                    title: this.input.title,
                    content: this.input.content,
                    categoryId: this.$route.params.category_id
                }, (response, error) => {
                    loadingToaster.goAway(0);
                    if(error == null) {
                        this.$toasted.show("Topic succesfully saved", {
                            theme: "toasted-primary",
                            position: "top-center",
                            duration : 1000,
                            onComplete: () => {
                                this.$router.push('/topic/' + response.data.id);
                            },
                            type: 'success',
                            iconPack: 'fontawesome',
                            icon: 'check'
                        });
                    } else {
                        // todo check error message
                        this.disableAddButton = false;
                        this.$toasted.show("Topic saving error", {
                            theme: "toasted-primary",
                            position: "top-center",
                            duration : 2000,
                            type: 'error',
                            iconPack: 'fontawesome',
                            icon: 'info'
                        });
                    }
                }), 1000);
            }
        }
    }
</script>

<style scoped>

</style>
