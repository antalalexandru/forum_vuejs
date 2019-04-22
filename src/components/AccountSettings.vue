<template>
    <div>
        <center><h1 style="padding: 70px 0; font-family: 'Raleway'; font-weight: 200; font-size: 60px;">Account settings</h1></center>
        <div class="row">
            <div class="col-3">
                <div class="list-group" id="list-tab" role="tablist">
                    <a class="list-group-item list-group-item-action active" id="list-home-list" data-toggle="list" href="#list-home" role="tab" aria-controls="home">
                        <i class="fas fa-users-cog"></i> Profile settings
                    </a>
                    <a class="list-group-item list-group-item-action" id="list-profile-list" data-toggle="list" href="#list-profile" role="tab" aria-controls="profile">
                        <i class="fas fa-envelope"></i> Email settings
                    </a>
                    <a class="list-group-item list-group-item-action" id="list-messages-list" data-toggle="list" href="#list-messages" role="tab" aria-controls="messages">
                        <i class="fas fa-key"></i> Change password
                    </a>
                </div>
            </div>
            <div class="col-9">
                <div class="tab-content" id="nav-tabContent">
                    <div class="tab-pane fade show active" id="list-home" role="tabpanel" aria-labelledby="list-home-list">
                        <div class="form-group">
                            <label for="usernameInput">Avatar URL</label>
                            <input type="text" class="form-control" id="usernameInput" v-model="input.avatar">
                        </div>
                    </div>
                    <div class="tab-pane fade" id="list-profile" role="tabpanel" aria-labelledby="list-profile-list">...</div>
                    <div class="tab-pane fade" id="list-messages" role="tabpanel" aria-labelledby="list-messages-list">...</div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>

    import {getUserInformation} from "@/service/memberService";

    export default {
        name: "AccountSettings",
        data() {
            return {
                selfUserInformation: getUserInformation(),
                input: {
                    avatar: ''
                }
            }
        },
        methods: {

        },
        created() {
            console.log(this.selfUserInformation);
        }
    }
</script>

<style scoped>

    button {
        cursor: pointer;
    }

</style>
