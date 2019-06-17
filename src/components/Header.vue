<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container">
            <router-link class="navbar-brand" to="/">Board forums</router-link>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">

                <ul class="navbar-nav mr-auto">
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{ name: 'users_list' }"><i class="fas fa-users"></i> Users list</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{ name: 'search' }"><i class="fas fa-search"></i> Search</router-link>
                    </li>
                </ul>

                <ul class="navbar-nav form-inline my-2 my-lg-0" v-if="this.loggedIn">
                    <li class="nav-item" v-if="userPermissions.isAdmin">
                        <router-link class="nav-link" :to="{ name: 'admincp' }"><i class="fas fa-cog"></i> AdminCP</router-link>
                    </li>
                    <li class="nav-item" v-if="canSeeReportedPosts && numberOfUnresolvedReports >= 0">
                        <router-link to="/reports" class="nav-link" v-bind:class="{ 'text-danger': numberOfUnresolvedReports > 0 }">{{numberOfUnresolvedReports}} pending reports</router-link>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="userNavbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {{ loggedIn.username }}
                        </a>
                        <div class="dropdown-menu" aria-labelledby="userNavbarDropdown">
                            <router-link class="dropdown-item" :to="{ name: 'user_profile', params: { user_id: loggedIn.id } }"><i class="fas fa-user"></i> My profile</router-link>
                            <router-link class="dropdown-item" :to="{ name: 'account_settings'}"><i class="fas fa-cog"></i> Account settings</router-link>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item" href="#" v-on:click="logout"><i class="fas fa-sign-out-alt"></i> Sign out</a>
                        </div>
                    </li>
                </ul>

                <ul class="navbar-nav form-inline my-2 my-lg-0" v-else>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/user/login"><i class="fas fa-sign-in-alt"></i> Sign in</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/user/signup"><i class="fas fa-user-plus"></i> Sign up</router-link>
                    </li>
                </ul>

            </div>
        </div>

        <div class="modal fade bd-example-modal-lg" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Compose new message</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label>Send to user</label>
                            <autocomplete
                                    input-class="form-control"
                                    :source=getUsersData
                                    @selected="selectUser"
                            >
                            </autocomplete>

                        </div>

                        <ckeditor class="form-control" id="details" :editor="editor" v-model="composeNewMessageInput.content"
                                  :config="editorConfig"></ckeditor>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary">Send</button>
                    </div>
                </div>
            </div>
        </div>

    </nav>
</template>

<script>
    import {
        userLoggedIn,
        storeUserInformation,
        getUserAvatar,
        userPermissions,
    } from "@/service/memberService";
    import {getSelfUserInformation, getUnresolvedReportsCount} from "@/service/api";
    import Autocomplete from 'vuejs-auto-complete';

    import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

    export default {
        name: "Header",

        components: {
          Autocomplete
        },

        data () {
            return {
                loggedIn: localStorage.authentication_token != null,
                userLoggedIn: userLoggedIn,

                editor: ClassicEditor,

                editorConfig: {},
                composeNewMessageInput: {
                    to: '',
                    content: ''
                },

                canSeeReportedPosts: userPermissions.canSeeReportedPosts,
                userPermissions: userPermissions,
                numberOfUnresolvedReports: -1
            }
        },

        created() {
            getSelfUserInformation((data) => {
                this.loggedIn = data;
                storeUserInformation(data);
            });
        },

        mounted() {
            if(userPermissions.canSeeReportedPosts) {
                this.getUnresolvedReportsCount();
            }
        },

        methods: {

            getUserAvatar: getUserAvatar,
            logout: () => {
                localStorage.removeItem('authentication_token');
                localStorage.removeItem('refresh_token');
                localStorage.removeItem('role');
                window.location.reload();
            },

            getUsersData(input) {
                return "http://localhost:8082/user/partial_user_search?username=" + input.trim();
            },

            selectUser(data) {
                console.log("Selected user " + data.selectedObject.name);
            },

            getUnresolvedReportsCount() {
                getUnresolvedReportsCount(
                    (response, error) => {
                        if(error == null) {
                            this.numberOfUnresolvedReports = response;
                        }
                    }
                );
            }
        },
    }

</script>

<style scoped>
    .dropdown-menu-center {
        right: auto;
        left: 50%;
        -webkit-transform: translate(-50%, 0);
        -o-transform: translate(-50%, 0);
        transform: translate(-50%, 0);
    }
</style>
