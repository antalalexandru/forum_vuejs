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
                <div class="modal-content" v-if="selectedReportDetails !== false">
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
                        <div v-html="selectedReportDetails.postDetails.content"></div>

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-light" data-dismiss="modal">Close</button>

                        <button type="button" class="btn btn-success" data-dismiss="modal" v-on:click="editReportStatus('COMPLETE')" v-if="this.selectedReportDetails.status === 'NEW'">Mark as complete</button>
                        <button type="button" class="btn btn-danger" data-dismiss="modal" v-on:click="editReportStatus('NEW')" v-else>Mark as new</button>

                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import {getReportDetails, getReports} from "../service/api";
    import {formatTimestamp} from "../service/utils";
    import {editReportStatus} from "@/service/api";

    export default {
        name: "Reports",
        data() {
            return {
                reports: [],
                selectedReportDetails: false
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
            },
            editReportStatus(status) {
                editReportStatus({
                    reportId: this.selectedReportDetails.reportId,
                    status: status
                }, (success, err) => {
                    if(err == null) {
                        for(let i = 0; i < this.reports.length; i++) {
                            if(this.reports[i].reportId === this.selectedReportDetails.reportId) {
                                this.reports[i].status = status;
                                this.selectedReportDetails.status = status;
                                break;
                            }
                        }
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
