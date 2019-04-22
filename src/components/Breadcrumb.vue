<template>
    <div>
        <div style="padding: 15px; margin: 15px 0; color: #888; font-size: 14px; background: #fafafa">
            <div style="float: right">
                <ul style="padding: 0; margin: 0; list-style-type: none;">
                    <li style="display: inline; margin-right: 10px;">
                        <i class="fab fa-facebook-square"></i>
                    </li>
                    <li style="display: inline; margin-right: 10px;">
                        <i class="fab fa-twitter-square"></i>
                    </li>
                    <li style="display: inline;">
                        <i class="fab fa-youtube-square"></i>
                    </li>
                </ul>
            </div>
            <ul style="padding: 0; margin: 0;  list-style-type: none;">
                <li style="display: inline;">
                    <i class="fas fa-home" style="margin-right: 7px;"></i> <router-link :to="{ name: 'board_index'}">Community Home</router-link>
                </li>
                <li v-for="item in items" :key="item.name" style="display: inline;">
                    <i class="fas fa-angle-right" style="margin: 0 7px;"></i>
                    <span v-if="item.link"><router-link :to="item.link">{{item.name}}</router-link></span>
                    <span v-else>{{item.name}}</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Breadcrumb",
        props: {
            items: {
                type: Array,
                default: () => []
            }
        }
    }
</script>

<style scoped>
    a {
        color: #888;
    }
</style>
