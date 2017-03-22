
<template>
  <div id="app">
    <ul>
      <li>
        <span>性别</span>
        <br>
        <input type="radio" id="nan" value="nan" v-model="sex">
        <label for="nan">男</label>
        <br>
        <input type="radio" id="nv" value="nv" v-model="sex">
        <label for="nv">女</label>
        <br>
        <span>Picked: {{ sex }}</span>
      </li>

      <li>
        <span>年期</span>
        <br>
        <input type="radio" id="ten_years" value="10" v-model="year">
        <label for="ten_years">十年</label>
        <br>
        <input type="radio" id="twenty_years" value="20" v-model="year">
        <label for="twenty_years">二十年</label>
        <br>
        <span>Picked: {{ year }}</span>
      </li>

      <li>
        <span>年龄</span>
        <br>
        <input type="number" v-model="age" placeholder="投保年龄">
        <br>
        <span>Input: {{ age }} 岁</span>
      </li>

      <li>
        <span>保额(万元)</span>
        <br>
        <input type="number" v-model="coverage" placeholder="投保年龄">
        <br>
        <span>Input: {{ coverage }} 万元</span>
      </li>
      
      <li>
        <span>年缴保费</span>
        <br>
        <span>Result: {{ mainFee | capitalize }}</span>
      </li>

    </ul>
  </div>
</template>

<script>
import cifRates from './cif.json';
export default {
  name: 'app',
  data () {
    return {
      sex: 'nan',
      year: 10,
      age: 18,
      rate: 2024,
      coverage: 10,
    }
  },
  filters: {
    capitalize: function(val) {
      if (isNaN(val)) {
        return '不可投保！'
      }
      return val.toFixed(2) + ' 元';
    }
  },
  computed: {
    mainFee: function () {
      return cifRates[`${this.sex}_year${this.year}_age${this.age}`] * this.coverage;
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
ul {
  list-style-type: none;
  li {
    display: inline-block;
    margin: 0 10px;
  }
}

</style>
