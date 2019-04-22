<template>
  <div>
    <Header></Header>
    <div class="container">
      <router-view :key="$route.path"></router-view>
    </div>
    <div style="text-align: center; font-size: 12px; margin-top: 10px; padding: 20px; " class="footer">
      <div class="container">Copyright notes</div>
    </div>
  </div>
</template>

<script>
import Header from './components/Header'

export default {
  name: 'app',
  components: {
    Header
  }
}
</script>

<style>
  .footer {
    /*background: rgba(54,85,94,1);
    background: -moz-linear-gradient(-45deg, rgba(54,85,94,1) 0%, rgba(93,127,135,1) 100%);
    background: -webkit-gradient(left top, right bottom, color-stop(0%, rgba(54,85,94,1)), color-stop(100%, rgba(93,127,135,1)));
    background: -webkit-linear-gradient(-45deg, rgba(54,85,94,1) 0%, rgba(93,127,135,1) 100%);
    background: -o-linear-gradient(-45deg, rgba(54,85,94,1) 0%, rgba(93,127,135,1) 100%);
    background: -ms-linear-gradient(-45deg, rgba(54,85,94,1) 0%, rgba(93,127,135,1) 100%);
    background: linear-gradient(135deg, rgba(54,85,94,1) 0%, rgba(93,127,135,1) 100%);
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#36555e', endColorstr='#5d7f87', GradientType=1 );

    color: #ddd;*/
  }
</style>
