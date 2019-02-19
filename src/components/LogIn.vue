<template>
    <div class="content">
        <h2 class="display-4">Autentificare</h2>
        <div class="form-group">
            <label for="exampleInputEmail1">Nume de utilizator</label>
            <input type="text" class="form-control" id="exampleInputEmail1" v-model="input.username">
        </div>
        <div class="form-group">
            <label for="exampleInputPassword1">Parola</label>
            <input type="password" class="form-control" id="exampleInputPassword1" v-model="input.password">
        </div>
        <button type="submit" class="btn btn-primary" v-on:click="login()">Autentificare</button>
    </div>
</template>

<script>
    import checkLogin from '../service/memberService';

    export default {
        name: "LogIn",
        data() {
            return {
                input: {
                    username: "",
                    password: ""
                }
            }
        },
        methods: {
            login() {
                /* eslint-disable no-console */
                checkLogin(this.input.username, this.input.password);
                /* eslint-enable no-console */

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
