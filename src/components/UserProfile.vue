<template>
    <div>
        <Breadcrumb
                :items="breadcrumbItems"
        ></Breadcrumb>
        <div style="float: left; width: 300px">
            <div style="max-width: 300px; max-height: 300px; text-align: center">
                <img :src="getAvatarUrl(loaded_user)" style="max-width: 300px; max-height: 300px; text-align: center" alt="">
            </div>
            <div class="card-body" v-if="loaded_user">
                <h3>{{ loaded_user.username }}</h3>
                <h5><small class="text-muted">{{loaded_user.userTitle}}</small></h5>
                <hr>
                <h4><small class="text-muted"><span v-html="computed_group"></span></small></h4>
                <h6>Id: {{ loaded_user.id }}</h6>
                <h6>Posts: {{ loaded_user.numberOfPosts }}</h6>
                <h6>Joined: {{ formatTimestamp(loaded_user.joinDateTimeStamp) }}</h6>

                <hr v-if="userPermissions.canWarnUsers">
                <button v-if="userPermissions.canWarnUsers" class="btn btn-primary warn-button" data-toggle="modal" data-target="#warningModal"><i class="fas fa-exclamation-triangle"></i> Warn User</button>

            </div>
        </div>

        <div v-if="userPermissions.canWarnUsers" class="modal fade" id="warningModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Warn user {{ loaded_user.username }}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group row">
                            <label for="staticEmail" class="col-sm-2 col-form-label">Warn points</label>
                            <div class="col-sm-10">
                                <input v-model="warnInput.warn_points" type="text" class="form-control" id="staticEmail" value="0">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="inputState" class="col-sm-2 col-form-label">Action</label>
                            <div class="col-sm-10">
                                <select v-model="warnInput.action" id="inputState" class="form-control">
                                    <option value="no_action" selected>No Action</option>
                                    <option value="suspend">Temporary suspend</option>
                                    <option value="ban">Ban permanently</option>

                                </select>
                            </div>
                        </div>
                        <div class="form-group row" v-if="warnInput.action === 'suspend'">
                            <label for="inputState" class="col-sm-2 col-form-label">Suspend time (days)</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="suspendTime" value="0">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="inputState" class="col-sm-2 col-form-label">Warn details</label>
                            <div class="col-sm-10">
                                <textarea class="form-control" id="exampleFormControlTextarea1" rows="4"></textarea>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary" data-dismiss="modal" v-on:click="warnUser">Warn user</button>
                    </div>
                </div>
            </div>
        </div>

        <div style="margin-left: 320px">

            <h3>User activity</h3>

            <ul class="nav nav-tabs" id="myTab" role="tablist">
                <li class="nav-item">
                    <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Home</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Profile</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" id="contact-tab" data-toggle="tab" href="#contact" role="tab" aria-controls="contact" aria-selected="false">Contact</a>
                </li>
            </ul>
            <div class="tab-content" id="myTabContent">
                <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">...</div>
                <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">...</div>
                <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">...</div>
            </div>
        </div>
    </div>
</template>

<script>
    import Breadcrumb from "@/components/Breadcrumb";
    import {formatTimestamp} from "@/service/utils";
    import {getUserById, sendWarnRequest} from "@/service/api";
    import {userPermissions} from "@/service/memberService";

    export default {
        name: "UserProfile",
        components: {
            Breadcrumb
        },
        data() {
            return {
                loaded_user: false,
                computed_group: '',
                breadcrumbItems: [],
                userPermissions: userPermissions,

                warnInput: {
                    warn_points: 0,
                    action: 'no_action',
                    suspend_time: 0,
                    warn_details: ''
                }
            }
        },
        created() {
            this.loadUserData();
        },
        methods: {
            formatTimestamp: formatTimestamp,
            getAvatarUrl(user) {
                if(user == null || user.avatar == null || user.avatar.trim() === '') {
                    return 'https://forum.softpedia.com//public/style_images/carbon_blue/profile/default_large.png';
                } else {
                    return user.avatar;
                }
            },
            loadUserData() {
                getUserById({
                    user_id: this.$route.params.user_id
                }, (response, err) => {
                    if(err == null) {
                        this.breadcrumbItems = [{
                            name: 'View profile: ' + response.username
                        }];
                        this.loaded_user = response;
                        this.computed_group = response.group.format_prefix + response.group.name + response.group.format_suffix;
                    }
                });
            },
            warnUser() {
                sendWarnRequest({
                    warnedUserId: this.loaded_user.id,
                    points: this.warnInput.warn_points,
                    reason: this.warnInput.warn_details,
                    suspendDays: this.warnInput.action === 'no_action' ? 0 : ( this.warnInput.action === 'ban' ? -1 : this.warnInput.suspend_time )
                }, (response, err) => {
                    if(err == null) {
                        this.$toasted.show("User warned succesfully", {
                            theme: "toasted-primary",
                            position: "top-center",
                            duration : 1000,
                            type: 'success',
                            iconPack: 'fontawesome',
                            icon: 'check'
                        });
                        this.loadUserData();
                    } else {
                        // todo check error message
                        this.$toasted.show("Error warning user", {
                            theme: "toasted-primary",
                            position: "top-center",
                            duration : 2000,
                            type: 'error',
                            iconPack: 'fontawesome',
                            icon: 'info'
                        });
                    }
                });
            }
        }
    }
</script>

<style scoped>
    .bigicon {
        text-align: center;
        font-size: 150px;
        padding: 30px;
        width: 100%;
        color: #949494;
    }
    .warn-button {
        width: 100%;
        background: #617880;
        border-color: #617880;
    }
</style>
