<template>
    <div class="content">
        <h1 style="padding: 70px 0; font-family: 'Raleway'; text-align: center; font-weight: 200; font-size: 60px;">Reset password</h1>
        <div class="alert alert-success" role="alert" v-if="successful_request">
            If there is any account related to the specified email, an email containing further instructions was sent.
        </div>
        <div class="alert alert-danger" role="alert" v-if="unsuccessful_request">
            There was an unexpected error. Please try again later or contact site administration.
        </div>
        <div class="form-group">
            <label for="exampleInputEmail1">Account email address</label>
            <input type="text" class="form-control" id="exampleInputEmail1" v-model="input.email">
        </div>
        <div class="form-group">
            <button type="submit" class="btn btn-primary" v-on:click="resetPassword()">Reset password</button>
        </div>
    </div>
</template>

<script>
    import {resetPasswordRequest} from "@/service/api";

    export default {
        name: "ForgotPasswordRequest",
        data() {
            return {
                successful_request: false,
                unsuccessful_request: false,
                input: {
                    email: ''
                }
            }
        },
        methods: {
            resetPassword() {
                if(this.input.email.trim().length > 0) {
                    this.successful_request = false;
                    this.unsuccessful_request = false;
                    resetPasswordRequest({
                        email: this.input.email.trim()
                    }, (response, error) => {
                        if (error == null) {
                            this.successful_request = true;
                        } else {
                            this.unsuccessful_request = true;
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
