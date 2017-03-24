import Vue from 'vue'
import { Row, Col, Select, Option } from 'element-ui'
import App from './App.vue'

Vue.component(Row.name, Row)
Vue.component(Col.name, Col)
Vue.component(Select.name, Select)
Vue.component(Option.name, Option)

new Vue({
  el: '#app',
  render: h => h(App)
})
