<template>
    <div class="hello">
        <center><h1 style="padding: 70px 0; font-family: 'Raleway'; font-weight: 200; font-size: 60px;">Categories</h1>
        </center>

        <table class="table table-striped">
            <tbody>

            <tr v-for="category in categoriesList" :key="category.id">
                <td style="width: 50px; vertical-align: middle; text-align: center"><i class="far fa-comments"
                                                                                       aria-hidden="true"
                                                                                       style='font-size: 25px; color: #888;'></i>
                </td>
                <td style="vertical-align: middle">
                    <div style="font-size: 25px; line-height: 2.0">
                        <router-link :to="{ name: 'category_details', params: { category_id: category.id } }">
                            {{category.name}}
                        </router-link>
                    </div>
                    <div v-if="category.description" style="line-height: 1.3; color: #777">
                        {{category.description}}
                    </div>
                </td>
                <td style="width: 11%; text-align: center; vertical-align: middle">
                    <span style='font-weight: 600'>{{category.numberOfPosts}}</span> posts
                </td>
                <td style="width: 25%; vertical-align: middle">
                    <div v-if="category.lastPost">
                        {{category.lastPost.topic.title}} <br>
                        By {{category.lastPost.author.username}} <br>
                        {{formatted(category.lastPost.timestamp)}}
                    </div>
                    <div v-else>
                        <em>No last post information</em>
                    </div>
                </td>
            </tr>

            </tbody>
        </table>

    </div>
</template>

<script>
    import {getCategories} from "@/service/categoriesService";

    export default {
        name: 'Categories',
        props: {
            msg: String
        },

        data() {
            return {
                categoriesList: []
            }
        },

        methods: {
            formatted: (UNIX_timestamp) => {
                var a = new Date(UNIX_timestamp * 1000);
                var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                var year = a.getFullYear();
                var month = months[a.getMonth()];
                var date = a.getDate();
                var hour = a.getHours();
                var min = a.getMinutes();
                var time = date + ' ' + month + ' ' + year + ', ' + hour + ':' + min;
                return time;
            }
        },

        created() {
            let onSuccessCategories = (response) => {
                this.categoriesList = response.data;
            };
            let onErrorCategories = (data) => {

            };
            getCategories(onSuccessCategories, onErrorCategories);
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
