<template>
    <div class="pagination">
            <span v-if="current_page > 1">
                <span class="pagelink" v-if="current_page - 4 > 0" v-on:click="changePage(1)">
                    <i class="fa fa-angle-double-left" aria-hidden="true"></i>
                </span>
                <span class="pagelink" v-on:click="changePage(current_page - 1)">
                    <i class="fa fa-angle-left" aria-hidden="true"></i>
                </span>
                <span v-for="it in [3, 2, 1]" :key="it">
                    <span class="pagelink" v-if="current_page - it > 0" v-on:click="changePage(current_page - it)">
                        {{current_page - it}}
                    </span>
                </span>
            </span>
        <span><span class="pagecurrent">{{current_page}}</span></span>
        <span v-for="it in [1, 2, 3]" :key="it">
                <span class="pagelink" v-if="current_page + it <= total_pages" v-on:click="changePage(current_page + it)">
                    {{current_page + it}}
                </span>
            </span>
        <span><span class="pagelink" v-if="current_page !== total_pages" v-on:click="changePage(current_page + 1)">
                <i class="fa fa-angle-right" aria-hidden="true"></i>
            </span></span>
        <span><span class="pagelink" v-if="current_page + 3 < total_pages" v-on:click="changePage(total_pages)">
                <i class="fa fa-angle-double-right" aria-hidden="true"></i>
            </span></span>
        <span style="margin-left: 10px;">
                Page {{current_page}} of {{total_pages}}
            </span>
    </div>
</template>

<script>
    export default {
        name: "Pagination",
        props: [
            'current_page',
            'changePage',
            'total_pages'
        ]
    }
</script>

<style scoped>

</style>
