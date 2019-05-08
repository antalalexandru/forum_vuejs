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
                    <div class="tab-pane fade" id="list-profile" role="tabpanel" aria-labelledby="list-profile-list">123</div>
                    <div class="tab-pane fade" id="list-messages" role="tabpanel" aria-labelledby="list-messages-list">

                        <div class="form-group">
                            <label for="currentPasswordInput">Current password</label>
                            <input type="password" class="form-control" v-bind:class="{ 'is-invalid': invalidCurrentPassword }" id="currentPasswordInput" v-model="input.changePassword.currentPassword">
                            <div class="invalid-feedback">
                                Invalid current password
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="newPasswordInput">New password</label>
                            <input type="password" class="form-control" v-bind:class="{ 'is-invalid': invalidNewPassword }" id="newPasswordInput" v-model="input.changePassword.newPassword">
                            <small class="form-text text-muted">Between 5 and 100 characters, at least one upper case letter, a lower case letter and a digit</small>
                            <div class="invalid-feedback">
                                <div v-html="invalidNewPasswordMessage"></div>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="repeatedPasswordInput">Confirm new password</label>
                            <input type="password" class="form-control" v-bind:class="{ 'is-invalid': passwordsMismatch }" id="repeatedPasswordInput" v-model="input.changePassword.confirmNewPassword">
                            <div class="invalid-feedback">
                                <i class="fas fa-exclamation-triangle"></i> Passwords do not match
                            </div>
                        </div>

                        <button type="submit" class="btn btn-primary" v-on:click="changePassword()">Change password</button>


                    </div>

                </div>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "AccountSettings",
        data() {
            return {
                input: {
                    avatar: '',

                    changePassword: {
                        currentPassword: '',
                        newPassword: '',
                        confirmNewPassword: ''
                    }
                },

                invalidCurrentPassword: false,
                invalidNewPassword: false,
                passwordsMismatch: false,

                invalidNewPasswordMessage: ''
            }
        },
        methods: {
            changePassword() {

            }
        },

    }
</script>

<style scoped>

    input {
        max-width: 550px;
    }

    button {
        cursor: pointer;
    }

</style>
