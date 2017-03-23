
<template>
  <div id="app">
    <ul>
      <li>CIF主险</li>
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
        <span>年龄</span>
        <br>
        <input type="number" class="short" v-model="age" placeholder="投保年龄">
        <br>
        <span>Input: {{ age }} 岁</span>
      </li>

      <li>
        <span>职业类别</span>
        <br>
        <select v-model="indu" class="middle">
          <option v-for="ind in indus" v-bind:value="ind">
            {{ ind }}
          </option>
        </select>
        <select v-model="occupation" class="middle">
          <option v-for="job in jobs" v-bind:value="job">
            {{ job.work }}
          </option>
        </select>
        <br>
        <span>Selected: {{ occupation.work }}</span>
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
        <span>保额(万元)</span>
        <br>
        <input type="number" class="short" v-model="coverage" placeholder="投保年龄">
        <br>
        <span>Input: {{ coverage }} 万元</span>
      </li>
      
      <li>
        <span>年缴保费</span>
        <br>
        <span>Result: {{ cifFee | capitalize }}</span>
      </li>
    </ul>

    <ul>
      <li>HRC或HRD</li>
      <li>
        <span>是否购买社保或新农合</span>
        <br>
        <input type="radio" id="hasSocialSecurityTrue" value="true" v-model="hasSocialSecurity">
        <label for="hasSocialSecurityTrue">是</label>
        <br>
        <input type="radio" id="hasSocialSecurityFlse" value="false" v-model="hasSocialSecurity">
        <label for="hasSocialSecurityFlse">否</label>
        <br>
        <span>Picked: {{ hasSocialSecurity }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import cifRates from './cif.json';
import industries from './industryCategory.json';
export default {
  name: 'app',
  data () {
    return {
      sex: 'nan',
      year: 10,
      age: 18,
      hasSocialSecurity: false,
      coverage: 10,
      indu: '农牧业 - 农业',
      occupation: {"industory": "农牧业 - 农业", "code": "02060", "work": "农民", "life": 0, "accident": 2, "hospital": 2}
    }
  },
  filters: {
    //数字金额化
    capitalize: function(val) {
      if (isNaN(val)) {
        return '不可投保！'
      }
      return val.toFixed(2) + ' 元';
    }
  },
  computed: {
    //CIF主险保费
    cifFee: function () {
      return (cifRates[`${this.sex}_year${this.year}_age${this.age}`] + this.occupation.life) * this.coverage;
    },
    //所有行业的名称数组
    indus: function() {
      let industriesArr = [industries[0].industory];
      const len = industries.length;
      for (let i = 1; i < len; i++) {
        if (industries[i].industory !== industries[i - 1].industory) {
          industriesArr.push(industries[i].industory)
        }
      }
      return industriesArr;
    },
    //选择行业后的所有工种
    jobs: function () {
      const that = this;
      return industries.filter(function(ele) {
        return ele.industory === that.indu;
      })
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

.short {
  width: 40px;
  }

.middle {
  width: 150px;
}

ul {
  list-style-type: none;
  li {
    display: inline-block;
    margin: 0 10px;
    vertical-align: top;
  }
}

</style>
