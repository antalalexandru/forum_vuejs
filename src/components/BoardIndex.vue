<template>
    <div class="hello">

        <!-- <h1 style="padding: 70px 0; font-family: 'Raleway'; text-align: center; font-weight: 200; font-size: 60px;">Licența lui alex</h1>
        -->

        <Breadcrumb></Breadcrumb>

        <div v-for="parentCategory in categoriesList" :key="parentCategory.id" style="margin-bottom: 20px;">
            <div class="maintitle">{{parentCategory.name}}</div>
            <SubcategoriesDetails
                    :category="parentCategory"
            />
        </div>

        <div class="maintitle">Statistics</div>
        <table class="table" style="text-align: center; border: 1px solid #ddd">
            <tbody>
            <tr>
                <td style="width: 25%"><h4>{{formatNumber(statistics.totalPosts)}}</h4>Total posts</td>
                <td style="width: 25%"><h4>{{statistics.totalTopics}}</h4>Total topics</td>
                <td style="width: 25%"><h4>{{statistics.totalUsers}}</h4>Total users</td>
                <td style="width: 25%"><h4>{{statistics.lastUsername}}</h4>Last registered user</td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import {formatTimestamp} from "@/service/utils";
    import SubcategoriesDetails from "@/components/SubcategoriesDetails";

    import {getCommunityStatistics} from "@/service/statisticsService";
    import Breadcrumb from "@/components/Breadcrumb";
    import {getCategories} from "@/service/api";

    export default {
        name: 'Categories',
        props: {
            msg: String
        },
        components: {
            SubcategoriesDetails,
            Breadcrumb
        },

        data() {
            return {
                categoriesList: [],
                statistics: {}
            }
        },

        methods: {
            formatTimestamp: formatTimestamp,

            formatNumber(number) {
                if (number == null) {
                    return 0;
                }
                return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
            }
        },

        created() {
            getCategories((response, err) => {
                if(err == null) {
                    this.categoriesList = response;
                }
            });

            getCommunityStatistics((response, error) => {
                if (error == null) {
                    this.statistics = response;
                }
            });
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
