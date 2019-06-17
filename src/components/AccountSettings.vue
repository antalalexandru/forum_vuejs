<template>
    <div>
        <center><h1 style="padding: 70px 0; font-family: 'Raleway'; font-weight: 200; font-size: 60px;">Account settings</h1></center>
        <div class="row">
            <div class="col-3">
                <div class="list-group" id="list-tab" role="tablist">
                    <a class="list-group-item list-group-item-action active" id="list-home-list" data-toggle="list" href="#list-home" role="tab" aria-controls="home">
                        <i class="fas fa-users-cog"></i> Profile settings
                    </a>
                    <a class="list-group-item list-group-item-action" id="list-messages-list" data-toggle="list" href="#list-messages" role="tab" aria-controls="messages">
                        <i class="fas fa-key"></i> Change password
                    </a>
                </div>
            </div>
            <div class="col-9">
                <div class="tab-content" id="nav-tabContent">
                    <div class="tab-pane fade show active" id="list-home" role="tabpanel" aria-labelledby="list-home-list">

                        <div class="alert alert-success" role="alert" v-if="this.accountSuccessfullyChanged">
                            Account updated succesfully
                        </div>
                        <div class="alert alert-danger" role="alert" v-if="this.errorUpdatingProfile">
                            There was an error processing the request. Please try again later.
                        </div>

                        <div class="form-group">
                            <label for="avatarInput">Avatar URL</label>
                            <input type="text" class="form-control" id="avatarInput" v-model="input.editProfile.avatar">
                        </div>

                        <div class="form-group">
                            <label for="userTitleInput">User title</label>
                            <input type="text" class="form-control" id="userTitleInput" v-model="input.editProfile.userTitle">
                        </div>

                        <div class="form-group">
                            <label>Birthday</label><br />
                            <date-picker v-model="input.editProfile.birthday" input-class="form-control" lang="en" type="date" confirm="true" format="YYYY-MM-DD" first-day-of-week="1"></date-picker>
                        </div>

                        <div class="form-group">
                            <label for="locationInput">Location</label>
                            <input type="text" class="form-control" id="locationInput" v-model="input.editProfile.location">
                        </div>

                        <button type="submit" class="btn btn-primary" v-on:click="updateProfile()">Update profile</button>

                    </div>
                    <div class="tab-pane fade" id="list-messages" role="tabpanel" aria-labelledby="list-messages-list">
                        <div class="alert alert-success" role="alert" v-if="this.passwordSuccessfullyChanged">
                            Password changed succesfully
                        </div>
                        <div class="alert alert-danger" role="alert" v-if="this.errorProcessingPasswordChangeRequest">
                            There was an error processing the request.
                        </div>
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

    import {changeCurrentPassword, updateUserProfile, getGroups} from "@/service/api";

    import DatePicker from 'vue2-datepicker'


    export default {
        name: "AccountSettings",
        components: {
            DatePicker
        },
        data() {

            let selfUser = JSON.parse(localStorage.selfUser);

            return {
                input: {
                    avatar: '',

                    birthday: '',

                    editProfile: {
                        avatar: selfUser.avatar != null ? selfUser.avatar : '',
                        birthday: selfUser.birthday != null ? selfUser.birthday : '',
                        location: selfUser.location != null ? selfUser.location : '',
                        userTitle: selfUser.userTitle != null ? selfUser.userTitle : '',
                    },

                    changePassword: {
                        currentPassword: '',
                        newPassword: '',
                        confirmNewPassword: ''
                    }
                },

                passwordSuccessfullyChanged: false,
                errorProcessingPasswordChangeRequest: false,

                invalidCurrentPassword: false,
                invalidNewPassword: false,
                passwordsMismatch: false,

                accountSuccessfullyChanged: false,
                errorUpdatingProfile: false,

                invalidNewPasswordMessage: '',
            }
        },

        methods: {

            updateProfile() {
                let userTitle = this.input.editProfile.userTitle.trim();
                if(userTitle.length === 0) {
                    userTitle = null;
                }

                let location = this.input.editProfile.location.trim();
                if(location.length === 0) {
                    location = null;
                }

                let avatar = this.input.editProfile.avatar.trim();
                if(avatar.length === 0) {
                    avatar = null;
                }

                let birthday = this.input.editProfile.birthday;
                if(birthday === '') {
                    birthday = null;
                }

                this.accountSuccessfullyChanged = false;
                this.errorUpdatingProfile = false;

                updateUserProfile({
                    avatar: avatar,
                    userTitle: userTitle,
                    birthday: birthday,
                    location: location
                }, (response, err) => {
                    if(err == null) {
                        this.accountSuccessfullyChanged = true;
                    } else {
                        this.errorUpdatingProfile = true;
                    }
                });

            },

            changePassword() {

                let currentPassword = this.input.changePassword.currentPassword;
                let newPassword = this.input.changePassword.newPassword;
                let confirmNewPassword = this.input.changePassword.confirmNewPassword;

                this.errorProcessingPasswordChangeRequest = false;
                this.passwordSuccessfullyChanged = false;

                this.invalidCurrentPassword = false;
                this.invalidNewPassword = false;
                this.passwordsMismatch =false;

                this.invalidNewPasswordMessage = '';

                if(newPassword !== confirmNewPassword) {
                    this.passwordsMismatch = true;
                } else {
                    changeCurrentPassword({
                        oldPassword: currentPassword,
                        newPassword: newPassword
                    }, (response, error) => {
                        if(error == null) {
                            this.passwordSuccessfullyChanged = true;
                            this.input.changePassword.currentPassword = '';
                            this.input.changePassword.newPassword = '';
                            this.input.changePassword.confirmNewPassword = '';
                        } else {
                            let response = error.response;
                            if(response.status === 422) {
                                // invalid data
                                for(let invalid_field of response.data.details) {
                                    if(invalid_field.fieldName === "newPassword") {
                                        this.invalidNewPassword = true;
                                        this.invalidNewPasswordMessage += "<i class=\"far fa-times-circle\"></i> " + invalid_field.error + "<br>";
                                    }
                                }
                            } else if(response.status === 400 && response.data.details === "Invalid current password") {
                                this.invalidCurrentPassword = true;
                            } else {
                                this.errorProcessingPasswordChangeRequest = true;
                            }
                        }
                    });
                }
            }
        },

    }
</script>

<style scoped>

    input, .alert {
        max-width: 550px;
    }

    button {
        cursor: pointer;
    }

</style>
