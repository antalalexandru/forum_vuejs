<template>
    <div class="content">
        <h1 class="mt-4">Reported content</h1>

        <table class="table table-striped">
            <thead>
            <tr>
                <th scope="col" style="width: 10%">#</th>
                <th scope="col">Reported by</th>
                <th scope="col" style="width: 15%">Post id</th>
                <th scope="col" style="width: 15%">Status</th>
                <th scope="col" style="width: 30%;">Date</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="report in reports" :key="report.reportId" v-on:click="showReportDetails(report.reportId)" data-toggle="modal" data-target=".reportModal" style="cursor: pointer">
                <th scope="row">{{report.reportId}}</th>
                <td>{{report.authorName}}</td>
                <td>{{report.postId}}</td>
                <td><span v-bind:class="['badge', statusBadge(report.status)]">{{report.status}}</span></td>
                <td>{{formatTimestamp(report.timestamp)}}</td>
            </tr>
            </tbody>
        </table>



        <div class="modal fade reportModal" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content" v-if="this.selectedReportDetails !== {}">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLongTitle">Report #{{this.selectedReportDetails.reportId}} details</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        Reported by {{this.selectedReportDetails.authorName}} regarding {{this.selectedReportDetails.postDetails.author.username}}'s post.
                        <br />
                        Reported post content:
                        <div v-html="this.selectedReportDetails.postDetails.content"></div>

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import {getReportDetails, getReports} from "../service/api";
    import {formatTimestamp} from "../service/utils";

    export default {
        name: "Reports",
        data() {
            return {
                reports: [],
                selectedReportDetails: {}
            }
        },
        methods: {
            formatTimestamp: formatTimestamp,
            statusBadge: (report) => {
                switch (report) {
                    case 'COMPLETE': return 'badge-secondary';
                    case 'NEW': return 'badge-danger';
                }
            },
            showReportDetails(reportId) {
                getReportDetails({
                    reportId: reportId
                }, (response, error) => {
                    if(error == null) {
                        this.selectedReportDetails = response;
                    }
                });
            }
        },
        created() {
            getReports((response, error) => {
                if(error == null) {
                    this.reports = response;
                    console.log(response);
                }
            });
        }
    }
</script>

<style scoped>
    .content {
        width: 70%;
        margin: 0 auto;
    }
</style>
