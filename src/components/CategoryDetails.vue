<template>
    <div class="hello">
        <center><h1 style="padding: 70px 0; font-family: 'Raleway'; font-weight: 200; font-size: 60px;">{{this.categoryData.name}}</h1></center>

        <div style="text-align: right; margin: 20px 0" v-if="userLoggedIn">
            <router-link :to="{ name: 'add_new_topic', params: { category_id: category_id } }">
            <button type="button" class="btn btn-light"><i class="fas fa-plus-circle"></i> Add new topic</button>
            </router-link>
        </div>

        <table class="table table-striped">
            <tbody>
                <tr v-for="topic in this.topics" :key="topic.id">
                    <td>
                        <div>
                            <router-link :to="{ name: 'topic_details', params: { topic_id: topic.id } }">
                                {{topic.title}}
                            </router-link>
                        </div>
                        <div style="color: #888;">Started by {{topic.firstPostUserName}}, {{formatTimestamp(topic.firstPostTimeStamp)}}</div>
                    </td>
                    <td style="vertical-align: middle">
                        {{topic.replies}} posts
                    </td>
                    <td style="vertical-align: middle;">
                        <div>{{topic.lastPostUserName}}</div>
                        <div style="color: #888;">{{formatTimestamp(topic.lastPostTimeStamp)}}</div>
                    </td>
                </tr>
            </tbody>
        </table>

    </div>
</template>

<script>
    import {userLoggedIn} from "../service/memberService";
    import {getCategory} from "../service/categoriesService";
    import {formatTimestamp} from "@/service/utils";


    import {getTopicsByCategoryId} from "@/service/topicsService";

    export default {
        name: "CategoryDetails",

        data() {
            return {
                categoryData: {},
                topics: [],
                category_id: this.$route.params.category_id,
                userLoggedIn: userLoggedIn
            }
        },

        methods: {
            formatTimestamp: formatTimestamp
        },

        created() {
            let onSuccessCategories = (response) => {
                this.categoryData = response.data;
            };
            let onErrorCategories = (data) => {

            };

            getCategory(this.category_id, onSuccessCategories, onErrorCategories);

            let onSuccessTopics = (response) => {
                this.topics = response.data;
            };
            let onErrorTopics = (err) => {
                console.log(err);
            };

            getTopicsByCategoryId(this.$route.params.category_id, onSuccessTopics, onErrorTopics);

        }
    }
</script>

<style scoped>

</style>
