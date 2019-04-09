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

            <!-- <button class="btn btn-secondary dropdown-toggle" style="margin-right: 10px;" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Moderator tools
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a class="dropdown-item" href="#">Action</a>
                <a class="dropdown-item" href="#">Another action</a>
                <a class="dropdown-item" href="#">Something else here</a>
            </div> -->

            <button type="button" class="btn btn-link" style="margin-right: 10px; color: #aa0000"><i class="fas fa-times-circle"></i> Delete topic</button>

            <button type="button" class="btn btn-link" style="margin-right: 10px; color: #555"><i class="fas fa-lock"></i> Close topic</button>

            <button type="button" class="btn btn-secondary">New reply</button>
        </div>

        <table class="table table-striped" style="width: 100%">
            <transition-group name="list" tag="tbody">
                <tr v-for="post in posts" :key="post.id" style="width: 100%">
                    <td style="width: 250px; text-align: center; vertical-align: top">
                        <div style="font-size: 18px">{{post.author.username}}</div>
                        <img src="https://forum.softpedia.com/uploads/profile/photo-823128.jpg" style="max-width: 100px; border-radius: 50%; margin: 10px;">
                        <div v-html="getUserGroupFormatted(post.author.group)"></div>
                        <div>{{post.author.numberOfPosts}} posts</div>
                    </td>
                    <td style="padding-left: 10px; vertical-align: top;">
                        <div style="color: #888; font-size: 13px; margin-bottom: 10px;">
                            <div style="float: right">
                                #{{post.id}}
                            </div>
                            Posted on {{formatTimestamp(post.timestamp)}}
                        </div>

                        <div v-html="post.content"></div>

                        <div style="color: #888; font-size: 13px; margin-top: 10px; text-align: right">
                            <ul>
                                <li style="display:inline; padding: 10px;"><i class="fas fa-times-circle"></i> Delete</li>
                                <li style="display:inline; padding: 10px;"><i class="fas fa-edit"></i> Edit</li>
                                <li style="display:inline; padding: 10px;"><i class="fas fa-comment-alt"></i> Quote</li>

                            </ul>
                        </div>

                    </td>
                </tr>
            </transition-group>

        </table>

        <div style="text-align: right; margin: 10px 0"><button class="btn btn-secondary" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
            New reply
        </button>
        </div>

        <div class="collapse" id="collapseExample">
            <ckeditor class="form-control" id="details" :editor="editor" v-model="input.content" :config="editorConfig"></ckeditor>
            <br />
            <div style="text-align: right"><button type="button" class="btn btn-light" v-on:click="addNewPost">Add post</button></div>
        </div>

    </div>
</template>

<script>
    import {
        getTopicById,
        getPostsByTopicId,
        addPostToTopic
    } from "../service/topicsService";

    import {
        formatTimestamp,
        getUserGroupFormatted
    } from "@/service/utils";

    import ClassicEditor from "@ckeditor/ckeditor5-build-classic";


    export default {
        name: "ViewTopic",

        data() {
            return {
                topic_details: {},
                topic_id: this.$route.params.topic_id,
                posts: [],
                editor: ClassicEditor,
                editorConfig: {},
                input: {
                    content: '',
                }
            }
        },

        methods: {
            formatTimestamp: formatTimestamp,
            getUserGroupFormatted: getUserGroupFormatted,

            addNewPost() {
                let onSuccessAddPost = (response) => {
                    this.posts.push(response.data);
                    this.input.content = '';
                };
                let onFailureAddPost = (err) => {
                    console.log(err);
                };
                addPostToTopic(this.$route.params.topic_id, this.input.content, onSuccessAddPost, onFailureAddPost);
            }

        },

        created() {
            let onSuccessTopicInformation = (response) => {
                this.topic_details = response.data;
            };
            let onFailureTopicInformation = (err) => {
                console.log(err);
            };
            getTopicById(this.$route.params.topic_id, onSuccessTopicInformation, onFailureTopicInformation);

            let onSuccessPosts = (response) => {
                this.posts = response.data;
            };
            let onFailurePosts = (err) => {
                console.log(err);
            };
            getPostsByTopicId(this.$route.params.topic_id, onSuccessPosts, onFailurePosts);


        }
    }
</script>

<style scoped>

    .list-enter-active, .list-leave-active {
        transition: all 0.5s;
    }
    .list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
        opacity: 0;
        transform: translateY(30px);
    }

    button:hover, button:visited, button:focus  {
        text-decoration: none;
    }
</style>
