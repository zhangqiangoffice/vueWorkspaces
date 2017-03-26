import Vue from 'vue'
import { Row, Col, Select, Option, Radio, RadioGroup, Input, Cascader } from 'element-ui'
import App from './App.vue'

Vue.component(Row.name, Row)
Vue.component(Col.name, Col)
Vue.component(Select.name, Select)
Vue.component(Option.name, Option)
Vue.component(Radio.name, Radio)
Vue.component(RadioGroup.name, RadioGroup)
Vue.component(Input.name, Input)
Vue.component(Cascader.name, Cascader)

new Vue({
  el: '#app',
  render: h => h(App)
})
