<template>
    <div class="container">

        <h1 class="mt-4">User list</h1>

        <Pagination
                :current_page="current_page"
                :total_pages="total_pages"
                :changePage="changePage"
        />
        <div class="row">
            <div class="col-md-6 col-lg-4 col-xl-3" v-for="user in users" :key="user.id">
                <div class="card">
                    <div class="card-body">
                        <table style="width: 100%; border: none;">
                            <tr>
                                <td style="width: 90px; height: 90px; text-align: center">
                                    <div :style="getAvatarStyle(user)"></div>
                                </td>
                                <td style="padding-left: 10px;">
                                    <div style="font-size: 20px; padding: 5px 0;">{{user.username}}</div>
                                    <div><em>The ban lord</em></div>
                                </td>
                            </tr>
                        </table>
                        <div>Group: <div v-html="getUserGroupFormatted(user.group)" style="display: inline"></div></div>
                        <div>Posts count: {{user.numberOfPosts}}</div>
                    </div>
                </div>
            </div>
        </div>
        <Pagination
                :current_page="current_page"
                :total_pages="total_pages"
                :changePage="changePage"
        />
    </div>
</template>

<script>
    import {getUsers} from "@/service/api";
    import {getUserGroupFormatted} from "@/service/utils";
    import Pagination from "@/components/Pagination";

    export default {
        name: "UserList",
        components: {
            Pagination
        },
        data() {
            return {
                users: [],
                current_page: this.$route.query.page == null ? 1 : parseInt(this.$route.query.page),
                total_pages: 1,
            }
        },
        methods: {
            loadUsers() {
                getUsers({
                    page: this.current_page
                }, (response, error) => {
                    if(error == null) {
                        this.users = response.elements;
                        this.total_pages = response.totalPages;
                    }
                });
            },

            changePage(pageNumber) {
                this.current_page = pageNumber;
                this.loadUsers();
                this.$router.push({ path: 'users_list', query: { page: pageNumber } });
            },

            getUserGroupFormatted: getUserGroupFormatted,

            getAvatarStyle(user) {
                if(user == null || user.avatar == null || user.avatar.trim() === '') {
                    return "border-radius: 2px; max-width: 90px;max-height: 90px;min-height: 80px;min-width: 45px;background: url('https://forum.softpedia.com//public/style_images/carbon_blue/profile/default_large.png') no-repeat;background-size:cover;background-position: center;";
                } else {
                    return "border-radius: 2px; max-width: 90px;max-height: 90px;min-height: 85px;min-width: 45px;background: url('" + user.avatar + "') no-repeat;background-size:cover;background-position: center;";
                }
            }
        },
        created() {
            this.loadUsers();
        }
    }
</script>

<style scoped>
.card {
    margin: 10px 0;
}
</style>
