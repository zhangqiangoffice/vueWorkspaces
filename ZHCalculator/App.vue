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
      </li>

      <li>
        <span>年龄</span>
        <br>
        <input type="number" class="short" v-model="age" placeholder="投保年龄">
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
      </li>
    
      <li>
        <span>年期</span>
        <br>
        <input type="radio" id="ten_years" value="10" v-model="year">
        <label for="ten_years">十年</label>
        <br>
        <input type="radio" id="twenty_years" value="20" v-model="year">
        <label for="twenty_years">二十年</label>
      </li>

      <li>
        <span>保额(万元)</span>
        <br>
        <input type="number" class="short" v-model="coverage" placeholder="投保年龄">
      </li>
      
      <li>
        <span>CIF主险</span>
        <br>
        <span>年缴保费: {{ cifFee | capitalize }}</span>
      </li>
    </ul>

    <ul>
      <li>
        <span>已购买社保或新农合</span>
        <br>
        <input type="checkbox" id="hasSocialSecurity" v-model="hasSocialSecurity">
        <label for="hasSocialSecurity">{{ hasSocialSecurity | yesOrNo }}</label>
      </li>

      <li>
        <span>首次投保</span>
        <br>
        <input type="checkbox" id="isFirst" v-model="isFirst">
        <label for="isFirst">{{ isFirst | yesOrNo }}</label>
      </li>

      <li>
        <span>投保计划</span>
        <br>
        <select v-model="plan" class="middle">
          <option v-for="num in planTop" v-bind:value="num">
            计划{{ chars[num] }}
          </option>
        </select>
      </li>
      <li v-show="!hasSocialSecurity">
        <span>HRC</span>
        <br>
        <span>附加保费: {{ hrcFee | capitalize }}</span>
      </li>
      <li v-show="hasSocialSecurity">
        <span>HRD</span>
        <br>
        <span>附加保费: {{ hrdFee | capitalize }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import cifRates from './cif.json';
import hrcRates from './hrc.json';
import hrdRates from './hrd.json';
import industries from './industryCategory.json';
export default {
  name: 'app',
  data () {
    return {
      sex: 'nan',
      year: 10,
      age: 18,
      hasSocialSecurity: false,
      isFirst: true,
      coverage: 10,
      indu: '农牧业 - 农业',
      chars: ['零', '一', '二', '三', '四', '五', '六'],
      plan: 1,
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
    },
    //判断：“是”或者“否”
    yesOrNo: function(val) {
      return val ? '是' : '否'; 
    }

  },
  computed: {
    //CIF主险保费
    cifFee: function () {
      return (cifRates[`${this.sex}_year${this.year}_age${this.age}`] + this.occupation.life) * this.coverage;
    },
    //hrc附加保费
    hrcFee: function () {
      return Math.round(hrcRates[`occu${this.occupation.hospital}_group${this.ageGroup}_plan${this.plan}`] * (this.isFirst ? 0.95 : 1))
    },
    //hrd附加保费
    hrdFee: function () {
      return Math.round(hrdRates[`occu${this.occupation.hospital}_group${this.ageGroup}_plan${this.plan}`] * (this.isFirst ? 0.95 : 1))
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
    //年龄段
    ageGroup: function() {
      if (this.age <= 17) {
        return parseInt(this.age / 5);
      } else {
        return parseInt(this.age / 5) + 1;
      }
    },
    //选择行业后的所有工种
    jobs: function () {
      const that = this;
      return industries.filter(function(ele) {
        return ele.industory === that.indu;
      })
    },
    //最高可以购买的投保计划等级
    planTop: function() {
      return this.ageGroup < 4 ? 3 : 6;
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
