import compositionAip from '@vue/composition-api'
import Vue from 'vue'
import App from './components/App.vue'

Vue.use(compositionAip)

new Vue({
  el: document.getElementById('app')!,
  render: h => h(App),
})
