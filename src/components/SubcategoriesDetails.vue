<template>
    <div>
        <table class="table table-striped" style="border: 1px solid #ddd">
            <tbody>
            <tr v-for="category in category.childCategories" :key="category.id">
                <td style="width: 50px; vertical-align: middle; text-align: center">
                    <i class="far fa-comments" aria-hidden="true"
                       style='font-size: 20px; color: #999; background:#EBEBEB; padding: 10px; border-radius: 50%; '></i>
                </td>
                <td style="vertical-align: middle">
                    <div style="font-size: 17px; line-height: 1.5">
                        <router-link :to="{ name: 'category_details', params: { category_id: category.id } }">
                            {{category.name}}
                        </router-link>
                    </div>
                    <div v-if="category.childCategories && category.childCategories.length > 0">
                        <ul style="padding: 0; margin: 5px 0; list-style-type: none;">
                            <li style="display: inline; margin-right: 10px;"
                                v-for="subcategory in category.childCategories" :key="subcategory.id">
                                <router-link
                                        :to="{ name: 'category_details', params: { category_id: subcategory.id } }">
                                    <i class="fas fa-comment-alt" style="font-size: 10px; color: #999;"></i>
                                    {{subcategory.name}}
                                </router-link>
                            </li>
                        </ul>
                    </div>
                    <div v-if="category.description" style="line-height: 1.3; color: #777; font-size: 14px;">
                        {{category.description}}
                    </div>
                </td>
                <td style="width: 11%; text-align: center; vertical-align: middle">
                    <span style='font-weight: 600'>{{category.numberOfPosts + category.numberOfTopics}}</span><br>posts
                </td>
                <td style="width: 50px; height: 50px; text-align: center; vertical-align: middle">
                    <div v-if="category.lastPostUserDetails != null" :style="getAvatarStyle(category.lastPostUserDetails)"></div>
                </td>
                <td style="width: 20%; vertical-align: middle">
                    <div v-if="category.lastPostId">
                        <router-link
                                :to="{ name: 'topic_details', params: { topic_id: category.lastPostTopicId } }">
                            {{category.lastPostTopicTitle}}</router-link> <br>
                        By <router-link :to="{ name: 'user_profile', params: { user_id: category.lastPostUserDetails.id } }">{{category.lastPostUserDetails.username}}</router-link> <br>
                        {{formatTimestamp(category.lastPostTimeStamp)}}
                    </div>
                    <div v-else>
                        <em>No last post info</em>
                    </div>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import {formatTimestamp} from "@/service/utils";

    export default {
        name: "SubcategoriesDetails",
        props: [
            'category'
        ],
        methods: {
            formatTimestamp: formatTimestamp,
            getAvatarStyle(user) {
                if(user == null || user.avatar == null || user.avatar.trim() === '') {
                    return "border-radius: 2px; width: 50px;height: 50px;background: url('https://forum.softpedia.com//public/style_images/carbon_blue/profile/default_large.png') no-repeat;background-size:cover;background-position: center;";
                } else {
                    return "border-radius: 2px; width: 50px;height: 50px;background: url('" + user.avatar + "') no-repeat;background-size:cover;background-position: center;";
                }
            }
        }
    }
</script>

<style scoped>

</style>
