<template>
    <div class="content">

        <h2 class="display-4">Înregistrare</h2>
        <div class="form-group">
            <label for="usernameInput">Nume de utilizator</label>
            <input type="text" class="form-control" v-bind:class="{ 'is-invalid': invalidUsername }" id="usernameInput" v-model="input.username">
            <small class="form-text text-muted">Minim 5, maxim 30 de caractere alfanumerice, minus şi talpă.</small>
            <div class="invalid-feedback">
                {{invalidUsernameMessage}}
            </div>
        </div>
        <div class="form-group">
            <label for="passwordInput">Parola</label>
            <input type="password" class="form-control" v-bind:class="{ 'is-invalid': invalidPassword }" id="passwordInput" v-model="input.password1">
            <small class="form-text text-muted">Minim 5, maxim 100 de caractere, cel puţin o literă mare, o literă mică şi o cifră</small>
            <div class="invalid-feedback">
                Parola este invalidă
            </div>
        </div>
        <div class="form-group">
            <label for="repeatedPasswordInput">Reintrodu Parola</label>
            <input type="password" class="form-control" v-bind:class="{ 'is-invalid': passwordsNotEqual }" id="repeatedPasswordInput" v-model="input.password2">
            <small class="form-text text-muted">Aceeaşi ca cea introdusă mai sus :)</small>
            <div class="invalid-feedback">
                Parolele nu coincid
            </div>
        </div>
        <div class="form-group">
            <label for="emailInput">Adresa email</label>
            <input type="text" class="form-control" v-bind:class="{ 'is-invalid': invalidEmail }" id="emailInput" v-model="input.email">
            <div class="invalid-feedback">
                {{invalidEmailMessage}}
            </div>
        </div>
        <div class="form-group">
            <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" v-bind:class="{ 'is-invalid': ! input.termsAndConditions }"  id="termsAndConditionsCheck" v-model="input.termsAndConditions">
                <label class="form-check-label" for="termsAndConditionsCheck">
                    Sunt de acord cu <a href="#">termenii şi condiţiile</a>
                </label>
                <div class="invalid-feedback">
                    Trebuie să bifezi pentru a putea continua
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
        <button type="submit" class="btn btn-primary" v-on:click="signup()">Creează cont</button>
    </div>
</template>

<script>
    import {checkSignup} from "@/service/memberService";
    // import VueRecaptcha from 'vue-recaptcha';

    export default {
        // components: { VueRecaptcha },
        name: "LogIn",
        data() {
            return {
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
            }
        },
        methods: {
            signup() {
                this.invalidUsername = this.invalidEmail = this.invalidPassword = this.passwordsNotEqual = false;
                let ok = true;
                if(this.input.termsAndConditions === false) {
                    ok = false;
                }
                if(this.input.password1 !== this.input.password2) {
                    ok = false;
                    this.passwordsNotEqual = true;
                }

                if(ok) {

                    let okResponseHandler = (response) => {
                        if(response.status === 201) {
                            this.$router.push('/user/confirmemail');
                        }
                    };

                    let errorResponseHandler = (data) => {
                        let response = data.response;
                        if(response.status === 422) {
                            // invalid data
                            this.invalidUsernameMessage = "Username-ul este invalid";
                            this.invalidEmailMessage = "Adresa email este invalidă";

                            for(let invalid_field of JSON.parse(response.data.message)) {
                                this.invalidUsername |= invalid_field.field_name === "username";
                                this.invalidPassword |= invalid_field.field_name === "password";
                                this.invalidEmail |= invalid_field.field_name === "email";
                            }
                        }
                        else if(response.status === 409) {
                            // duplicate name or email address
                            this.invalidUsernameMessage = "Username-ul există deja";
                            this.invalidEmailMessage = "Adresa email există deja";

                            if(response.data.message === "Username already taken") {
                                this.invalidUsername = true;
                            }
                            else {
                                this.invalidEmail = true;
                            }
                        }
                        else {
                            // other error
                            // TODO
                        }
                    };
                    checkSignup(this.input.username, this.input.password1, this.input.email, okResponseHandler, errorResponseHandler);
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
