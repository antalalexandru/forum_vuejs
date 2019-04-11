<template>
    <div>
        <!-- Title -->
        <h1 class="mt-4">{{this.topic_details.title}}</h1>
        <!-- Author -->

        <div class="d-flex justify-content-between">
            <div class="lead">
                Created by {{this.topic_details.firstPostUserName}},
                {{formatTimestamp(this.topic_details.firstPostTimeStamp)}}
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

            <div class="d-inline-block" v-if="this.userPermissions.canCloseTopic">
                <button type="button" class="btn btn-link" style="margin-right: 10px; color: #555"
                        v-on:click="closeTopic" v-if="!topic_details.closed"><i class="fas fa-lock"></i> Close topic
                </button>
                <button type="button" class="btn btn-link" style="margin-right: 10px; color: #555"
                        v-on:click="openTopic" v-else><i class="fas fa-lock-open"></i> Open topic
                </button>

            </div>

            <div class="d-inline-block">
                <button class="btn btn-secondary" type="button" v-on:click="scrollToBottom" v-if="!topic_details.closed"
                        data-toggle="collapse" data-target="#collapseExample" aria-expanded="false"
                        aria-controls="collapseExample">
                    New reply
                </button>
                <button type="button" class="btn btn-danger" disabled v-else>
                    This topic is closed
                </button>

            </div>

            <!-- <button type="button" class="btn btn-link" style="margin-right: 10px; color: #aa0000" v-if="this.userPermissions.canCloseTopic"><i class="fas fa-times-circle"></i> Delete topic</button>

            <button type="button" class="btn btn-link" style="margin-right: 10px; color: #555" v-on:click="closeTopic"><i class="fas fa-lock"></i> Close topic</button>

            <button type="button" class="btn btn-secondary">New reply</button> -->
        </div>

        <div class="pagination">
            <span v-if="current_page > 1">
                <span class="pagelink" v-if="current_page - 4 > 0" v-on:click="changePage(1)">
                    <i class="fa fa-angle-double-left" aria-hidden="true"></i>
                </span>
                <span class="pagelink" v-on:click="changePage(current_page - 1)">
                    <i class="fa fa-angle-left" aria-hidden="true"></i>
                </span>
                <span v-for="it in [3, 2, 1]" :key="it">
                    <span class="pagelink" v-if="current_page - it > 0" v-on:click="changePage(current_page - it)">
                        {{current_page - it}}
                    </span>
                </span>
            </span>
            <span><span class="pagecurrent">{{current_page}}</span></span>
            <span v-for="it in [1, 2, 3]" :key="it">
                <span class="pagelink" v-if="current_page + it <= total_pages" v-on:click="changePage(current_page + it)">
                    {{current_page + it}}
                </span>
            </span>
            <span><span class="pagelink" v-if="current_page !== total_pages" v-on:click="changePage(current_page + 1)">
                <i class="fa fa-angle-right" aria-hidden="true"></i>
            </span></span>
            <span><span class="pagelink" v-if="current_page + 3 < total_pages" v-on:click="changePage(total_pages)">
                <i class="fa fa-angle-double-right" aria-hidden="true"></i>
            </span></span>
        </div>

        <table class="table table-striped" style="width: 100%">
            <!-- <transition-group name="list" tag="tbody"> -->
            <tbody>
            <tr v-for="(post, key, index) in posts" :key="post.id" style="width: 100%">
                <td style="width: 250px; text-align: center; vertical-align: top">
                    <div style="font-size: 18px">{{post.author.username}}</div>
                    <img src="https://forum.softpedia.com/uploads/profile/photo-823128.jpg"
                         style="max-width: 100px; border-radius: 50%; margin: 10px;">
                    <div v-html="getUserGroupFormatted(post.author.group)"></div>
                    <div>{{post.author.numberOfPosts}} posts</div>
                </td>
                <td style="padding-left: 10px; vertical-align: top;">
                    <div style="color: #888; font-size: 13px; margin-bottom: 10px;">
                        <div style="float: right">
                            #{{post.id}}
                        </div>
                        Posted on {{formatTimestamp(post.timestamp)}}
                        <span v-if="post.lastEditTime != null">
                            , edited by {{post.lastEditUsername}}, {{formatTimestamp(post.lastEditTime)}}
                            <span v-if="post.lastEditReason">(reason: {{post.lastEditReason}})</span>
                        </span>
                    </div>

                    <div v-if="post.id !== editPostId">
                        <div v-html="post.content"></div>
                    </div>
                    <div v-else>
                        <div class="form-group"><ckeditor class="form-control" id="details" :editor="editor" v-model="input.editedPostContent"
                                                          :config="editorConfig"></ckeditor></div>

                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="Edit reason (optional)" v-model="input.editedPostReason">
                            <span class="input-group-btn">
                                <button class="btn btn-light" type="button" style="margin: 0 15px;" v-on:click="editPost">
                                    Edit post
                                </button>

                                <button class="btn btn-default" type="button" style="color: #aa0000" v-on:click="unsetEditPostMode">
                                    Cancel
                                </button>
                            </span>
                        </div>
                    </div>


                    <div style="color: #888; font-size: 13px; margin-top: 10px; text-align: right">
                        <ul>
                            <li style="display:inline; padding: 10px;"
                                v-if="!(current_page === 1 && post.id === posts[0].id)"><i class="fas fa-times-circle"></i> Delete
                            </li>
                            <li style="display:inline; padding: 10px; cursor: pointer" v-if="userPermissions.canEditTopicPost" v-on:click="setEditPostMode(post, index)"><i class="fas fa-edit"></i> Edit</li>
                            <li style="display:inline; padding: 10px;"><i class="fas fa-comment-alt"></i> Quote</li>

                        </ul>
                    </div>

                    <hr>

                    <div style="font-size: 12px">
                        <em>User signature</em>
                    </div>

                </td>
            </tr>
            </tbody>
            <!-- </transition-group> -->

        </table>

        <div style="text-align: right; margin: 10px 0">
            <button class="btn btn-secondary" type="button" v-if="!topic_details.closed" data-toggle="collapse"
                    data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                New reply
            </button>
            <button type="button" class="btn btn-danger" disabled v-else>
                This topic is closed
            </button>
        </div>

        <div class="collapse" id="collapseExample">
            <ckeditor class="form-control" id="details" :editor="editor" v-model="input.content"
                      :config="editorConfig"></ckeditor>
            <br/>
            <div style="text-align: right">
                <button type="button" class="btn btn-light" v-on:click="addNewPost">Add post</button>
            </div>
        </div>

    </div>
