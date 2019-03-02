<template>
    <div style="margin-top: 30px;">
        <div style="float: left; width: 300px">
            <div style="text-align: center;">
                <img class="card-img-top" alt="Card image cap" style="max-width: 250px;" src="https://vignette.wikia.nocookie.net/scoobydoo/images/6/69/Witch_Doctor_%28A_Tiki_Scare_is_No_Fair%29.png/revision/latest?cb=20140719013302">
            </div>
            <div class="card-body" v-if="loaded_user">
                <h3>{{ loaded_user.username }}</h3>
                <h4><small class="text-muted">Group: <span v-html="computed_group"></span></small></h4>
                <hr>
                The BAN lord
            </div>
        </div>
        <div style="margin-left: 320px">
            <i class="far fa-surprise bigicon"></i>
            <p style="text-align: center; font-size: 19px;">Acest user n-are nicio activitate. <a href="#">BANEAZĂ-L!</a> </p>
        </div>

    </div>
</template>

<script>
    import {getUserById} from "@/service/memberService";

    export default {
        name: "UserProfile",
        data() {
            return {
                loaded_user: false,
                computed_group: ''
            }
        },
        created() {
            getUserById(this.$route.params.user_id, (data) => {
                console.log(data);
                this.loaded_user = data;
                this.computed_group = data.group.format_prefix + data.group.name + data.group.format_suffix;
            })
        }
    }
</script>

<style scoped>
    .bigicon {
        text-align: center;
        font-size: 150px;
        padding: 30px;
        width: 100%;
        color: #949494;
    }
</style>
