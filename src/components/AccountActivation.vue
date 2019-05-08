<template>
    <div>

        <div class="content" v-if="checked_validation && ! validation_succesful">
            <i class="far fa-times-circle error" ></i>
            <p>Oops, something wen wrong. Maybe invalid data, or this account is already activated.</p>
        </div>

        <div class="content" v-if="checked_validation && validation_succesful">
            <i class="far fa-check-circle success"></i>
            <p>Account activated succesfully :)</p>
        </div>

    </div>
</template>

<script>
    import {activateUserAccount} from "@/service/api";

    export default {
        name: "AccountActivation",
        data() {
            return {
                checked_validation: false,
                validation_succesful: false
            }
        },
        created() {
            activateUserAccount({
                userId: this.$route.params.user_id,
                activationToken: this.$route.params.activation_token
            }, (response, error) => {
                this.checked_validation = true;
                this.validation_succesful = (error == null);
            });
        }
    }
</script>

<style scoped>
    i {
        text-align: center;
        font-size: 100px;
        padding: 30px;
        width: 100%;
        color: #bcbcbc;
    }
    .content {
        margin: 0 auto;
        max-width: 700px;
    }

    h2 {
        padding: 0 0;
        text-align: center;
    }

    p {
        font-size: 19px;
        text-align: center;
    }

    .error {
        color: #aa0000;
    }

    .success {
        color: #00aa00;
    }
</style>
