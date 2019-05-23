<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container">
            <router-link class="navbar-brand" to="/">Board forums</router-link>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item active">
                        <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Link</a>
                    </li>
                    <li class="nav-item">
                    <router-link class="nav-link" :to="{ name: 'issues' }">Issues</router-link>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Dropdown
                        </a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <a class="dropdown-item" href="#">Action</a>
                            <a class="dropdown-item" href="#">Another action</a>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item" href="#">Something else here</a>
                        </div>
                    </li>
                </ul>

                <ul class="navbar-nav form-inline my-2 my-lg-0" v-if="this.loggedIn">
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown3" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Dropdown
                        </a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdown3">
                            <a class="dropdown-item" href="#">Action3</a>
                            <a class="dropdown-item" href="#">Another action</a>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item" href="#">Something else here</a>
                        </div>
                    </li>

                    <li class="nav-item dropdown">
                        <a class="nav-link" href="#" id="navbarDropdown2" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i class="fas fa-envelope" style="color: #cc0000"></i>&nbsp;
                            <b style="color: #cc0000">(4)</b>
                        </a>
                        <div class="dropdown-menu dropdown-menu-center" aria-labelledby="navbarDropdown2" style="width: 400px; padding: 10px;">
                            <div class="d-flex justify-content-between">
                                <div>
                                    Private messages
                                </div>
                                <div>
                                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                                        Launch demo modal
                                    </button>

                                </div>
                            </div>
                            <ul class="list-group">
                                <li style="border: none;" class="list-group-item d-flex justify-content-between align-items-center">
                                    Cras justo odio
                                    <span class="badge badge-primary badge-pill">14</span>
                                </li>
                                <li style="border: none" class="list-group-item d-flex justify-content-between align-items-center">
                                    Dapibus ac facilisis in<br />121
                                    <span class="badge badge-primary badge-pill">2</span>
                                </li>
                                <li style="border: none" class="list-group-item d-flex justify-content-between align-items-center">
                                    Morbi leo risus
                                    <span class="badge badge-primary badge-pill">1</span>
                                </li>
                            </ul>
                        </div>
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
    import {userLoggedIn, storeUserInformation, getUserAvatar} from "@/service/memberService";
    import {getSelfUserInformation} from "@/service/api";
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
                }
            }
        },

        created() {
            getSelfUserInformation((data) => {
                this.loggedIn = data;
                storeUserInformation(data);
            });
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
