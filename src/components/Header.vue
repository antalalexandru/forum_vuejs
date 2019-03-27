<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container">
            <router-link class="navbar-brand" to="/">Forumul lui alex</router-link>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item active">
                        <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Link</a>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Dropdown
                        </a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <a class="dropdown-item" href="#">Action</a>
                            <a class="dropdown-item" href="#">Another action</a>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item" href="#">Something else here</a>
                        </div>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
                    </li>
                </ul>

                <div class="navbar-nav btn-group" v-if="loggedIn">
                    <a class="nav-link dropdown-toggle" href="#" id="userNavbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {{ loggedIn.username }}
                    </a>
                    <div class="dropdown-menu" aria-labelledby="userNavbarDropdown">
                        <router-link class="dropdown-item" :to="{ name: 'user_profile', params: { user_id: loggedIn.id } }">Profilul meu</router-link>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="#"><i class="fas fa-sign-out-alt"></i> Delogare</a>
                    </div>
                </div>
                <ul class="navbar-nav form-inline my-2 my-lg-0" v-else>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/user/login"><i class="fas fa-sign-in-alt"></i> Sign in</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/user/signup"><i class="fas fa-user-plus"></i> Sign up</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
    import {getSelfUserInformation} from "@/service/memberService";

    export default {
        name: "Header",
        data () {
            return {
                loggedIn: localStorage.auhentication_token
            }
        },
        created() {
            getSelfUserInformation((data) => {
                this.loggedIn = data;
            });
        }
    }

</script>

<style scoped>

</style>
