<template>
    <div>

        <div class="content" v-if="checked_validation && ! validation_succesful">
            <i class="far fa-times-circle error" ></i>
            <p>A apărut o eroare. Date incorecte, sau contul este deja activat :)</p>
        </div>

        <div class="content" v-if="checked_validation && validation_succesful">
            <i class="far fa-check-circle success"></i>
            <p>Contul a fost validat :)</p>
        </div>

    </div>
</template>

<script>
    import {activateUserAccount} from "@/service/memberService";

    export default {
        name: "AccountActivation",
        data() {
            return {
                checked_validation: false,
                validation_succesful: false
            }
        },
        created() {
            let successHandler = (response) => {
                this.checked_validation = true;
                this.validation_succesful = (response.status === 200);
            };
            let errorHandler = (err) => {
                this.checked_validation = true;
                this.validation_succesful = false;
            };
            activateUserAccount(this.$route.params.user_id, this.$route.params.activation_token, successHandler, errorHandler);
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
