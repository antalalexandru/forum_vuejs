<template>
    <div>
        <div v-if="succesfulSignup">
            <div class="alert alert-success" role="alert" style="margin: 20px 0">
                <i class="fas fa-envelope"></i> Account created succesfully. Check your email for account activation instructions.
            </div>
        </div>
        <div class="content" v-else>
            <h1 style="padding: 70px 0; font-family: 'Raleway'; text-align: center; font-weight: 200; font-size: 60px;">Sign up</h1>
            <div class="form-group">
                <label for="usernameInput">Username</label>
                <input type="text" class="form-control" v-bind:class="{ 'is-invalid': invalidUsername }" id="usernameInput" v-model="input.username">
                <small class="form-text text-muted">Minimum 5, maximum 30 alphanumeric, minus and underscore characters.</small>
                <div class="invalid-feedback">
                    <div v-html="invalidUsernameMessage"></div>
                </div>
            </div>
            <div class="form-group">
                <label for="passwordInput">Password</label>
                <input type="password" class="form-control" v-bind:class="{ 'is-invalid': invalidPassword }" id="passwordInput" v-model="input.password1">
                <small class="form-text text-muted">Between 5 and 100 characters, at least one upper case letter, a lower case letter and a digit</small>
                <div class="invalid-feedback">
                    <div v-html="invalidPasswordMessage"></div>
                </div>
            </div>
            <div class="form-group">
                <label for="repeatedPasswordInput">Reenter password</label>
                <input type="password" class="form-control" v-bind:class="{ 'is-invalid': passwordsNotEqual }" id="repeatedPasswordInput" v-model="input.password2">
                <div class="invalid-feedback">
                    <i class="fas fa-exclamation-triangle"></i> Passwords do not match
                </div>
            </div>
            <div class="form-group">
                <label for="emailInput">Email address</label>
                <input type="text" class="form-control" v-bind:class="{ 'is-invalid': invalidEmail }" id="emailInput" v-model="input.email">
                <div class="invalid-feedback">
                    <div v-html="invalidEmailMessage"></div>
                </div>
            </div>
            <div class="form-group">
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" v-bind:class="{ 'is-invalid': ! input.termsAndConditions }"  id="termsAndConditionsCheck" v-model="input.termsAndConditions">
                    <label class="form-check-label" for="termsAndConditionsCheck">
                        I agree with <a href="#">terms and conditions</a>
                    </label>
                    <div class="invalid-feedback">
                        You must check this in order to continue
                    </div>
                </div>
            </div>

            <!-- TODO captcha :) -->
            <!-- <div class="form-group">
                <vue-recaptcha
                        ref="recaptcha"
                        @verify="onCaptchaVerified"
                        @expired="onCaptchaExpired"
                        sitekey="6LczeJIUAAAAALR6mwS26VxnBBNxGEtAs1rfczLr">
                </vue-recaptcha>
            </div> -->

            <button type="submit" class="btn btn-primary" v-on:click="signup()">Create account</button>
        </div>
    </div>
</template>

<script>
    import {checkSignup} from "@/service/memberService";
    // import VueRecaptcha from 'vue-recaptcha';

    import {signUp} from "@/service/api";

    export default {
        // components: { VueRecaptcha },
        name: "LogIn",
        data() {
            return {

                succesfulSignup: false,

                input: {
                    username: "",
                    password1: "",
                    password2: "",
                    email: "",
                    termsAndConditions: false
                },

                invalidUsername: false,
                invalidPassword: false,
                passwordsNotEqual: false,
                invalidEmail: false,

                invalidUsernameMessage: "",
                invalidEmailMessage: "",
                invalidPasswordMessage: "",
            }
        },
        methods: {
            signup() {

                this.invalidUsername = this.invalidEmail = this.invalidPassword = this.passwordsNotEqual = false;
                this.invalidEmailMessage = this.invalidUsernameMessage = this.invalidPasswordMessage = "";

                let ok = true;
                if(this.input.termsAndConditions === false) {
                    ok = false;
                }
                if(this.input.password1 !== this.input.password2) {
                    ok = false;
                    this.passwordsNotEqual = true;
                }

                if(ok) {

                    signUp({
                        username: this.input.username,
                        password: this.input.password1,
                        email: this.input.email
                    }, (response, error) => {
                        if(error == null) {
                            this.succesfulSignup = true;
                        } else {
                            let response = error.response;
                            if(response.status === 422) {
                                // invalid data
                                for(let invalid_field of response.data.details) {
                                    if(invalid_field.fieldName === "username") {
                                        this.invalidUsername = true;
                                        this.invalidUsernameMessage += "<i class=\"far fa-times-circle\"></i> " + invalid_field.error + "<br>";
                                    } else if(invalid_field.fieldName === "password") {
                                        this.invalidPassword = true;
                                        this.invalidPasswordMessage += "<i class=\"far fa-times-circle\"></i> " + invalid_field.error + "<br>";
                                    } else {
                                        this.invalidEmail = true;
                                        this.invalidEmailMessage += "<i class=\"far fa-times-circle\"></i> " + invalid_field.error + "<br>";
                                    }
                                }
                            }
                            else if(response.status === 409) {
                                // duplicate name or email address
                                this.invalidUsernameMessage = "<i class=\"far fa-times-circle\"></i> Username already exists";
                                this.invalidEmailMessage = "<i class=\"far fa-times-circle\"></i> Email address already exists";
                                if(response.data.details.toLowerCase().indexOf("username") !== -1) {
                                    this.invalidUsername = true;
                                }
                                else {
                                    this.invalidEmail = true;
                                }
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
        max-width: 600px;
    }

    h2 {
        padding: 20px 0;
        text-align: center;
    }

    button {
        width: 100%;
        background: #617880;
        border-color: #617880;
    }
</style>
