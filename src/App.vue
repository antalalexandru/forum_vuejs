<template>
  <div>
    <Header></Header>
    <div class="container">
      <router-view></router-view>
      <hr>
      <div style="color: #999; text-align: center; font-size: 12px;">
        Copyright notes
      </div>
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
</style>
