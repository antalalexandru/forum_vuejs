<template>
    <div>
        <h1 style="padding: 70px 0; font-family: 'Raleway'; font-weight: 200; font-size: 60px; text-align: center">Issues</h1>

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
                <td>{{issue.title}}</td>
                <td>{{formatted(issue.timestamp)}}</td>
                <td>{{issue.userName}}</td>1
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

    export default {
        name: "Issues",
        data() {
            return {
                issuesList: []
            }
        },

        methods: {
            formatted: (UNIX_timestamp) => {
                var a = new Date(UNIX_timestamp * 1000);
                var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                var year = a.getFullYear();
                var month = months[a.getMonth()];
                var date = a.getDate();
                var hour = a.getHours();
                var min = a.getMinutes();
                var time = date + ' ' + month + ' ' + year + ', ' + hour + ':' + min;
                return time;
            },

            statusBadge: (status) => {
                switch (status) {
                    case 'PENDING': return 'badge-light';
                    case 'FIXED': return 'badge-success';
                    case 'CONFIRMED': return 'badge-danger';
                }
            }
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