<template>
    <div class="hello">
        <center><h1 style="padding: 70px 0; font-family: 'Raleway'; font-weight: 200; font-size: 60px;">Category #{{this.category_id}}</h1></center>

        <div style="text-align: right" v-if="this.userLoggedIn">
            <button type="button" class="btn btn-light"><i class="fas fa-plus-circle"></i> Add new topic</button>
        </div>

    </div>
</template>

<script>
    import userLoggedIn from "../service/memberService";
    import {getCategory} from "../service/categoriesService";

    export default {
        name: "CategoryDetails",

        data() {
            return {
                categoriesList: [],
                category_id: this.$route.params.category_id,
                userLoggedIn: userLoggedIn
            }
        },

        created() {
            let onSuccessCategories = (response) => {
                this.categoriesList = response.data;
            };
            let onErrorCategories = (data) => {

            };
            getCategory(this.category_id, onSuccessCategories, onErrorCategories);
        }
    }
</script>

<style scoped>

</style>