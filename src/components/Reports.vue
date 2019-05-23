<template>
    <div>
        <h1 class="mt-4">Reports</h1>

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
            <!-- <tr v-for="issue in issuesList" :key="issue.id">
                <th scope="row">{{issue.id}}</th>
                <td><router-link :to="{ name: 'issue_details', params: { issue_id: issue.id } }">{{issue.title}}</router-link></td>
                <td>{{formatTimestamp(issue.timestamp)}}</td>
                <td>{{issue.userName}}</td>
                <td style="text-align: center"><strong><i class="fas fa-exclamation-circle" v-if="issue.severity === 5"></i> {{issue.severity}}</strong></td>
                <td><span v-bind:class="['badge', statusBadge(issue.status)]">{{issue.status}}</span></td>
                <td style="text-align: center"><i class="far fa-comment"></i> {{issue.replies}}</td>
            </tr> -->
            </tbody>
        </table>
    </div>
</template>

<script>
    export default {
        name: "Reports"
    }
</script>

<style scoped>

</style>
