<template>
  <div class="hello">
    <center><h1 style="padding: 70px 0; font-family: 'Raleway'; font-weight: 200; font-size: 60px;">Categories</h1></center>

    <table class="table table-striped">
      <tbody>

    <tr v-for="category in categoriesList" :key="category.id">
      <td style="width: 50px; vertical-align: middle; text-align: center"><i class="far fa-comments" aria-hidden="true" style='font-size: 25px; color: #888;'></i></td>
      <td>
        <div style="font-size: 20px; line-height: 2.0"> {{category.name}}</div>
        <div v-if="category.description" style="font-style: italic;">
          {{category.description}}}
        </div>
      </td>
      <td style="width: 15%; text-align: center; vertical-align: middle">
        <span style='font-weight: 600'>12</span> topics<br />
        <span style='font-weight: 600'>33</span> posts</td>
      <td style="width: 25%; vertical-align: middle">
        <div v-if="category.lastPost">
          [last post info]
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
