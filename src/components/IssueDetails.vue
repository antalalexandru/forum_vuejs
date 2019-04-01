<template>
    <div>
        <!-- Title -->
        <h1 class="mt-4">Issue #{{this.issueDetails.id}}: {{this.issueDetails.title}}</h1>
        <!-- Author -->

        <div class="d-flex justify-content-between">
            <div class="lead">
                raised by {{this.issueDetails.userName}}, {{formatTimestamp(this.issueDetails.timestamp)}}
            </div>
            <div>
                Severity: <strong>{{this.issueDetails.severity}}</strong> &nbsp; Status: <span v-bind:class="['badge', statusBadge(this.issueDetails.status)]">{{this.issueDetails.status}}</span>
            </div>
        </div>

        <hr>

        <div v-for="comment in issueComments" :key="comment.id">
            <div v-html="comment.content"></div>
        </div>

        <div v-if="userLoggedIn">
            <hr>
            <div class="form-group">
                <label>Add new comment</label>
                <ckeditor class="form-control" id="details" :editor="editor" v-model="input.content" :config="editorConfig"></ckeditor>
            </div>
        </div>

    </div>
</template>

<script>
    import {getIssueDetails, getIssueComments} from "@/service/issuesService";
    import userLoggedIn from "../service/memberService";
    import {formatTimestamp, statusBadge} from "@/service/utils";
    import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

    export default {
        name: "IssueDetails",
        data() {
            return {
                issue_id: this.$route.params.issue_id,
                issueDetails: {},
                issueComments: [],
                userLoggedIn: userLoggedIn,
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
            formatTimestamp: formatTimestamp,
            statusBadge: statusBadge,
        },
        created() {
            let onSuccessCategories = (response) => {
                this.issueDetails = response.data;
            };

            let onErrorCategories = (data) => {

            };

            getIssueDetails(this.issue_id, onSuccessCategories, onErrorCategories);

            getIssueComments(this.issue_id, (response) => {
                this.issueComments = response.data;
            }, (data) => {

            });
        }
    }
</script>

<style scoped>

</style>
