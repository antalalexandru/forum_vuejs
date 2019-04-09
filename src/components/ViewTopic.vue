<template>
    <div>
        <!-- Title -->
        <h1 class="mt-4">{{this.topic_details.title}}</h1>
        <!-- Author -->

        <div class="d-flex justify-content-between">
            <div class="lead">
                Created by {{this.topic_details.firstPostUserName}}, {{formatTimestamp(this.topic_details.firstPostTimeStamp)}}
            </div>
            <div>
                {{this.topic_details.replies}} posts
            </div>
        </div>

        <hr>
        <div style="text-align: right; margin: 10px 0">
            <button type="button" class="btn btn-secondary">New reply</button>
        </div>


        <table>
            <tr>
                <td style="width: 250px; text-align: center; vertical-align: top">
                    <div style="font-size: 18px">Courage</div>
                    <img src="https://forum.softpedia.com/uploads/profile/photo-823128.jpg" style="max-width: 100px; border-radius: 50%; margin: 10px;">
                    <div style="font-weight: 700; color: #aa0000">Admin</div>
                    <div>121 posts</div>
                </td>
                <td style="padding-left: 10px; vertical-align: top">
                    <div style="color: #888; font-size: 13px; margin-bottom: 10px;">Posted on 27. mar 2019, 00:21</div>

                    <div>
                        At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.
                    </div>

                    <div style="color: #888; font-size: 13px; margin-top: 10px; text-align: right">
                        <ul>
                            <li style="display:inline; padding: 10px;"><i class="fas fa-times-circle"></i> Delete</li>
                            <li style="display:inline; padding: 10px;"><i class="fas fa-edit"></i> Edit</li>
                            <li style="display:inline; padding: 10px;"><i class="fas fa-comment-alt"></i> Quote</li>

                        </ul>
                    </div>

                </td>
            </tr>
        </table>

    </div>
</template>

<script>
    import {getTopicById} from "../service/topicsService";
    import {formatTimestamp} from "@/service/utils";

    export default {
        name: "ViewTopic",

        data() {
            return {
                topic_details: {},
                topic_id: this.$route.params.topic_id,
            }
        },

        methods: {
            formatTimestamp: formatTimestamp,
        },

        created() {

            let onSuccessTopicInformation = (response) => {
                this.topic_details = response.data;
            };

            let onFailureTopicInformation = (err) => {
                console.log(err);
            };

            getTopicById(this.$route.params.topic_id, onSuccessTopicInformation, onFailureTopicInformation);
        }
    }
</script>

<style scoped>

</style>
