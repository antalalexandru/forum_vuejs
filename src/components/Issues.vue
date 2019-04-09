<template>
    <div>
        <h1 style="padding: 70px 0; font-family: 'Raleway'; font-weight: 200; font-size: 60px; text-align: center">Issues</h1>

        <div style="text-align: right; margin-bottom: 15px;" v-if="userLoggedIn">
            <router-link class="nav-link" to="/issues/add">
                <button type="button" class="btn btn-light">
                    <i class="fas fa-plus-circle"></i> Add new issue
                </button>
            </router-link>
        </div>

        <table class="table">
            <thead class="thead-light">
            <tr>
                <th scope="col" style="width: 5%">#</th>
                <th scope="col">Title</th>
                <th scope="col" style="width: 15%">Date</th>
                <th scope="col" style="width: 15%">Author</th>
                <th scope="col" style="width: 8%; text-align: center">Severity</th>
                <th scope="col" style="width: 10%">Status</th>
                <th scope="col" style="width: 7%; text-align: center">Replies</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="issue in issuesList" :key="issue.id">
                <th scope="row">{{issue.id}}</th>
                <td><router-link :to="{ name: 'issue_details', params: { issue_id: issue.id } }">{{issue.title}}</router-link></td>
                <td>{{formatTimestamp(issue.timestamp)}}</td>
                <td>{{issue.userName}}</td>
                <td style="text-align: center"><strong><i class="fas fa-exclamation-circle" v-if="issue.severity === 5"></i> {{issue.severity}}</strong></td>
                <td><span v-bind:class="['badge', statusBadge(issue.status)]">{{issue.status}}</span></td>
                <td style="text-align: center"><i class="far fa-comment"></i> {{issue.replies}}</td>
            </tr>
            </tbody>
        </table>

    </div>
</template>

<script>
    import { getIssues } from "@/service/issuesService";
    import { userLoggedIn } from "@/service/memberService";
    import {formatTimestamp} from "@/service/utils";

    export default {
        name: "Issues",
        data() {
            return {
                issuesList: [],
                userLoggedIn: userLoggedIn
            }
        },

        methods: {
            statusBadge: (status) => {
                switch (status) {
                    case 'PENDING': return 'badge-light';
                    case 'FIXED': return 'badge-success';
                    case 'CONFIRMED': return 'badge-danger';
                }
            },
            formatTimestamp: formatTimestamp
        },

        created() {
            let onSuccessHandler = (response) => {
                this.issuesList = response.data;
                console.log(this.issuesList);
            };
            let onErrorHandler = (data) => {

            };
            getIssues(onSuccessHandler, onErrorHandler);
        }
    }
</script>

<style scoped>

</style>
