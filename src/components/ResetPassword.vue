<template>
    <div class="content">
        <h1 style="padding: 70px 0; font-family: 'Raleway'; text-align: center; font-weight: 200; font-size: 60px;">Reset password</h1>
        <div class="alert alert-success" role="alert" v-if="successful_request">
            Password succesfully changed
        </div>
        <div class="alert alert-danger" role="alert" v-if="unsuccessful_request">
            There was an unexpected error. Please try again later or contact site administration.
        </div>
        <div class="form-group">
            <label for="userIdInput">Account ID</label>
            <input type="text" class="form-control" id="userIdInput" v-model="input.userId">
        </div>
        <div class="form-group">
            <label for="exampleInputEmail1">Reset password token</label>
            <input type="text" class="form-control" id="exampleInputEmail1" v-model="input.token">
        </div>
        <div class="form-group">
            <label for="newPassword">New password</label>
            <input type="password" class="form-control" v-bind:class="{ 'is-invalid': invalidPassword }" id="newPassword" v-model="input.password">
            <div class="invalid-feedback">
                <div v-html="invalidPasswordMessage"></div>
            </div>
        </div>
        <div class="form-group">
            <label for="confirmNewPassword">Confirm new password</label>
            <input type="password" class="form-control" v-bind:class="{ 'is-invalid': passwordsMismatch }" id="confirmNewPassword" v-model="input.confirmNewPassword">
            <div class="invalid-feedback">
                <i class="fas fa-exclamation-triangle"></i> Passwords do not match
            </div>
        </div>
        <div class="form-group">
            <button type="submit" class="btn btn-primary" v-on:click="resetPassword()">Reset password</button>
        </div>
    </div>
</template>

<script>
    import {resetPassword} from "@/service/api";

    export default {
        name: "ResetPassword",
        data() {
            return {
                input: {
                    userId: this.$route.query.user_id,
                    token: this.$route.query.token,
                    password: '',
                    confirmNewPassword: ''
                },

                invalidPassword: false,
                passwordsMismatch: false,
                invalidPasswordMessage: '',
                successful_request: false,
                unsuccessful_request: false,
            }
        },
        methods: {
            resetPassword() {
                this.invalidPassword = false;
                this.passwordsMismatch = false;
                this.invalidPasswordMessage = '';
                this.successful_request = false;
                this.unsuccessful_request = false;
                if(this.input.password !== this.input.confirmNewPassword) {
                    this.passwordsMismatch = true;
                } else {
                    resetPassword({
                        userId: this.input.userId,
                        token: this.input.token,
                        newPassword: this.input.password
                    }, (response, error) => {
                        if (error == null) {
                            this.successful_request = true;
                        } else {
                            let response = error.response;
                            if(response.status === 422) {
                                // invalid data
                                for(let invalid_field of response.data.details) {
                                    if(invalid_field.fieldName === "newPassword") { // TODO same for account id and token
                                        this.invalidPassword = true;
                                        this.invalidPasswordMessage += "<i class=\"far fa-times-circle\"></i> " + invalid_field.error + "<br>";
                                    }
                                }
                            } else {
                                this.unsuccessful_request = true;
                            }
                        }
                    });
                }
            }
        }
    }
</script>

<style scoped>
    .content {
        margin: 0 auto;
        max-width: 500px;
    }
    button {
        width :100%;
        background: #617880;
        border-color: #617880;
    }
</style>
