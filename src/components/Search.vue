<template>
    <div>

        <div style="margin: 30px auto; width: 600px; ">
            <div class="input-group">
                <input placeholder="Type something ..." v-model="input.searchContent" v-on:keyup.enter="doSearch" type="text" class="form-control" style="margin: 0 10px;">
                <span class="input-group-btn">
                    <button class="btn btn-light" type="button" v-on:click="doSearch">Search</button>
                </span>
            </div>
        </div>

        <div v-if="this.searched">
            <h3>Search results</h3>

<hr>

            <div class="col-md-12" v-for="post in postsResult" v-bind:key="post.id">
                <h4>{{post.topicDetails.title}}</h4>
                <div v-html="post.content"></div>
                <div>
                    <span class="badge">Posted {{formatTimestamp(post.timestamp)}}</span>
                </div>
                <hr>

            </div>
        </div>

    </div>
</template>

<script>
    import {searchPosts} from "@/service/api";
    import {formatTimestamp} from "@/service/utils";

    export default {
        name: "Search",

        data() {
            return {
                input: {
                    searchContent: ''
                },

                postsResult: [],
                searched: false
            }
        },

        methods: {
            formatTimestamp: formatTimestamp,

            doSearch() {
                this.searched = true;

                searchPosts({
                    query: this.input.searchContent
                }, (response, err) => {
                    if(err == null) {
                        this.postsResult = response;
                    }
                    console.log(this.postsResult);
                });
            }
        },

        created() {
            document.title = 'Search';
        }
    }
</script>

<style scoped>

</style>