</template>

<script>
    import {
        getTopicById,
        getPostsByTopicId,
        addPostToTopic,
        setTopicClosedStatus,
        editTopicPost
    } from "../service/topicsService";

    import {
        formatTimestamp,
        getUserGroupFormatted,
    } from "@/service/utils";

    import {userPermissions} from "@/service/memberService";

    import ClassicEditor from "@ckeditor/ckeditor5-build-classic";


    export default {
        name: "ViewTopic",

        data() {
            return {
                topic_details: {},
                topic_id: this.$route.params.topic_id,
                posts: [],
                current_page: this.$route.query.page == null ? 1 : parseInt(this.$route.query.page),
                total_pages: 1,
                editor: ClassicEditor,
                editorConfig: {},
                input: {
                    content: '',

                    editedPostContent: '',
                    editedPostReason: ''
                },
                userPermissions: userPermissions,

                editPostId: 0,
                editPostIndex: 0,
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
            },

            closeTopic() {
                setTopicClosedStatus(this.$route.params.topic_id, true, (response, err) => {
                    if (err == null) {
                        this.topic_details = response.data;
                    } else {
                        console.log("err");
                    }
                });
            },

            openTopic() {
                setTopicClosedStatus(this.$route.params.topic_id, false, (response, err) => {
                    if (err == null) {
                        this.topic_details = response.data;
                    } else {
                        console.log("err");
                    }
                })
            },

            scrollToBottom() {
                setTimeout(() => window.scrollTo(0, document.body.scrollHeight), 500);
            },

            setEditPostMode(post, index) {
                this.editPostId = post.id;
                this.input.editedPostContent = post.content;
                this.editPostIndex = index;
            },

            unsetEditPostMode() {
                this.editPostId = 0;
                this.input.editedPostContent = '';
            },

            editPost() {
                editTopicPost(this.editPostId, this.input.editedPostContent, this.input.editedPostReason, (response, err) => {
                    console.log(response);
                    console.log(err);
                    if(err == null) {

                        /*this.posts[this.editPostIndex] = response.data;*/
                        let editedPost = this.posts.find(post => post.id === this.editPostId);
                        editedPost.content = response.data.content;
                        editedPost.lastEditUsername = response.data.lastEditUsername;
                        editedPost.lastEditUserId = response.data.lastEditUserId;
                        editedPost.lastEditTime = response.data.lastEditTime;
                        editedPost.lastEditReason = response.data.lastEditReason;

                        console.log(editedPost);

                        this.unsetEditPostMode();
                    }
                });
            },

            loadPosts() {
                let onSuccessPosts = (response) => {
                    this.posts = response.data.elements;
                    this.total_pages = response.data.totalPages;
                };
                let onFailurePosts = (err) => {
                    console.log(err);
                };
                getPostsByTopicId(this.$route.params.topic_id, this.current_page, onSuccessPosts, onFailurePosts);
            },

            changePage(pageNumber) {
                this.current_page = pageNumber;
                this.$route.query.page = pageNumber;
                this.loadPosts();
            }

        },

        mounted() {
            let onSuccessTopicInformation = (response) => {
                this.topic_details = response.data;
            };
            let onFailureTopicInformation = (err) => {
                console.log(err);
            };
            getTopicById(this.$route.params.topic_id, onSuccessTopicInformation, onFailureTopicInformation);


            let onSuccessPosts = (response) => {
                this.posts = response.data.elements;
                this.total_pages = response.data.totalPages;
            };
            let onFailurePosts = (err) => {
                console.log(err);
            };
            getPostsByTopicId(this.$route.params.topic_id, this.current_page, onSuccessPosts, onFailurePosts);


        }
    }
</script>

<style scoped>

    /*.list-enter-active, .list-leave-active {
        transition: all 0.5s;
    }
    .list-enter, .list-leave-to  {
        opacity: 0;
        transform: translateY(30px);
    }*/

    button:hover, button:visited, button:focus {
        text-decoration: none;
    }
</style>
