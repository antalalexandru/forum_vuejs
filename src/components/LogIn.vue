<template>
    <div class="content">
        <h1 style="padding: 70px 0; font-family: 'Raleway'; text-align: center; font-weight: 200; font-size: 60px;">Sign in</h1>
        <div class="alert alert-danger" role="alert" v-if="bad_credentials">
            Bad credentials
        </div>

        <div class="form-group">
            <label for="exampleInputEmail1">Username</label>
            <input type="text" class="form-control" id="exampleInputEmail1" v-model="input.username">
        </div>
        <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input type="password" class="form-control" id="exampleInputPassword1" v-model="input.password">
        </div>
        <div class="form-group">
            <button type="submit" class="btn btn-primary" v-on:click="login()">Authentication</button>
        </div>

        <div class="form-group" style="text-align: right"><router-link class="nav-link" to="/forgot_password">Forgot your password?</router-link></div>
    </div>
</template>

<script>
    import {checkLogin} from "@/service/memberService";

    export default {
        name: "LogIn",
        data() {
            return {
                input: {
                    username: "",
                    password: ""
                },
                bad_credentials: false,
            }
        },
        methods: {
            login() {

                this.bad_credentials = false;

                let onsuccess = (response) => {
                    localStorage.authentication_token = response.data.access_token;
                    localStorage.refresh_token = response.data.refresh_token;
                    localStorage.role = response.data.roles;

                    // Force page re-render
                    document.location.href = '/';
                };

                let onerror = (data) => {
                    let request = data.request;
                    if(request.status === 400 && JSON.parse(request.response).error_description === "Bad credentials") {
                        this.bad_credentials = true;
                    }
                };

                checkLogin(this.input.username, this.input.password, onsuccess, onerror);
            }
        }
    }
</script>

<style scoped>
.content {
    margin: 0 auto;
    max-width: 500px;
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
