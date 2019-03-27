import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false;


/*
new Vue({
  render: h => h(App),
}).$mount('#app')
*/
import router from './router'

new Vue({
  router,               // Add this line
  render: h => h(App)
}).$mount('#app')
