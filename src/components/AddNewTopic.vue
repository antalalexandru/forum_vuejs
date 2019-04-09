<template>
    <div>

        <h1 style="padding: 70px 0; font-family: 'Raleway'; font-weight: 200; font-size: 60px; text-align: center">Add new topic</h1>


        <div class="form-group">
            <label for="usernameInput">Title</label>
            <input type="text" class="form-control" id="usernameInput" v-model="input.title">
        </div>


        <div class="form-group">
            <ckeditor class="form-control" id="details" :editor="editor" v-model="input.content" :config="editorConfig"></ckeditor>
        </div>

        <div style="text-align: right; margin-top: 15px;">
            <button type="button" class="btn btn-secondary" v-on:click="addTopic">
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
                }
            }
        },

        methods: {
            addTopic() {

                addNewTopic({
                    title: this.input.title,
                    content: this.input.content,
                    categoryId: this.$route.params.category_id
                });

            }
        }
    }
</script>

<style scoped>

</style>
