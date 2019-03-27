<template>
    <div class="content">
        <center><h1 style="padding: 70px 0; font-family: 'Raleway'; font-weight: 200; font-size: 60px;">Add new topic</h1></center>

        <div class="form-group">
            <label for="emailInput">Topic title</label>
            <input type="text" class="form-control" id="emailInput" v-model="input.title">
        </div>

        <label for="editor"></label><textarea name="content" id="editor" row="10"></textarea>

        <center><button type="submit" class="btn btn-primary">Add topic</button></center>


    </div>
</template>

<script>
    import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

    export default {
        name: "AddNewTopic",
        data() {
            return {
                input: {
                    title: "",
                    content: "",
                },
            }
        },
        mounted() {
            ClassicEditor
                .create( document.getElementById( 'editor'), {
                    toolbar: [ 'bold', 'italic', 'link', '|', 'bulletedList', 'numberedList', 'blockQuote', 'imageUpload' ],

            } )
                .catch( error => {
                    console.error( error );
                } );
        }
    }
</script>

<style>
    .content {
        margin: 0 auto;
        max-width: 1000px;
    }

    button {
        margin: 20px 0;
        min-width: 200px;
        background: #617880;
        border-color: #617880;
    }

    .ck-editor__editable  {
        min-height: 300px;
    }
</style>