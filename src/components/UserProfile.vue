<template>
    <div>
        <Breadcrumb
                :items="breadcrumbItems"
        ></Breadcrumb>
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
            <ul class="nav nav-tabs" id="myTab" role="tablist">
                <li class="nav-item">
                    <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Home</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Profile</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" id="contact-tab" data-toggle="tab" href="#contact" role="tab" aria-controls="contact" aria-selected="false">Contact</a>
                </li>
            </ul>
            <div class="tab-content" id="myTabContent">
                <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">...</div>
                <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">...</div>
                <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">...</div>
            </div>
        </div>
    </div>
</template>

<script>
    import {getUserById} from "@/service/memberService";
    import Breadcrumb from "@/components/Breadcrumb";

    export default {
        name: "UserProfile",
        components: {
            Breadcrumb
        },
        data() {
            return {
                loaded_user: false,
                computed_group: '',
                breadcrumbItems: []
            }
        },
        created() {
            getUserById(this.$route.params.user_id, (data) => {
                this.breadcrumbItems = [{
                    name: 'View profile: ' + data.username
                }];
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
