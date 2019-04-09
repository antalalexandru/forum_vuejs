<template>
    <div>
        <h1 style="padding: 70px 0; font-family: 'Raleway'; font-weight: 200; font-size: 60px; text-align: center">Add new issue</h1>

        <div class="form-group">
            <label for="usernameInput">Title</label>
            <input type="text" class="form-control" id="usernameInput" v-model="input.title">
        </div>


        <div class="form-group">
            <label for="severity">Severity</label>
            <select class="form-control" id="severity" v-model="input.severity">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
        </div>

        <div class="form-group">
            <label>Details</label>
            <ckeditor class="form-control" id="details" :editor="editor" v-model="input.content" :config="editorConfig"></ckeditor>
        </div>

        <div style="text-align: right; margin-top: 15px;">
            <button type="button" class="btn btn-secondary" v-on:click="addIssue">
                <i class="fas fa-plus-circle"></i> Add new issue
            </button>
        </div>

        <notifications group="foo" />


    </div>
</template>

<script>

    import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
    import {addNewIssue} from "@/service/issuesService";

    export default {
        name: "AddNewIssue",
        data() {
            return {
                editor: ClassicEditor,
                editorConfig: {},
                input: {
                    title: '',
                    content: '',
                    severity: 1
                }
            }
        },
        methods: {
            addIssue() {
                let issueData = this.input;

                let onsuccess = (response) => {
                    this.$swal({
                        title: 'Success',
                        text: "Issue added succesfully!",
                        type: 'success'
                    }).then(() => {
                        this.$router.push('/issue/' + response.data.id);
                    });
                };

                let onerror = (data) => {
                    console.log(data);
                };

                addNewIssue(issueData, onsuccess, onerror);
            }
        }
    }
</script>

<style>
    .ck-editor__editable {
        min-height: 200px;
    }
</style>
