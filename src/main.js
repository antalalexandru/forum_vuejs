import Vue from 'vue'
import App from './App.vue'
import CKEditor from '@ckeditor/ckeditor5-vue';
import Notifications from 'vue-notification'
import VueSwal from 'vue-swal';
import Autocomplete from 'vuejs-auto-complete';
import VuejsDialog from 'vuejs-dialog';

// include the default style
import 'vuejs-dialog/dist/vuejs-dialog.min.css';

// Tell Vue to install the plugin.
Vue.use(VuejsDialog);
Vue.config.productionTip = false;

import Toasted from 'vue-toasted';
import Sortable from 'vue-sortable';

Vue.use(Sortable);
Vue.use(Toasted);

Vue.use( CKEditor );
Vue.use(Notifications);
Vue.use(VueSwal);
Vue.use(Autocomplete);

// new Date().toLocaleString("en-US", {timeZone: "America/New_York"});


/*
new Vue({
  render: h => h(App),
}).$mount('#app')
*/
import router from './router';

new Vue({
  router,               // Add this line
  render: h => h(App)
}).$mount('#app');
