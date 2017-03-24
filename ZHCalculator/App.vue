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
          <option v-for="num in planTop" v-bind:value="num - 1">
            {{ chars[num - 1] }}
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

    <ul>
      <li>
        <span>ADDC保额(万元)</span>
        <br>
        <input type="number" class="short" v-model="addcCoverage">
      </li>
      <li>
        <span>ADDC</span>
        <br>
        <span>附加保费: {{ addcFee | capitalize }}</span>
      </li>
    </ul>

    <ul v-show="addcFee > 0">
      <li>
        <span>AMRC保额(千元)</span>
        <br>
        <input type="number" class="short" v-model="amrcCoverage">
      </li>
      <li>
        <span>AMRC</span>
        <br>
        <span>附加保费: {{ amrcFee | capitalize }}</span>
      </li>
    </ul>

    <ul >
      <li>
        <span>投保人是被保人的</span>
        <br>
        <input type="radio" id="self" value="self" v-model="relation">
        <label for="self">自己</label>
        <br>
        <input type="radio" id="parent" value="parent" v-model="relation">
        <label for="parent">父母</label>
        <br>
        <input type="radio" id="other" value="other" v-model="relation">
        <label for="other">其他</label>
      </li>
      <li>
        <span>投保人年龄</span>
        <br>
        <input type="number" class="short" v-model="applicantAge" >
      </li>
      <li>
        <span>投保人性别</span>
        <br>
        <input type="radio" id="applicantNan" value="nan" v-model="applicantSex">
        <label for="applicantNan">男</label>
        <br>
        <input type="radio" id="applicantNv" value="nv" v-model="applicantSex">
        <label for="applicantNv">女</label>
      </li>

      <li>
        <span>保费合计</span>
        <br>
        <span>{{ totalFee | capitalize}}</span>
      </li>
    </ul>

    <ul>
      <li>
        <span>WA</span>
        <br>
        <span>附加保费: {{ waFee | capitalize }}</span>
      </li>
      <li>
        <span>WPA</span>
        <br>
        <span>附加保费: {{ wpaFee | capitalize }}</span>
      </li>
      <li>
        <span>WPB</span>
        <br>
        <span>附加保费: {{ wpbFee | capitalize }}</span>
      </li>
      <li>
        <span>WP</span>
        <br>
        <span>附加保费: {{ wpFee | capitalize }}</span>
      </li>
    </ul>

  </div>
</template>

<script>
import cifRates from './json/cif.json';
import hrcRates from './json/hrc.json';
import hrdRates from './json/hrd.json';
import addcRates from './json/addc.json';
import amrcRates from './json/amrc.json';
import waRates from './json/wa.json';
import wpaRates from './json/wpa.json';
import wpbRates from './json/wpb.json';
import wpRates from './json/wp.json';
import industries from './json/industryCategory.json';

export default {
  name: 'app',
  data () {
    return {
      sex: 'nan',
      year: 10,
      age: 20,
      hasSocialSecurity: false,
      isFirst: true,
      coverage: 10,
      applicantAge: 45,
      applicantSex: 'nan',
      indu: '农牧业 - 农业',
      chars: ['不投保', '计划一', '计划二', '计划三', '计划四', '计划五', '计划六'],
      plan: 1,
      occupation: {"industory": "农牧业 - 农业", "code": "02060", "work": "农民", "life": 0, "accident": 2, "hospital": 2},
      addcCoverage: 2,
      amrcCoverage: 5,
      relation: 'self',
      hasWA: true,
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
      return hrcRates[`occu${this.occupation.hospital}_group${this.ageGroup}_plan${this.plan}`] * (this.isFirst ? 0.95 : 1)
    },
    //hrd附加保费
    hrdFee: function () {
      return hrdRates[`occu${this.occupation.hospital}_group${this.ageGroup}_plan${this.plan}`] * (this.isFirst ? 0.95 : 1)
    },
    //addc附加保费
    addcFee: function () {
      return addcRates[`occu${this.occupation.accident}`] * 10 * this.addcCoverage
    },
    //amrc附加保费
    amrcFee: function () {
      return amrcRates[`occu${this.occupation.accident}`] * 1 * this.amrcCoverage
    },
    //wa附加保费
    waFee: function () {
      return waRates[`${this.sex}_year${this.year}_age${this.age}`] * 1 * (this.totalFee / 1000)
    },
    //wpa附加保费
    wpaFee: function () {
      return wpaRates[`age${this.applicantAge}_year${this.year}`] * 1 * (this.totalFee / 1000)
    },
    //wpb附加保费
    wpbFee: function () {
      return wpbRates[`${this.applicantSex}_year${this.year}_age${this.applicantAge}`] * 1 * (this.totalFee / 1000)
    },
    //wp附加保费
    wpFee: function () {
      return wpRates[`age${this.applicantAge}_year${this.year}`] * 1 * (this.totalFee / 1000)
    },

    //主险、HRC_HRD、ADDC、AMRC保费合计
    totalFee: function() {
      let total = 0;
      if (!isNaN(this.cifFee) && this.cifFee > 0) {
        total += this.cifFee;
      }
      if (!isNaN(this.hrcFee) && this.hrcFee > 0 && !this.hasSocialSecurity) {
        total += this.hrcFee;
      }
      if (!isNaN(this.hrdFee) && this.hrdFee > 0 && this.hasSocialSecurity) {
        total += this.hrdFee;
      }
      if (!isNaN(this.addcFee) && this.addcFee > 0) {
        total += this.addcFee;
      }
      if (!isNaN(this.addcFee) && this.addcFee > 0 && !isNaN(this.amrcFee) && this.amrcFee > 0 ) {
        total += this.amrcFee;
      }
      return total;

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
      return this.ageGroup < 4 ? 4 : 7;
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
  border: 1px solid #ccc;
  padding: 10px 0;
  margin-bottom: 10px;
  li {
    display: inline-block;
    margin: 0 10px;
    vertical-align: top;
  }
}

</style>
