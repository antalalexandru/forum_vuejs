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
        </div>

        <Breadcrumb
                :items="this.breadcrumbElements"
        ></Breadcrumb>

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

        <Pagination
            :current_page="current_page"
            :total_pages="total_pages"
            :changePage="changePage"
        />

        <div style="text-align: center">
            <loading :active.sync="loading_posts"
                     :can-cancel="false"
                     :is-full-page="true"
                     style="margin: 20px;"
            ></loading>
        </div>

        <table class="table table-striped" style="width: 100%; margin-bottom: 0">
            <!-- <transition-group name="list" tag="tbody"> -->
            <tbody>
            <tr v-for="(post, key, index) in posts" :key="post.id" style="width: 100%">
                <td style="width: 250px; text-align: center; vertical-align: top">
                    <div style="font-size: 18px; line-height: 1.8"><router-link :to="{ name: 'user_profile', params: { user_id: post.author.id } }">{{post.author.username}}</router-link></div>
                    <div style="width: 90px; height: 90px; margin: 5px auto; border-radius: 2px;">
                        <router-link :to="{ name: 'user_profile', params: { user_id: post.author.id } }"><div :style="getAvatarStyle(post.author)"></div></router-link>
                    </div>

                    <div v-html="getUserGroupFormatted(post.author.group)" style="line-height: 1.5"></div>
                    <div style="color: #555; font-size: 14px; line-height: 1.3">{{post.author.numberOfPosts}} posts</div>
                    <div style="color: #555; font-size: 14px; line-height: 1.3">{{post.author.reputation}} likes</div>
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

                    <div style="color: #888; font-size: 13px;float: right">
                        <ul>
                            <li v-on:click="setPostIdToReport(post.id)" v-if="userPermissions.canReportPost" style="display:inline; padding: 10px; cursor: pointer" data-toggle="modal" data-target="#exampleModalCenter"><i class="fas fa-exclamation-triangle"></i> Report</li>
                            <li style="display:inline; padding: 10px; cursor: pointer"
                                v-on:click="markPostAsDeleted(post.id)"
                                v-if="!(current_page === 1 && post.id === posts[0].id) && userPermissions.canDeletePosts"><i class="fas fa-times-circle"></i> Delete
                            </li>
                            <li style="display:inline; padding: 10px; cursor: pointer" v-if="userPermissions.canEditTopicPost" v-on:click="setEditPostMode(post, index)"><i class="fas fa-edit"></i> Edit</li>

                        </ul>
                    </div>

                    <div style="color: #444; font-size: 13px; margin-top: 10px;">
                        <span v-if="isLoggedIn">
                            <span v-if=" ! alreadyLikedPost(post)" style="color: #0364B4; padding: 3px; border-radius: 3px; cursor: pointer" v-on:click="likePost(post.id)">
                                <i class="far fa-thumbs-up"></i> Like
                            </span>
                            <span v-else style="color: #cc0000; padding: 3px; border-radius: 3px; cursor: pointer" v-on:click="unlikePost(post.id)">
                                <i class="far fa-thumbs-down"></i> Unlike
                            </span>
                            &nbsp;
                        </span>
                        {{getPostLikes(post)}}
                    </div>

                </td>
            </tr>
            </tbody>
            <!-- </transition-group> -->
        </table>

        <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLongTitle">Report post #{{this.postIdToReport}}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <textarea v-model="input.reportedContentDetails" class="form-control" id="exampleFormControlTextarea1" rows="4" placeholder="Additional information ..."></textarea>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary" data-dismiss="modal" v-on:click="sendReport">Send report</button>
                    </div>
                </div>
            </div>
        </div>

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
        addPostToTopic,
        editTopicPost,
        getPostsByTopicId,
        getTopicById,
        setTopicClosedStatus
    } from "../service/topicsService";

    import {formatTimestamp, getUserGroupFormatted,} from "@/service/utils";

    import {getUserAvatar, userPermissions} from "@/service/memberService";

    import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
    import Pagination from "@/components/Pagination";

    import {likePost, sendReport, unlikePost, markPostAsDeleted, getCategoryHierarchy} from "@/service/api";
    import Breadcrumb from "@/components/Breadcrumb";

    import Loading from 'vue-loading-overlay';



    export default {
        name: "ViewTopic",
        components: {
            Pagination,
            Breadcrumb,
            Loading
        },
        data() {
            return {
                isLoggedIn: localStorage.authentication_token != null,
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
                    editedPostReason: '',

                    reportedContentDetails: ''
                },
                userPermissions: userPermissions,

                editPostId: 0,
                editPostIndex: 0,
                postIdToReport: 0,

                disableLikeButton: false,
                disableUnlikeButton: false,

                breadcrumbElements: [],

                loading_posts: false
            }
        },

        methods: {
            formatTimestamp: formatTimestamp,
            getUserGroupFormatted: getUserGroupFormatted,
            getUserAvatar: getUserAvatar,

            addNewPost() {
                let onSuccessAddPost = (response) => {
                    response.data.author = JSON.parse(localStorage.selfUser);
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
                this.loading_posts = true;
                let onSuccessPosts = (response) => {
                    this.loading_posts = false;
                    this.posts = response.data.elements;
                    this.total_pages = response.data.totalPages;
                };
                let onFailurePosts = (err) => {
                    this.loading_posts = false;
                    console.log(err);
                };
                getPostsByTopicId(this.$route.params.topic_id, this.current_page, onSuccessPosts, onFailurePosts);
            },

            changePage(pageNumber) {
                this.current_page = pageNumber;
                this.$route.query.page = pageNumber;
                this.loadPosts();
            },

            setPostIdToReport(postIdToReport) {
                this.postIdToReport = postIdToReport;
            },

            getAvatarStyle(user) {
                if(user == null || user.avatar == null || user.avatar.trim() === '') {
                    return "border-radius: 2px; max-width: 90px;max-height: 90px;min-height: 80px;min-width: 45px;background: url('https://forum.softpedia.com//public/style_images/carbon_blue/profile/default_large.png') no-repeat;background-size:cover;background-position: center;";
                } else {
                    return "text-align: center; border-radius: 2px; max-width: 90px;max-height: 90px;min-height: 85px;min-width: 45px;background: url('" + user.avatar + "') no-repeat;background-size:cover;background-position: center;";
                }
            },

            sendReport() {
                if(this.postIdToReport !== 0) {
                    let loadingToaster = this.$toasted.show("Sending report ...", {
                        theme: "toasted-primary",
                        position: "top-center",
                        duration : 1000,
                        type: 'info',
                        iconPack: 'fontawesome',
                        icon: 'info'
                    });

                    setTimeout(() => sendReport({
                        postId: this.postIdToReport,
                        content: this.input.reportedContentDetails
                    }, (response, error) => {
                        loadingToaster.goAway(0);
                        if(error == null) {
                            this.$toasted.show("Report succesfully send", {
                                theme: "toasted-primary",
                                position: "top-center",
                                duration : 1000,
                                type: 'success',
                                iconPack: 'fontawesome',
                                icon: 'check'
                            });
                        } else {
                            // todo check error message
                            this.$toasted.show("Error sending report", {
                                theme: "toasted-primary",
                                position: "top-center",
                                duration : 2000,
                                type: 'error',
                                iconPack: 'fontawesome',
                                icon: 'info'
                            });
                        }
                    }), 1000);

                }
            },

            likePost(postId) {
                if(this.disableLikeButton === false) {
                    this.disableLikeButton = true;
                    likePost({
                        postId: postId
                    }, (response, err) => {
                        this.disableLikeButton = false;
                        if (err == null) {
                            let selfUserName = JSON.parse(localStorage.selfUser).username;
                            let selfId = JSON.parse(localStorage.selfUser).id;
                            for (let post of this.posts) {
                                if (post.id === postId) {
                                    post.likeList.push({
                                        postId: postId,
                                        userId: selfId,
                                        userName: selfUserName
                                    });
                                    break;
                                }
                            }
                        }
                    });
                }
            },

            unlikePost(postId) {
                if(this.disableUnlikeButton === false) {
                    this.disableUnlikeButton = true;
                    unlikePost({
                        postId: postId
                    }, (response, err) => {
                        this.disableUnlikeButton = false;
                        if (err == null) {
                            let selfId = JSON.parse(localStorage.selfUser).id;
                            for (let i = 0; i < this.posts.length; i++) {
                                if (this.posts[i].id === postId) {
                                    let newLikes = [];
                                    for (let j = 0; j < this.posts[i].likeList.length; j++) {
                                        if (this.posts[i].likeList[j].userId !== selfId) {
                                            newLikes.push(this.posts[i].likeList[j]);
                                        }
                                    }
                                    this.posts[i].likeList = newLikes;
                                    break;
                                }
                            }
                        }
                    });
                }
            },

            alreadyLikedPost(postData) {
                let selfId = JSON.parse(localStorage.selfUser).id;
                for(let like of postData.likeList) {
                    if(like.userId === selfId) {
                        return true;
                    }
                }
                return false;
            },

            getPostLikes(postData) {
                let likes = postData.likeList;
                return likes.length + " likes";
            },

            markPostAsDeleted(postId) {
                markPostAsDeleted({
                    postId: postId
                }, (response, err) => {
                    if(err == null) {
                        this.loadPosts();
                    }
                });
            },

        },

        created() {



            let onSuccessTopicInformation = (response) => {
                this.topic_details = response.data;

                document.title = 'View topic ' + this.topic_details.title;

                getCategoryHierarchy({
                    category_id: this.topic_details.categoryId
                }, (response, err) => {
                    if (err == null) {
                        let currentCategory = response;
                        let parentCategories = [{
                            id: -1,
                            name: this.topic_details.title,
                        }];
                        while (currentCategory != null) {
                            parentCategories.push({
                                id: currentCategory.id,
                                name: currentCategory.name,
                                link: {name: 'category_details', params: {category_id: currentCategory.id}}
                            });
                            currentCategory = currentCategory.parentCategory;
                        }
                        this.breadcrumbElements = parentCategories.reverse();
                    }
                });

            };
            let onFailureTopicInformation = (err) => {
                console.log(err);
            };
            getTopicById(this.$route.params.topic_id, onSuccessTopicInformation, onFailureTopicInformation);


            this.loadPosts();
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
