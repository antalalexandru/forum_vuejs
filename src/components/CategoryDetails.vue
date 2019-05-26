<template>
    <div class="hello">

        <!-- Title -->
        <h1 class="mt-4">{{categoryData.name}}</h1>
        <!-- Author -->

        <div class="d-flex justify-content-between">
            <em>{{categoryData.description}}</em>
        </div>

        <Breadcrumb
            :items="this.breadcrumbElements"
        ></Breadcrumb>

        <div v-if="this.categoryData.childCategories && this.categoryData.childCategories.length > 0">
            <div class="maintitle">Subcategories</div>
            <SubcategoriesDetails
                :category="this.categoryData"
            />
        </div>

        <div style="text-align: right; margin: 20px 0" v-if="userLoggedIn">
            <router-link :to="{ name: 'add_new_topic', params: { category_id: category_id } }">
                <button type="button" class="btn btn-light"><i class="fas fa-plus-circle"></i> Add new topic</button>
            </router-link>
        </div>

        <Pagination
                :current_page="current_page"
                :total_pages="total_pages"
                :changePage="changePage"
        />

        <table class="table table-striped" style="border: 1px solid #ddd">
            <tbody>
            <tr v-for="topic in this.topics" :key="topic.id">
                <td>
                    <div>
                        <router-link :to="{ name: 'topic_details', params: { topic_id: topic.id } }">
                            {{topic.title}}
                        </router-link>
                    </div>
                    <div style="color: #888;">Started by {{topic.firstPostUserName}},
                        {{formatTimestamp(topic.firstPostTimeStamp)}}
                    </div>
                </td>
                <td style="vertical-align: middle">
                    {{topic.replies}} posts
                </td>
                <td style="vertical-align: middle;">
                    <div>{{topic.lastPostUserName}}</div>
                    <div style="color: #888;">{{formatTimestamp(topic.lastPostTimeStamp)}}</div>
                </td>
            </tr>
            </tbody>
        </table>

    </div>
</template>

<script>
    import {userLoggedIn} from "../service/memberService";
    import {formatTimestamp} from "@/service/utils";


    import {getTopicsByCategoryId} from "@/service/topicsService";


    import Pagination from "@/components/Pagination";
    import SubcategoriesDetails from "@/components/SubcategoriesDetails";
    import Breadcrumb from "@/components/Breadcrumb";
    import {getCategory} from "@/service/api";


    export default {
        name: "CategoryDetails",
        components: {Pagination, SubcategoriesDetails, Breadcrumb},
        data() {
            return {
                categoryData: {},
                topics: [],
                category_id: this.$route.params.category_id,
                userLoggedIn: userLoggedIn,

                current_page: this.$route.query.page == null ? 1 : parseInt(this.$route.query.page),
                total_pages: 1,

                breadcrumbElements: []
            }
        },

        methods: {
            formatTimestamp: formatTimestamp,

            loadTopics() {
                let onSuccessTopics = (response) => {
                    this.topics = response.data.elements;
                    this.total_pages = response.data.totalPages;
                };
                let onErrorTopics = (err) => {
                    console.log(err);
                };

                getTopicsByCategoryId(this.$route.params.category_id, this.current_page, onSuccessTopics, onErrorTopics);

            },

            changePage(pageNumber) {
                this.current_page = pageNumber;
                this.$route.query.page = pageNumber;
                this.loadTopics();
            }
        },

        mounted() {
            getCategory({
                category_id: this.category_id
            }, (response, err) => {
                if(err == null) {
                    this.categoryData = response;

                    let parentCategory = this.categoryData.parentCategoryDetails;
                    let parentCategories = [{
                        id: this.categoryData.id,
                        name: this.categoryData.name,
                        link: {name: 'category_details', params: {category_id: this.categoryData.id}}
                    }];
                    while (parentCategory != null) {
                        parentCategories.push({
                            id: parentCategory.id,
                            name: parentCategory.name,
                            link: {name: 'category_details', params: {category_id: parentCategory.id}}
                        });
                        parentCategory = parentCategory.parentCategory;
                    }

                    this.breadcrumbElements = parentCategories.reverse();
                }
            });

            this.loadTopics();
        }
    }
</script>

<style scoped>

</style>
