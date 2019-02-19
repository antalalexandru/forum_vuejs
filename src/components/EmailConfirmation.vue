<template>
    <div class="content">
        <i class="fas fa-envelope"></i>
        <p>Activează contul folosind link-ul primit pe adresa email completată la înscriere :)</p>
    </div>
</template>

<script>
    export default {
        name: "EmailConfirmation",
        data() {
            return {
                input: {
                    username: "",
                    password: ""
                }
            }
        },
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
    }
</style>
